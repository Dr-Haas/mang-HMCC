"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { MarchingCube, MarchingCubes } from "@react-three/drei";
import { BallCollider, Physics, RigidBody, type RapierRigidBody } from "@react-three/rapier";

interface MetaballShapeProps {
  className?: string;
  colors?: string[];
}

interface MetaBallProps {
  color: string;
  home: [number, number, number];
  hoverOffset: [number, number, number];
  interactionRef: React.RefObject<{
    hover: boolean;
    pressed: boolean;
    pointer: THREE.Vector3;
  }>;
}

function MetaBall({ color, home, hoverOffset, interactionRef }: MetaBallProps) {
  const bodyRef = useRef<RapierRigidBody | null>(null);
  const tmp = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());
  const tangent = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!bodyRef.current) return;
    const frameDelta = Math.min(delta, 0.1);
    const current = bodyRef.current.translation();
    const interaction = interactionRef.current;
    const pointer = interaction?.pointer ?? new THREE.Vector3();
    const isHover = Boolean(interaction?.hover);
    const isPressed = Boolean(interaction?.pressed);

    if (isHover) {
      const spread = isPressed ? 0.95 : 0.72;
      target.current.set(
        pointer.x + hoverOffset[0] * spread,
        pointer.y + hoverOffset[1] * spread,
        hoverOffset[2],
      );
    } else {
      target.current.set(home[0], home[1], home[2]);
    }

    tmp.current.set(
      target.current.x - current.x,
      target.current.y - current.y,
      target.current.z - current.z,
    );

    const attraction = isHover ? (isPressed ? 1.45 : 1.2) : 1.3;
    tmp.current.multiplyScalar(attraction * frameDelta);

    if (isHover) {
      // Local swirl around the pointer for a liquid split/rejoin effect.
      tangent.current.set(
        -(current.y - pointer.y),
        current.x - pointer.x,
        0,
      );
      const swirlStrength = isPressed ? 0.22 : 0.1;
      tangent.current.multiplyScalar(swirlStrength * frameDelta);
      tmp.current.add(tangent.current);
    }

    bodyRef.current.applyImpulse(
      { x: tmp.current.x, y: tmp.current.y, z: tmp.current.z },
      true,
    );
  });

  return (
    <RigidBody
      ref={bodyRef}
      position={home}
      colliders={false}
      linearDamping={5}
      angularDamping={0.95}
    >
      <MarchingCube strength={0.56} subtract={5.15} color={new THREE.Color(color)} />
      <BallCollider args={[0.14]} />
    </RigidBody>
  );
}

function Pointer({
  interactionRef,
  pressed,
}: {
  interactionRef: React.RefObject<{
    hover: boolean;
    pressed: boolean;
    pointer: THREE.Vector3;
  }>;
  pressed: boolean;
}) {
  const bodyRef = useRef<RapierRigidBody | null>(null);

  useFrame(() => {
    if (!bodyRef.current || !interactionRef.current) return;
    const { pointer, hover } = interactionRef.current;
    const target = hover ? pointer : new THREE.Vector3(0, 0, -6);
    bodyRef.current.setNextKinematicTranslation({
      x: target.x,
      y: target.y,
      z: target.z,
    });
  });

  const strength = pressed ? 0.54 : 0.44;

  return (
    <RigidBody ref={bodyRef} type="kinematicPosition" colliders={false}>
      <MarchingCube strength={strength} subtract={9.6} color={new THREE.Color("#ff8b8b")} />
      <BallCollider args={[0.14]} />
    </RigidBody>
  );
}

export function MetaballShape({
  className,
  colors = ["#de5b60", "#d94f56", "#e77378", "#cf4c51"],
}: MetaballShapeProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  const interactionRef = useRef({
    hover: false,
    pressed: false,
    pointer: new THREE.Vector3(0, 0, 0),
  });

  const clusters = useMemo(
    () => [
      { home: [0.12, 0.24, 0.08], hoverOffset: [0.56, 0.28, 0.08] },
      { home: [-0.18, 0.22, -0.07], hoverOffset: [-0.58, 0.22, -0.07] },
      { home: [0.22, 0.06, 0.04], hoverOffset: [0.68, -0.14, 0.04] },
      { home: [-0.26, 0.02, -0.08], hoverOffset: [-0.7, -0.08, -0.08] },
      { home: [0.18, -0.16, 0.08], hoverOffset: [0.58, -0.34, 0.08] },
      { home: [-0.16, -0.2, -0.07], hoverOffset: [-0.56, -0.4, -0.07] },
      { home: [0.06, -0.28, 0.03], hoverOffset: [0.26, -0.62, 0.03] },
      { home: [-0.04, 0.32, -0.05], hoverOffset: [-0.18, 0.66, -0.05] },
      { home: [0.32, -0.02, 0.06], hoverOffset: [0.84, 0.18, 0.06] },
      { home: [-0.32, 0.02, -0.06], hoverOffset: [-0.84, -0.18, -0.06] },
    ],
    [],
  );

  useEffect(() => {
    interactionRef.current.hover = hover;
  }, [hover]);

  useEffect(() => {
    interactionRef.current.pressed = pressed;
  }, [pressed]);

  const updatePointer = (clientX: number, clientY: number) => {
    const node = rootRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((clientY - rect.top) / rect.height) * -2 + 1;
    interactionRef.current.pointer.set(nx * 1.7, ny * 1.3, 0);
  };

  return (
    <div
      ref={rootRef}
      className={`${className ?? ""} pointer-events-auto`}
      onMouseEnter={() => setHover(true)}
      onMouseMove={(event) => updatePointer(event.clientX, event.clientY)}
      onMouseLeave={() => {
        setHover(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => {
        setHover(true);
        setPressed(true);
      }}
      onTouchMove={(event) => {
        const touch = event.touches[0];
        if (!touch) return;
        updatePointer(touch.clientX, touch.clientY);
      }}
      onTouchEnd={() => {
        setHover(false);
        setPressed(false);
      }}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1]}
        gl={{ antialias: false, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 5], fov: 25 }}
      >
        <ambientLight intensity={1} />
        <directionalLight intensity={1.15} position={[1.6, 1.1, 2.4]} />
        <directionalLight intensity={0.35} position={[-1.2, -0.4, 1.8]} />

        <Physics gravity={[0, 0, 0]}>
          <MarchingCubes
            resolution={56}
            maxPolyCount={8000}
            enableUvs={false}
            enableColors
          >
            <meshStandardMaterial
              vertexColors
              roughness={0.06}
              metalness={0.05}
              transparent
              opacity={0.95}
            />
            {/* Keeps a continuous liquid core to avoid pop-in/pop-out at fusion threshold */}
            <MarchingCube strength={0.34} subtract={8.2} color={new THREE.Color("#d75c60")} />
            {clusters.map((cluster, index) => (
              <MetaBall
                key={`${cluster.home.join("-")}-${index}`}
                color={colors[index % colors.length] ?? "#de5b60"}
                home={cluster.home as [number, number, number]}
                hoverOffset={cluster.hoverOffset as [number, number, number]}
                interactionRef={interactionRef}
              />
            ))}
            <Pointer interactionRef={interactionRef} pressed={pressed} />
          </MarchingCubes>
        </Physics>
      </Canvas>
    </div>
  );
}
