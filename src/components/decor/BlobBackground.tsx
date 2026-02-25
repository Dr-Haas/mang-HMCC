"use client";

import * as THREE from "three";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MarchingCubes, MarchingCube, Environment } from "@react-three/drei";

function MetaBall({
  color,
  offset = [0, 0, 0],
  speed = 1,
  strength = 0.7,
  ...props
}: {
  color: string;
  offset?: [number, number, number];
  speed?: number;
  strength?: number;
  position?: [number, number, number];
}) {
  const ref = useRef<any>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime * speed;
    ref.current.position.x =
      (props.position?.[0] || 0) + Math.sin(time + offset[0]) * 0.12;
    ref.current.position.y =
      (props.position?.[1] || 0) + Math.cos(time + offset[1]) * 0.12;
    ref.current.position.z =
      (props.position?.[2] || 0) + Math.sin(time + offset[2]) * 0.05;
  });

  return (
    <mesh ref={ref} position={props.position}>
      <MarchingCube
        strength={strength}
        subtract={7}
        color={new THREE.Color(color)}
      />
    </mesh>
  );
}

function CustomShaderMaterial() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1024, 1024) },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vColor;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vColor = color;
      vNormal = normalize(normalMatrix * normal);
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vColor;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      
      // Lumière principale douce venant du bas-gauche (ombre en haut-droite)
      vec3 lightDir = normalize(vec3(-1.0, -1.0, 0.9));
      float NdotL = dot(normal, lightDir);
      
      // Ombre smooth et douce avec belle transition gooey
      float diffuse = smoothstep(-0.4, 0.8, NdotL);
      diffuse = diffuse * 0.5 + 0.5; // 50% à 100% - ombre visible mais douce
      
      // Teinte rouge clair dans les ombres
      vec3 shadowTint = vec3(1.0, 0.85, 0.85); // Rouge très clair
      float shadowAmount = 1.0 - diffuse;
      vec3 colorWithShadow = mix(vColor, vColor * shadowTint, shadowAmount * 0.6);
      
      // Subsurface scattering pour translucidité goo
      float backLight = max(0.0, dot(normal, -lightDir)) * 0.3;
      float sss = pow(backLight, 2.0) * 0.4;
      
      // Specular brillant et fin pour effet goo
      vec3 halfDir = normalize(lightDir + viewDir);
      float specular = pow(max(dot(normal, halfDir), 0.0), 150.0) * 0.6;
      
      // Rim light (fresnel) pour bords brillants ultra gooey
      float rim = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.5);
      rim = smoothstep(0.3, 1.0, rim) * 0.4;
      
      // Couleur finale ultra gooey avec teinte rouge dans les ombres
      vec3 finalColor = colorWithShadow * (diffuse + sss) + vec3(specular + rim);
      
      // Légère saturation pour vivacité
      finalColor = finalColor * 1.05;
      
      gl_FragColor = vec4(finalColor, 0.98);
    }
  `;

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      transparent
      vertexColors
      side={THREE.DoubleSide}
      depthWrite={false}
      depthTest={false}
    />
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef<any>(null);
  const targetPos = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());

  useFrame(({ pointer, viewport }) => {
    if (!ref.current) return;
    const { width, height } = viewport.getCurrentViewport();
    // Ajuster pour la profondeur Z=-1 (même plan que les autres blobs)
    const depthScale = 4.5 / 3.5;

    // Position cible
    targetPos.current.set(
      pointer.x * (width / 2) * depthScale,
      pointer.y * (height / 2) * depthScale,
      -1
    );

    // Calculer la vélocité pour l'effet de déformation
    velocity.current.subVectors(targetPos.current, ref.current.position);
    const speed = velocity.current.length();

    // Interpolation smooth (lerp)
    ref.current.position.lerp(targetPos.current, 0.15);

    // Effet de déformation basé sur la vitesse
    const baseScale = 1.5;
    const stretchScale = 1 + Math.min(speed * 0.5, 0.5);
    ref.current.scale.setScalar(baseScale + (stretchScale - baseScale) * 0.3);
  });

  return (
    <mesh ref={ref}>
      <MarchingCube
        strength={0.22}
        subtract={8}
        color={new THREE.Color("#e54444")}
      />
    </mesh>
  );
}

export default function BlobBackground() {
  return (
    <div className="absolute -inset-[120%] z-0 pointer-events-none w-[340%] h-[340%]">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3.5], fov: 50, near: 0.01, far: 100 }}
        style={{ width: "100%", height: "100%" }}
        gl={{
          alpha: true,
          antialias: true,
          premultipliedAlpha: false,
          powerPreference: "high-performance",
        }}
      >
        <MarchingCubes
          resolution={100}
          maxPolyCount={50000}
          enableUvs={false}
          enableColors
        >
          <CustomShaderMaterial />

          {/* Grand blob en haut à gauche - forme en L retourné */}
          {/* Boules du haut - partie horizontale */}
          <MetaBall
            color="#e54444"
            position={[-0.75, 0.75, -1]}
            offset={[0, 0, 0]}
            speed={0.2}
            strength={0.6}
          />
          <MetaBall
            color="#d33333"
            position={[-0.85, 0.73, -0.98]}
            offset={[1, 2, 1]}
            speed={0.25}
            strength={0.58}
          />
          {/* Boule de jonction au coin */}
          <MetaBall
            color="#e55555"
            position={[-0.92, 0.71, -0.99]}
            offset={[0.5, 1.5, 2.5]}
            speed={0.23}
            strength={0.65}
          />
          {/* Boules de gauche - partie verticale */}
          <MetaBall
            color="#e56666"
            position={[-0.95, 0.63, -0.97]}
            offset={[3, 3, 0]}
            speed={0.27}
            strength={0.62}
          />
          <MetaBall
            color="#e54444"
            position={[-0.97, 0.55, -0.98]}
            offset={[2.5, 0.8, 1.5]}
            speed={0.21}
            strength={0.6}
          />
          <MetaBall
            color="#e55555"
            position={[-0.99, 0.47, -0.99]}
            offset={[4.2, 1.3, 2.1]}
            speed={0.24}
            strength={0.58}
          />

          {/* Grand blob en bas à droite - plus sur la droite */}
          {/* Boules de droite - partie verticale (principale) */}
          <MetaBall
            color="#d33333"
            position={[0.95, 0.02, -1]}
            offset={[4, 4, 3]}
            speed={0.2}
            strength={0.45}
          />
          <MetaBall
            color="#e54444"
            position={[0.96, -0.04, -0.98]}
            offset={[5, 3, 4]}
            speed={0.25}
            strength={0.43}
          />
          <MetaBall
            color="#e55555"
            position={[0.97, -0.1, -0.99]}
            offset={[6, 4, 3]}
            speed={0.27}
            strength={0.47}
          />
          {/* Boule de jonction */}
          <MetaBall
            color="#e56666"
            position={[0.91, -0.13, -0.97]}
            offset={[5.5, 3.5, 5.5]}
            speed={0.23}
            strength={0.45}
          />
          {/* Boule du bas */}
          <MetaBall
            color="#e54444"
            position={[0.85, -0.15, -0.98]}
            offset={[4.5, 5.8, 3.5]}
            speed={0.21}
            strength={0.43}
          />

          {/* Blob du curseur interactif */}
          <Pointer />
        </MarchingCubes>
      </Canvas>
    </div>
  );
}
