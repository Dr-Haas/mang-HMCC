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
    
    #define STEPS 128
    #define MIN_DISTANCE 0.001
    #define MAX_DISTANCE 100.0
    #define STEP_SIZE 0.001
    #define PI 3.1416
    
    vec3 rgb(float r, float g, float b) {
      return 1.0 - vec3(r / 255.0, g / 255.0, b / 255.0);
    }
    
    mat3 rotY(float ang) {
      float c = cos(ang), s = sin(ang);
      return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
    }
    
    mat3 rotX(float ang) {
      float c = cos(ang), s = sin(ang);
      return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
    }
    
    vec3 twist(vec3 p, float amount) {
      float c = cos(amount * p.y);
      float s = sin(amount * p.y);
      mat2  m = mat2(c, -s, s, c);
      return vec3(m * p.xz, p.y);
    }
    
    float unionSdf(float a, float b) {
      return min(a, b);
    }
    
    float sphere(vec3 p, float r) {
      return length(p) - r;
    }
    
    float torus(vec3 p, vec2 t) {
      vec2 q = vec2(length(p.xz)-t.x,p.y);
      return length(q)-t.y;
    }
    
    float scene(vec3 p) {
      return unionSdf(
        torus(twist(p * rotY(-uTime), 2.5), vec2(1.25, 0.5)),
        sphere(p + vec3(0.0, sin(uTime) * 0.15, 0.0), 0.5)
      );
    }
    
    float light(vec3 p, vec3 normal, vec3 lightPos) {
      vec3 direction = normalize(lightPos - p);
      float specular = 0.5 * pow(max(dot(direction, reflect(-direction, normal)), 0.0), 2.0);  
      return max(0.1, dot(normal, direction) * 1.2 - specular);
    }
    
    vec3 calculateNormal(vec3 p) {
      float gradientX = scene(p + vec3(STEP_SIZE, 0.0, 0.0)) - scene(p - vec3(STEP_SIZE, 0.0, 0.0));
      float gradientY = scene(p + vec3(0.0, STEP_SIZE, 0.0)) - scene(p - vec3(0.0, STEP_SIZE, 0.0));
      float gradientZ = scene(p + vec3(0.0, 0.0, STEP_SIZE)) - scene(p - vec3(0.0, 0.0, STEP_SIZE));
      vec3 normal = vec3(gradientX, gradientY, gradientZ);
      return normalize(normal);
    }
    
    vec3 rayMarch(vec3 ro, vec3 rd) {
      float traveled = 0.0;
      for (int i = 0; i < STEPS; ++i) {
        vec3 currentPos = ro + traveled * rd;
        float closestDistance = scene(currentPos);
        if (closestDistance < MIN_DISTANCE) {
          // Hit
          return rgb(99.0, 102.0, 241.0) * light(currentPos, calculateNormal(currentPos), vec3(3.0, 2.0, -3.0));
        }
        if (traveled > MAX_DISTANCE) break;
        traveled += closestDistance;
      }
      // Miss
      return vec3(0.0);
    }
    
    void main() {
      vec2 fragCoord = vUv * uResolution;
      vec2 uv = (2.0 * fragCoord - uResolution.xy) / uResolution.y * 0.3;
      vec3 ro = vec3(0.0, 0.0, -4.25); // Ray origin
      vec3 rd = vec3(uv, 0.5); // Ray direction
      vec3 color = rayMarch(ro, rd);
      // Accentuer le blanc et les ombres douces
      float shadow = 1.0 - length(color);
      vec3 base = vec3(1.0, 1.0, 1.0); // blanc pur
      vec3 shadowColor = mix(base, vec3(0.85, 0.85, 0.9), shadow * 0.7);
      vec3 finalColor = mix(shadowColor, color, 0.18); // texture subtile
      gl_FragColor = vec4(finalColor, 1.0);
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
    const depthScale = 4.5 / 3.5;
    targetPos.current.set(
      pointer.x * (width / 2) * depthScale,
      pointer.y * (height / 2) * depthScale,
      -1
    );
    ref.current.position.lerp(targetPos.current, 0.15);
  });

  return (
    <mesh ref={ref}>
      <MarchingCube
        strength={0.45} // valeur augmentée (ex: 0.7 ou plus)
        subtract={0.5}
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
          resolution={70}
          maxPolyCount={30000}
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
