"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Text } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";

interface SwitchButtonProps {
  onSwitch?: () => void;
  onZoomStart?: () => void;
}

function getResponsiveCameraZ(width: number): number {
  // 1920px => z=10, smaller screens need camera further back
  if (width >= 1920) return 10;
  if (width >= 1440) return 12;
  if (width >= 1280) return 13;
  if (width >= 1024) return 15;
  if (width >= 768) return 17;
  if (width >= 480) return 19;
  return 21; // Small mobile
}

function CameraController({ zoomIn }: { zoomIn: boolean }) {
  const { camera, size } = useThree();
  const initialZRef = useRef<number | null>(null);

  // Set initial camera position based on screen size
  useEffect(() => {
    if (initialZRef.current === null) {
      const targetZ = getResponsiveCameraZ(size.width);
      camera.position.z = targetZ;
      initialZRef.current = targetZ;
    }
  }, [camera, size.width]);

  // Update camera on resize (when not zoomed)
  useEffect(() => {
    if (!zoomIn && initialZRef.current !== null) {
      const targetZ = getResponsiveCameraZ(size.width);
      gsap.to(camera.position, {
        z: targetZ,
        duration: 0.5,
        ease: "power2.out",
      });
      initialZRef.current = targetZ;
    }
  }, [size.width, zoomIn, camera]);

  // Zoom animation on click
  useEffect(() => {
    if (zoomIn) {
      gsap.to(camera.position, {
        x: 4.2,
        y: -0.05,
        z: 0.25,
        duration: 1.3,
        ease: "power2.inOut",
      });
    }
  }, [zoomIn, camera]);

  return null;
}

function SwitchButton({
  onSwitch,
  onZoomStart,
  isMobile = false,
}: {
  onSwitch?: () => void;
  onZoomStart?: () => void;
  isMobile?: boolean;
}) {
  const { scene } = useGLTF("/models/switch_button.glb");
  const boutonRef = useRef<THREE.Mesh | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [isOn, setIsOn] = useState(false);
  const initialPosRef = useRef<number>(0);
  const opacityRef = useRef({ value: 1 });

  useEffect(() => {
    console.log("=== Model Parts ===");
    scene.traverse((child) => {
      console.log(`Name: ${child.name}, Type: ${child.type}`, child);
      if (child instanceof THREE.Mesh) {
        // Ensure each mesh has its own material instance
        child.material = child.material.clone();
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.transparent = true;
        mat.opacity = 1;

        // sensible defaults
        mat.metalness = 0.05;
        mat.roughness = 0.6;

        if (child.name === "BOUTON_SLIDE") {
          boutonRef.current = child;
          initialPosRef.current = child.position.x;

          // fetch control values (fallbacks)
          const grain = 22;
          const scratchesAlpha = 0.03;
          const tint = "#b81a25";
          const bumpScaleVal = 0.02;
          const roughVal = 0.8;
          const metalVal = 0;

          // procedural canvas texture for more realistic, less plastified look
          const size = 1024;
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            // fill base tint
            ctx.fillStyle = tint;
            ctx.fillRect(0, 0, size, size);

            // add subtle noise/grain
            const img = ctx.getImageData(0, 0, size, size);
            for (let i = 0; i < img.data.length; i += 4) {
              const delta = (Math.random() - 0.5) * grain;
              img.data[i] = Math.min(255, Math.max(0, img.data[i] + delta));
              img.data[i + 1] = Math.min(
                255,
                Math.max(0, img.data[i + 1] + delta)
              );
              img.data[i + 2] = Math.min(
                255,
                Math.max(0, img.data[i + 2] + delta)
              );
            }
            ctx.putImageData(img, 0, 0);

            // micro-scratches: use darker strokes to create subtle grooves
            ctx.strokeStyle = `rgba(0,0,0,${scratchesAlpha})`;
            ctx.lineWidth = 1;
            for (let x = 0; x < size; x += 28) {
              ctx.beginPath();
              const jitter = (Math.random() - 0.5) * 6;
              ctx.moveTo(x + jitter, 0);
              ctx.lineTo(x + jitter + (Math.random() * 2 - 1), size);
              ctx.stroke();
            }
          }

          const tex = new THREE.CanvasTexture(canvas);
          tex.wrapS = THREE.RepeatWrapping;
          tex.wrapT = THREE.RepeatWrapping;
          tex.repeat.set(1, 1);
          (tex as any).encoding = (THREE as any).sRGBEncoding;
          (tex as any).anisotropy = 4;
          tex.needsUpdate = true;

          // Assign maps to create micro-variation: color + bump (avoid roughnessMap)
          mat.map = tex;
          mat.color = new THREE.Color(tint);
          mat.metalness = 0; // ensure non-metal
          mat.roughness = Math.max(roughVal, 0.78); // fairly matte
          mat.bumpMap = tex;
          mat.bumpScale = bumpScaleVal * 0.6; // subtler bump
          // avoid using the same color texture as roughnessMap — can create shiny spots
          // mat.roughnessMap = tex;
          mat.needsUpdate = true;
          child.castShadow = true;
          child.receiveShadow = true;
        } else if (child.name === "SUPPORT") {
          mat.color = new THREE.Color("#f2efea"); // blanc cassé
          mat.roughness = 0.6;
        } else if (child.name === "TEXT") {
          mat.color = new THREE.Color("#a11d2a"); // texte rouge mat
          mat.roughness = 0.5;
        }
      }
    });
  }, [scene]);

  // Suppression du fade-in : le bouton est visible immédiatement

  const handleHover = (hovered: boolean) => {
    document.body.style.cursor = hovered ? "pointer" : "";

    if (!boutonRef.current || isOn) return;

    gsap.to(boutonRef.current.position, {
      x: hovered ? initialPosRef.current + 0.05 : initialPosRef.current,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    if (!boutonRef.current || isOn) return;

    setIsOn(true);
    document.body.style.cursor = ""; // Réinitialise le curseur global
    setTimeout(() => {
      document.body.style.cursor = "";
    }, 1000);

    // Slide le bouton
    gsap.to(boutonRef.current.position, {
      x: initialPosRef.current + 0.8,
      duration: 0.4,
      ease: "power3.out",
    });

    // Déclencher le zoom et le fade en même temps
    onZoomStart?.();
    onSwitch?.();
  };

  return (
    <group ref={groupRef} position={isMobile ? [0, -0.55, 0] : [3.95, -0.05, 0]}>
      <primitive
        object={scene}
        scale={isMobile ? 1.2 : 0.65}
        onPointerOver={() => handleHover(true)}
        onPointerOut={() => handleHover(false)}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
    </group>
  );
}

function IntroText({ isMobile = false }: { isMobile?: boolean }) {
  const [opacity, setOpacity] = useState(0);
  const opacityRef = useRef({ value: 0 });

  // Fade in on mount
  useEffect(() => {
    gsap.to(opacityRef.current, {
      value: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.3,
      onUpdate: () => setOpacity(opacityRef.current.value),
    });
  }, []);

  // Mobile: centré au-dessus du bouton (switch à [0,0,0])
  // Desktop: au-dessus du bouton (switch à [3.95,-0.05,0])
  const posX = isMobile ? 0 : 3.95;
  const posY = isMobile ? 1.25 : 1.8;

  return (
    <Text
      position={[posX, posY, 0]}
      fontSize={isMobile ? 0.5 : 0.5}
      maxWidth={isMobile ? 6 : 10}
      lineHeight={1.4}
      textAlign="center"
      color="#b81a25"
      anchorX="center"
      anchorY="middle"
      fontWeight={isMobile ? 600 : 300}
      fillOpacity={opacity}
    >
      Un clic pour alléger votre gestion
    </Text>
  );
}

// Preload le modèle
useGLTF.preload("/models/switch_button.glb");
interface Canvas3DProps {
  className?: string;
  onSwitch?: () => void;
}

export function Canvas3D({ className = "", onSwitch }: Canvas3DProps) {
  // Réinitialise le curseur global à chaque montage (changement de page)
  useEffect(() => {
    document.body.style.cursor = "";
    return () => {
      document.body.style.cursor = "";
    };
  }, []);
  const [zoomIn, setZoomIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleZoomStart = () => {
    setZoomIn(true);
  };

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: isMobile ? 28 : 50 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <CameraController zoomIn={zoomIn} />
          <ambientLight intensity={0} color="#e8e4dc" />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.95}
            color="#f5f3ef"
          />
          <IntroText isMobile={isMobile} />
          <SwitchButton onSwitch={onSwitch} onZoomStart={handleZoomStart} isMobile={isMobile} />
          <Environment preset="studio" environmentIntensity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
