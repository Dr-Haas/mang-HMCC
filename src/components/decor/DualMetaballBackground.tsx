"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { MarchingCube, MarchingCubes } from "@react-three/drei";

interface DualMetaballBackgroundProps {
  className?: string;
}

interface InteractionState {
  hover: boolean;
  pressed: boolean;
  pointer: { x: number; y: number };
}

interface MetaBallProps {
  color: string;
  home: [number, number, number];
  hoverOffset: [number, number, number];
  pressed: boolean;
  interactionRef: React.RefObject<InteractionState>;
}

interface PointerCubeProps {
  interactionRef: React.RefObject<InteractionState>;
  pressed: boolean;
}

function MetaBall({
  color,
  home,
  hoverOffset,
  pressed,
  interactionRef,
}: MetaBallProps) {
  const cubeRef = useRef<THREE.Group | null>(null);
  const target = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const position = useRef(new THREE.Vector3(home[0], home[1], home[2]));
  const spring = useRef(new THREE.Vector3());
  const swirl = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!cubeRef.current || !interactionRef.current) return;
    const dt = Math.min(delta, 0.1);
    const interaction = interactionRef.current;

    const pointerX = interaction.pointer.x * 0.82;
    const pointerY = interaction.pointer.y * 0.58;

    if (interaction.hover) {
      const spread = pressed ? 0.95 : 0.72;
      target.current.set(
        pointerX + hoverOffset[0] * spread,
        pointerY + hoverOffset[1] * spread,
        hoverOffset[2],
      );
    } else {
      target.current.set(home[0], home[1], home[2]);
    }

    spring.current.subVectors(target.current, position.current);
    const attraction = interaction.hover ? (pressed ? 9 : 7.2) : 7.8;
    spring.current.multiplyScalar(attraction * dt);
    velocity.current.add(spring.current);
    velocity.current.multiplyScalar(Math.pow(0.84, dt * 60));

    if (interaction.hover) {
      swirl.current.set(
        -(position.current.y - pointerY),
        position.current.x - pointerX,
        0,
      );
      const swirlStrength = pressed ? 0.2 : 0.1;
      swirl.current.multiplyScalar(swirlStrength * dt);
      velocity.current.add(swirl.current);
    }

    position.current.addScaledVector(velocity.current, dt * 60);
    cubeRef.current.position.copy(position.current);
  });

  return (
    <MarchingCube
      ref={cubeRef}
      strength={0.54}
      subtract={5.1}
      color={new THREE.Color(color)}
      position={home}
    />
  );
}

function PointerCube({ interactionRef, pressed }: PointerCubeProps) {
  const cubeRef = useRef<THREE.Group | null>(null);
  const position = useRef(new THREE.Vector3(0, 0, -6));
  const velocity = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3(0, 0, -6));
  const spring = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!cubeRef.current || !interactionRef.current) return;
    const interaction = interactionRef.current;
    if (interaction.hover) {
      target.current.set(
        interaction.pointer.x * 0.82,
        interaction.pointer.y * 0.58,
        0,
      );
    } else {
      target.current.set(0, 0, -6);
    }
  });

  useFrame((_, delta) => {
    if (!cubeRef.current) return;
    const dt = Math.min(delta, 0.1);
    spring.current.subVectors(target.current, position.current).multiplyScalar(8.2 * dt);
    velocity.current.add(spring.current);
    velocity.current.multiplyScalar(Math.pow(0.86, dt * 60));
    position.current.addScaledVector(velocity.current, dt * 60);
    cubeRef.current.position.copy(position.current);
  });

  return (
    <MarchingCube
      ref={cubeRef}
      strength={pressed ? 0.5 : 0.41}
      subtract={9.8}
      color={new THREE.Color("#ff8b8b")}
      position={[0, 0, -6]}
    />
  );
}

function MetaballSystem({
  anchor,
  colors,
  interactionRef,
  pressed,
}: {
  anchor: [number, number, number];
  colors: string[];
  interactionRef: React.RefObject<InteractionState>;
  pressed: boolean;
}) {
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

  return (
    <MarchingCubes
      resolution={56}
      maxPolyCount={8000}
      enableUvs={false}
      enableColors
      position={anchor}
    >
      <meshStandardMaterial
        vertexColors
        roughness={0.06}
        metalness={0.05}
        transparent
        opacity={0.95}
      />
      <MarchingCube
        strength={0.34}
        subtract={8.2}
        color={new THREE.Color("#d75c60")}
        position={[0, 0, 0]}
      />
      {clusters.map((cluster, index) => (
        <MetaBall
          key={`${anchor[0]}-${anchor[1]}-${index}`}
          color={colors[index % colors.length] ?? "#de5b60"}
          home={cluster.home as [number, number, number]}
          hoverOffset={cluster.hoverOffset as [number, number, number]}
          pressed={pressed}
          interactionRef={interactionRef}
        />
      ))}
      <PointerCube interactionRef={interactionRef} pressed={pressed} />
    </MarchingCubes>
  );
}

export function DualMetaballBackground({ className }: DualMetaballBackgroundProps) {
  const leftInteractionRef = useRef<InteractionState>({
    hover: false,
    pressed: false,
    pointer: { x: 0, y: 0 },
  });
  const rightInteractionRef = useRef<InteractionState>({
    hover: false,
    pressed: false,
    pointer: { x: 0, y: 0 },
  });

  const [leftPressed, setLeftPressed] = useState(false);
  const [rightPressed, setRightPressed] = useState(false);

  const updatePointer = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    side: "left" | "right",
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const isTouch = "touches" in event;
    const clientX = isTouch ? event.touches[0]?.clientX ?? 0 : event.clientX;
    const clientY = isTouch ? event.touches[0]?.clientY ?? 0 : event.clientY;
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((clientY - rect.top) / rect.height) * -2 + 1;

    if (side === "left") {
      leftInteractionRef.current.pointer = { x, y };
    } else {
      rightInteractionRef.current.pointer = { x, y };
    }
  };

  return (
    <div className={`${className ?? ""} pointer-events-none`}>
      <Canvas
        className="absolute inset-0"
        dpr={[1, 1]}
        gl={{ antialias: false, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 5], fov: 25 }}
      >
        <ambientLight intensity={1} />
        <directionalLight intensity={1.15} position={[1.6, 1.1, 2.4]} />
        <directionalLight intensity={0.35} position={[-1.2, -0.4, 1.8]} />
        <MetaballSystem
          anchor={[-0.95, 0.06, 0]}
          colors={["#de5b60", "#d94f56", "#e77378", "#cf4c51"]}
          interactionRef={leftInteractionRef}
          pressed={leftPressed}
        />
        <MetaballSystem
          anchor={[0.95, -0.08, 0]}
          colors={["#de5b60", "#d94f56", "#e77378", "#cf4c51"]}
          interactionRef={rightInteractionRef}
          pressed={rightPressed}
        />
      </Canvas>

      <div
        className="pointer-events-auto absolute -top-52 -left-[280px] h-[1000px] w-[640px] md:-left-[320px] md:h-[1040px] md:w-[680px]"
        onMouseEnter={(event) => {
          leftInteractionRef.current.hover = true;
          leftInteractionRef.current.pressed = true;
          updatePointer(event, "left");
          setLeftPressed(true);
        }}
        onMouseMove={(event) => {
          leftInteractionRef.current.hover = true;
          leftInteractionRef.current.pressed = true;
          setLeftPressed(true);
          updatePointer(event, "left");
        }}
        onMouseLeave={() => {
          leftInteractionRef.current.hover = false;
          leftInteractionRef.current.pressed = false;
          setLeftPressed(false);
        }}
        onMouseDown={() => {
          leftInteractionRef.current.pressed = true;
          setLeftPressed(true);
        }}
        onMouseUp={() => {
          leftInteractionRef.current.pressed = false;
          setLeftPressed(false);
        }}
        onTouchStart={(event) => {
          leftInteractionRef.current.hover = true;
          leftInteractionRef.current.pressed = true;
          setLeftPressed(true);
          updatePointer(event, "left");
        }}
        onTouchMove={(event) => {
          leftInteractionRef.current.hover = true;
          leftInteractionRef.current.pressed = true;
          setLeftPressed(true);
          updatePointer(event, "left");
        }}
        onTouchEnd={() => {
          leftInteractionRef.current.hover = false;
          leftInteractionRef.current.pressed = false;
          setLeftPressed(false);
        }}
      />

      <div
        className="pointer-events-auto absolute -bottom-62 -right-[270px] h-[980px] w-[640px] md:-right-[320px] md:h-[1020px] md:w-[660px]"
        onMouseEnter={(event) => {
          rightInteractionRef.current.hover = true;
          rightInteractionRef.current.pressed = true;
          updatePointer(event, "right");
          setRightPressed(true);
        }}
        onMouseMove={(event) => {
          rightInteractionRef.current.hover = true;
          rightInteractionRef.current.pressed = true;
          setRightPressed(true);
          updatePointer(event, "right");
        }}
        onMouseLeave={() => {
          rightInteractionRef.current.hover = false;
          rightInteractionRef.current.pressed = false;
          setRightPressed(false);
        }}
        onMouseDown={() => {
          rightInteractionRef.current.pressed = true;
          setRightPressed(true);
        }}
        onMouseUp={() => {
          rightInteractionRef.current.pressed = false;
          setRightPressed(false);
        }}
        onTouchStart={(event) => {
          rightInteractionRef.current.hover = true;
          rightInteractionRef.current.pressed = true;
          setRightPressed(true);
          updatePointer(event, "right");
        }}
        onTouchMove={(event) => {
          rightInteractionRef.current.hover = true;
          rightInteractionRef.current.pressed = true;
          setRightPressed(true);
          updatePointer(event, "right");
        }}
        onTouchEnd={() => {
          rightInteractionRef.current.hover = false;
          rightInteractionRef.current.pressed = false;
          setRightPressed(false);
        }}
      />
    </div>
  );
}
