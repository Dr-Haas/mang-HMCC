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

/**
 * One metaball particle.
 *
 * This is NOT where the global silhouette is defined.
 * The silhouette (shape design) comes from the `clusters` array in `MetaballSystem`.
 * Here we only apply motion rules (spring attraction + swirl on hover).
 */
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

/**
 * Extra kinematic metaball driven by pointer.
 *
 * Acts like a local magnet/perturbation:
 * - when hover is active, it follows pointer
 * - when hover ends, it moves back behind the field (z = -6)
 */
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

/**
 * One complete metaball field (left OR right).
 *
 * CRITICAL: `clusters` is where we DESIGN the geometry.
 * Each entry is a "control metaball" that sculpts the final merged silhouette.
 *
 * - `home`: base position in local field space (the static geometry)
 * - `hoverOffset`: motion vector applied around pointer during interaction
 *
 * If you want to change the shape to match a design, edit `clusters` first.
 * Tuning `strength/subtract` changes fusion softness, but cluster placement defines the form.
 */
function MetaballSystem({
  side,
  anchor,
  colors,
  interactionRef,
  pressed,
}: {
  side: "left" | "right";
  anchor: [number, number, number];
  colors: string[];
  interactionRef: React.RefObject<InteractionState>;
  pressed: boolean;
}) {
  // Geometry authoring zone:
  // This array is the "shape blueprint" for each side.
  // Move/add/remove points here to redesign the silhouette.
  const clusters = useMemo(() => {
    if (side === "left") {
      // LEFT SHAPE BLUEPRINT:
      // Rounded top + inward waist + vertical leg.
      return [
        { home: [-0.78, 0.64, 0.08], hoverOffset: [-0.94, 0.7, 0.08] },
        { home: [-0.58, 0.76, -0.05], hoverOffset: [-0.74, 0.84, -0.05] },
        { home: [-0.32, 0.68, 0.06], hoverOffset: [-0.12, 0.78, 0.06] },
        { home: [-0.86, 0.34, -0.06], hoverOffset: [-1.02, 0.38, -0.06] },
        { home: [-0.62, 0.32, 0.06], hoverOffset: [-0.82, 0.28, 0.06] },
        { home: [-0.2, 0.28, -0.06], hoverOffset: [0.06, 0.24, -0.06] },
        { home: [-0.92, -0.02, 0.08], hoverOffset: [-1.1, -0.04, 0.08] },
        { home: [-0.64, -0.02, -0.05], hoverOffset: [-0.82, -0.08, -0.05] },
        { home: [-0.26, -0.06, 0.05], hoverOffset: [0.1, -0.16, 0.05] },
        { home: [-0.88, -0.34, -0.06], hoverOffset: [-1.08, -0.4, -0.06] },
        { home: [-0.66, -0.46, 0.06], hoverOffset: [-0.86, -0.56, 0.06] },
        { home: [-0.46, -0.62, -0.05], hoverOffset: [-0.58, -0.78, -0.05] },
        { home: [-0.7, -0.78, 0.05], hoverOffset: [-0.88, -0.96, 0.05] },
      ];
    }

    // RIGHT SHAPE BLUEPRINT:
    // Smoother, more compact right blob.
    return [
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
    ];
  }, [side]);

  return (
    <MarchingCubes
      resolution={56}
      maxPolyCount={8000}
      enableUvs={false}
      enableColors
      position={anchor}
    >
<<<<<<< HEAD
      {/* Surface material for merged metaballs */}
      <meshStandardMaterial
=======
      <meshPhysicalMaterial
>>>>>>> mag
        vertexColors
        roughness={0.05}
        metalness={0}
        transparent
<<<<<<< HEAD
        opacity={0.95}
      />
      {/*
        Base fusion core:
        - higher strength => more filled mass
        - lower subtract => easier fusion
      */}
      <MarchingCube
        strength={side === "left" ? 0.42 : 0.34}
        subtract={side === "left" ? 7.2 : 8.2}
        color={new THREE.Color("#d75c60")}
        position={[0, 0, 0]}
=======
        opacity={0.9}
        transmission={0.9}
        thickness={2}
        clearcoat={0.8}
        clearcoatRoughness={0.1}
        ior={1.52}
        reflectivity={0.5}
        envMapIntensity={1}
>>>>>>> mag
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

/**
 * Global background renderer with TWO independent metaball systems.
 *
 * Architecture:
 * - one WebGL canvas for performance/stability
 * - left and right systems rendered in same scene
 * - two separate DOM hit areas for independent hover/click interactions
 */
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

<<<<<<< HEAD
  // Converts pointer from DOM hitbox coordinates to normalized local values [-1..1].
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
=======
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
>>>>>>> mag

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
<<<<<<< HEAD
        <ambientLight intensity={1} />
        <directionalLight intensity={1.15} position={[1.6, 1.1, 2.4]} />
        <directionalLight intensity={0.35} position={[-1.2, -0.4, 1.8]} />

        {/* Left metaball field */}
        <MetaballSystem
          side="left"
          anchor={[-0.5, -0.06, 0.5]}
          colors={["#de5b60", "#d94f56", "#e77378", "#cf4c51"]}
=======
        <ambientLight intensity={0.9} />
        <directionalLight intensity={1.2} position={[1.6, 1.1, 2.4]} />
        <directionalLight intensity={0.4} position={[-1.2, -0.4, 1.8]} />
        <pointLight intensity={0.8} position={[0, 2, 2]} color="#ffffff" />
        <MetaballSystem
          anchor={[-0.8, 0.06, 0]}
          colors={["#ff4d5a", "#ff5563", "#ff5f6c", "#ff4555"]}
>>>>>>> mag
          interactionRef={leftInteractionRef}
          pressed={leftPressed}
        />

        {/* Right metaball field */}
        <MetaballSystem
<<<<<<< HEAD
          side="right"
          anchor={[0.95, -0.08, 0]}
          colors={["#de5b60", "#d94f56", "#e77378", "#cf4c51"]}
=======
          anchor={[0.8, -0.08, 0]}
          colors={["#ff4d5a", "#ff5563", "#ff5f6c", "#ff4555"]}
>>>>>>> mag
          interactionRef={rightInteractionRef}
          pressed={rightPressed}
        />
      </Canvas>
<<<<<<< HEAD

      {/* Left interaction hitbox: drives only left system */}
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

      {/* Right interaction hitbox: drives only right system */}
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
=======
>>>>>>> mag
    </div>
  );
}
