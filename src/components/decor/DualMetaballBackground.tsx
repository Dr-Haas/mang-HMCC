"use client";

import { useMemo, useRef, useState, useEffect } from "react";
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
  const offset = useRef({
    x: Math.random() * Math.PI * 2,
    y: Math.random() * Math.PI * 2,
    z: Math.random() * Math.PI * 2,
    speedX: 0.6 + Math.random() * 0.7,
    speedY: 0.5 + Math.random() * 0.6,
    speedZ: 0.4 + Math.random() * 0.5,
    amplitudeX: 0.06 + Math.random() * 0.08,
    amplitudeY: 0.05 + Math.random() * 0.07,
    amplitudeZ: 0.04 + Math.random() * 0.06,
  });

  useFrame((_, delta) => {
    if (!cubeRef.current) return;
    const dt = Math.min(delta, 0.1);
    const time = performance.now() * 0.001;
    
    // Mouvement organique avec plusieurs fréquences
    const x = home[0] + 
      Math.sin(time * offset.current.speedX + offset.current.x) * offset.current.amplitudeX +
      Math.cos(time * offset.current.speedX * 0.5 + offset.current.x) * offset.current.amplitudeX * 0.5;
    
    const y = home[1] + 
      Math.cos(time * offset.current.speedY + offset.current.y) * offset.current.amplitudeY +
      Math.sin(time * offset.current.speedY * 0.7 + offset.current.y) * offset.current.amplitudeY * 0.6;
    
    const z = home[2] + 
      Math.sin(time * offset.current.speedZ + offset.current.z) * offset.current.amplitudeZ +
      Math.cos(time * offset.current.speedZ * 1.3 + offset.current.z) * offset.current.amplitudeZ * 0.4;
    
    cubeRef.current.position.set(x, y, z);
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
  const position = useRef(new THREE.Vector3(0, 0, -0.3));
  const velocity = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3(0, 0, -0.3));
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
      target.current.set(0, 0, -0.3);
    }
  });

  useFrame((_, delta) => {
    if (!cubeRef.current) return;
    const dt = Math.min(delta, 0.1);
    const interaction = interactionRef.current;
    
    // Deux vitesses différentes : rapide quand hover, lent quand retour
    const springStrength = interaction?.hover ? 8.2 : 2.5;
    const damping = interaction?.hover ? 0.86 : 0.92;
    
    spring.current.subVectors(target.current, position.current).multiplyScalar(springStrength * dt);
    velocity.current.add(spring.current);
    velocity.current.multiplyScalar(Math.pow(damping, dt * 60));
    position.current.addScaledVector(velocity.current, dt * 60);
    cubeRef.current.position.copy(position.current);
  });

  return (
    <MarchingCube
      ref={cubeRef}
      strength={pressed ? 1.0 : 0.85}
      subtract={9.8}
      color={new THREE.Color("#ff6b6b")}
      position={[0, 0, -0.3]}
    />
  );
}

function CentralBlob() {
  const cubeRef = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (!cubeRef.current) return;
    const time = performance.now() * 0.001;
    
    // Mouvement organique subtil pour le blob central
    const x = Math.sin(time * 0.2) * 0.02 + Math.cos(time * 0.15) * 0.015;
    const y = Math.cos(time * 0.18) * 0.018 + Math.sin(time * 0.22) * 0.012;
    const z = Math.sin(time * 0.16) * 0.015;
    
    // Rotation subtile
    cubeRef.current.rotation.x = Math.sin(time * 0.12) * 0.05;
    cubeRef.current.rotation.y = Math.cos(time * 0.1) * 0.08;
    cubeRef.current.rotation.z = Math.sin(time * 0.14) * 0.04;
    
    cubeRef.current.position.set(x, y, z);
  });

  return (
    <MarchingCube
      ref={cubeRef}
      strength={0.34}
      subtract={8.2}
      color={new THREE.Color("#ff4d5a")}
      position={[0, 0, 0]}
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
      <meshPhysicalMaterial
        vertexColors
        roughness={0.05}
        metalness={0}
        transparent
        opacity={0.9}
        transmission={0.9}
        thickness={2}
        clearcoat={0.8}
        clearcoatRoughness={0.1}
        ior={1.52}
        reflectivity={0.5}
        envMapIntensity={1}
      />
      <CentralBlob />
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
  const containerRef = useRef<HTMLDivElement>(null);

  const [leftPressed, setLeftPressed] = useState(false);
  const [rightPressed, setRightPressed] = useState(false);

  useEffect(() => {
    const updatePointer = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isTouch = event instanceof TouchEvent;
      const clientX = isTouch ? event.touches[0]?.clientX ?? 0 : event.clientX;
      const clientY = isTouch ? event.touches[0]?.clientY ?? 0 : event.clientY;
      
      // Position absolue de la souris par rapport au container
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      // Zones approximatives des blobs (gauche et droite)
      const leftBlobX = rect.width * 0.25;
      const leftBlobY = rect.height * 0.45;
      const rightBlobX = rect.width * 0.75;
      const rightBlobY = rect.height * 0.55;
      const interactionRadius = 350;

      const distToLeft = Math.sqrt(
        Math.pow(mouseX - leftBlobX, 2) + Math.pow(mouseY - leftBlobY, 2)
      );
      const distToRight = Math.sqrt(
        Math.pow(mouseX - rightBlobX, 2) + Math.pow(mouseY - rightBlobY, 2)
      );

      // Activer l'interaction si on est dans le rayon
      if (distToLeft < interactionRadius) {
        // Calculer la position relative normalisée (-1 à 1)
        const localX = (mouseX - leftBlobX) / 350;
        const localY = -(mouseY - leftBlobY) / 350;
        leftInteractionRef.current.hover = true;
        leftInteractionRef.current.pointer = { x: localX, y: localY };
        leftInteractionRef.current.pressed = true;
        setLeftPressed(true);
      } else {
        leftInteractionRef.current.hover = false;
        leftInteractionRef.current.pointer = { x: 0, y: 0 };
        leftInteractionRef.current.pressed = false;
        setLeftPressed(false);
      }

      if (distToRight < interactionRadius) {
        // Calculer la position relative normalisée (-1 à 1)
        const localX = (mouseX - rightBlobX) / 350;
        const localY = -(mouseY - rightBlobY) / 350;
        rightInteractionRef.current.hover = true;
        rightInteractionRef.current.pointer = { x: localX, y: localY };
        rightInteractionRef.current.pressed = true;
        setRightPressed(true);
      } else {
        rightInteractionRef.current.hover = false;
        rightInteractionRef.current.pointer = { x: 0, y: 0 };
        rightInteractionRef.current.pressed = false;
        setRightPressed(false);
      }
    };

    window.addEventListener('mousemove', updatePointer);
    window.addEventListener('touchmove', updatePointer);

    return () => {
      window.removeEventListener('mousemove', updatePointer);
      window.removeEventListener('touchmove', updatePointer);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`${className ?? ""} pointer-events-none`}
    >
      <Canvas
        className="absolute inset-0"
        dpr={[1, 1]}
        gl={{ 
          antialias: false, 
          powerPreference: "low-power",
          toneMapping: 0, // NoToneMapping
          toneMappingExposure: 1
        }}
        camera={{ position: [0, 0, 5], fov: 25 }}
        flat
      >
        <ambientLight intensity={0.9} />
        <directionalLight intensity={1.2} position={[1.6, 1.1, 2.4]} />
        <directionalLight intensity={0.4} position={[-1.2, -0.4, 1.8]} />
        <pointLight intensity={0.8} position={[0, 2, 2]} color="#ffffff" />
        <MetaballSystem
          anchor={[-0.8, 0.06, 0]}
          colors={["#ff4d5a", "#ff5563", "#ff5f6c", "#ff4555"]}
          interactionRef={leftInteractionRef}
          pressed={leftPressed}
        />
        <MetaballSystem
          anchor={[0.8, -0.08, 0]}
          colors={["#ff4d5a", "#ff5563", "#ff5f6c", "#ff4555"]}
          interactionRef={rightInteractionRef}
          pressed={rightPressed}
        />
      </Canvas>
    </div>
  );
}
