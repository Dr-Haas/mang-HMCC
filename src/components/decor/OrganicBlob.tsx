"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type BlobPlacement = "top-left" | "bottom-right";

interface OrganicBlobProps {
  placement?: BlobPlacement;
  color?: string;
  size?: number;
  height?: number;
  opacity?: number;
  className?: string;
  fixed?: boolean;
  morphIntensity?: number;
  speed?: number;
}

function placementClasses(placement: BlobPlacement): string {
  if (placement === "top-left") {
    return "top-20 -left-48";
  }
  return "-bottom-28 -right-48";
}

export function OrganicBlob({
  placement = "top-left",
  color = "#e7bcc1",
  size = 460,
  height,
  opacity = 0.7,
  className,
  fixed = true,
  morphIntensity = 0.2,
  speed = 1,
}: OrganicBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let rafId = 0;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    const lightA = new THREE.AmbientLight(0xffffff, 0.7);
    const lightB = new THREE.DirectionalLight(0xffffff, 1.15);
    lightB.position.set(2.4, 1.2, 2.8);
    scene.add(lightA, lightB);

    const geometry = new THREE.IcosahedronGeometry(1.1, 6);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.1,
      metalness: 0.04,
      transparent: true,
      opacity,
    });

    const blob = new THREE.Mesh(geometry, material);
    blob.scale.set(1.05, 1.35, 1);
    scene.add(blob);

    const basePositions = geometry.attributes.position.array.slice() as Float32Array;
    const livePositions = geometry.attributes.position.array as Float32Array;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const nextWidth = canvas.clientWidth;
      const nextHeight = canvas.clientHeight;
      if (!nextWidth || !nextHeight) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(nextWidth, nextHeight, false);
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
    };

    const updateVertices = (time: number) => {
      const c1x = Math.sin(time * 0.8) * 0.42;
      const c1y = Math.cos(time * 0.65) * 0.36;
      const c2x = Math.cos(time * 0.95 + 1.8) * 0.42;
      const c2y = Math.sin(time * 0.75 + 0.7) * 0.36;

      for (let i = 0; i < livePositions.length; i += 3) {
        const x = basePositions[i];
        const y = basePositions[i + 1];
        const z = basePositions[i + 2];

        const dx1 = x - c1x;
        const dy1 = y - c1y;
        const dz1 = z;
        const d1 = Math.sqrt(dx1 * dx1 + dy1 * dy1 + dz1 * dz1);

        const dx2 = x - c2x;
        const dy2 = y - c2y;
        const dz2 = z;
        const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2 + dz2 * dz2);

        const field = Math.exp(-2.6 * d1) + Math.exp(-2.6 * d2);
        const micro =
          Math.sin(time * 1.3 + x * 2.1 + y * 1.6) * 0.03 +
          Math.cos(time * 1.1 + y * 2.2 + z * 1.9) * 0.024;
        const scale = 1 + field * morphIntensity + micro;

        livePositions[i] = x * scale;
        livePositions[i + 1] = y * scale;
        livePositions[i + 2] = z * scale;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
    };

    const clock = new THREE.Clock();
    const renderLoop = () => {
      const t = clock.getElapsedTime() * speed;
      if (!isReducedMotion) {
        updateVertices(t);
        blob.rotation.x = Math.sin(t * 0.45) * 0.09;
        blob.rotation.y = t * 0.16;
        blob.position.x = Math.sin(t * 0.35) * 0.06;
        blob.position.y = Math.cos(t * 0.4) * 0.07;
      }
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(renderLoop);
    };

    resize();
    renderLoop();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(rafId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [color, opacity, morphIntensity, speed]);

  return (
    <div
      className={`pointer-events-none ${fixed ? "fixed" : "absolute"} z-0 ${className ?? placementClasses(placement)}`}
      style={{ width: size, height: height ?? Math.round(size * 1.35) }}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-[55%_45%_57%_43%_/_43%_54%_46%_57%] bg-[#efc8cc]/80 blur-sm" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
