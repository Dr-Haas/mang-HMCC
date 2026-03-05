"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const baseVert = `attribute vec3 position;
varying vec2 vTexCoord;

void main() {
    vTexCoord = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position, 1.0);
}`;

const outputFrag = `precision mediump float;

const int TRAIL_LENGTH = 1;
const int BIG_COUNT = 6;
const float EPS = 1e-4;
const int ITR = 16;
const float PI = acos(-1.0);

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointerTrail[TRAIL_LENGTH];
uniform vec3 uBigSpheres[BIG_COUNT];

varying vec2 vTexCoord;

float rnd3D(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453123);
}

float noise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);

    float a000 = rnd3D(i);
    float a100 = rnd3D(i + vec3(1.0, 0.0, 0.0));
    float a010 = rnd3D(i + vec3(0.0, 1.0, 0.0));
    float a110 = rnd3D(i + vec3(1.0, 1.0, 0.0));
    float a001 = rnd3D(i + vec3(0.0, 0.0, 1.0));
    float a101 = rnd3D(i + vec3(1.0, 0.0, 1.0));
    float a011 = rnd3D(i + vec3(0.0, 1.0, 1.0));
    float a111 = rnd3D(i + vec3(1.0, 1.0, 1.0));

    vec3 u = f * f * (3.0 - 2.0 * f);

    float k0 = a000;
    float k1 = a100 - a000;
    float k2 = a010 - a000;
    float k3 = a001 - a000;
    float k4 = a000 - a100 - a010 + a110;
    float k5 = a000 - a010 - a001 + a011;
    float k6 = a000 - a100 - a001 + a101;
    float k7 = -a000 + a100 + a010 - a110 + a001 - a101 - a011 + a111;

    return k0 + k1 * u.x + k2 * u.y + k3 *u.z + k4 * u.x * u.y + k5 * u.y * u.z + k6 * u.z * u.x + k7 * u.x * u.y * u.z;
}

// Camera
vec3 origin = vec3(0.0, 0.0, 1.0);
vec3 lookAt = vec3(0.0, 0.0, 0.0);
vec3 cDir = normalize(lookAt - origin);
vec3 cUp = vec3(0.0, 1.0, 0.0);
vec3 cSide = cross(cDir, cUp);

float smoothMin(float d1, float d2, float k) {
    float h = exp(-k * d1) + exp(-k * d2);
    return -log(h) / k;
}

vec3 translate(vec3 p, vec3 t) {
    return p - t;
}

float sdSphere(vec3 p, float s)
{
    return length(p) - s;
}

float map(vec3 p) {
    // base radius for trail droplets (reduce this to make trail smaller)
    float baseRadius = 1.2e-3;
    float radius = baseRadius * float(TRAIL_LENGTH);
    float k = 7.;
    float d = 1e5;

    for (int i = 0; i < TRAIL_LENGTH; i++) {
        float fi = float(i);
        vec2 pointerTrail = uPointerTrail[i] * uResolution / min(uResolution.x, uResolution.y);

        float sphere = sdSphere(
                translate(p, vec3(pointerTrail, .0)),
                radius - baseRadius * fi
            );

        d = smoothMin(d, sphere, k);
    }

    // big spheres to create irregular blobs
    for (int j = 0; j < BIG_COUNT; j++) {
      vec3 bs = uBigSpheres[j];
      vec2 bsPos = bs.xy * uResolution / min(uResolution.x, uResolution.y);
      float bsR = bs.z;
      float s = sdSphere(translate(p, vec3(bsPos, 0.0)), bsR);
      d = smoothMin(d, s, k);
    }

    return d;
}

vec3 generateNormal(vec3 p) {
    return normalize(vec3(
            map(p + vec3(EPS, 0.0, 0.0)) - map(p + vec3(-EPS, 0.0, 0.0)),
            map(p + vec3(0.0, EPS, 0.0)) - map(p + vec3(0.0, -EPS, 0.0)),
            map(p + vec3(0.0, 0.0, EPS)) - map(p + vec3(0.0, 0.0, -EPS))
        ));
}

// Shader crème : couleur non uniforme, ombre douce et zones claires
vec3 dropletColor(vec3 normal, vec3 rayDir, float dist, float hit, vec3 p) {
  // Couleur crème/rouge
  vec3 rouge = vec3(0.85, 0.11, 0.18);
  // Texture bruitée pour effet rouge
  float noise = noise3D(p * 3.0 + uTime * 0.2);
  float texture = smoothstep(0.0, 0.12, dist) * noise * 0.5;
  vec3 n = generateNormal(p);
  float light = dot(n, normalize(vec3(0.3, 0.7, 0.5))) * 0.5 + 0.5;
  float shadow = pow(1.0 - light, 2.5) * 1.2;
  vec3 shadowColor = vec3(0.35, 0.05, 0.09); // rouge foncé
  vec3 color = rouge;
  color = mix(color, shadowColor, shadow);
  color += texture * 0.08;
  return color;
}

void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);

    // Orthographic Camera
    vec3 ray = origin + cSide * p.x + cUp * p.y;
    vec3 rayDirection = cDir;

    float dist = 0.0;

    for (int i = 0; i < ITR; ++i) {
        dist = map(ray);
        ray += rayDirection * dist;
        if (dist < EPS) break;
    }

    float hit = dist < EPS ? 1.0 : 0.0;
    vec3 color = vec3(1.0);
    if (hit > 0.5) {
      color = dropletColor(vec3(0.0), vec3(0.0), dist, hit, ray);
      float alpha = 0.94; // very slight transparency
      gl_FragColor = vec4(color, alpha);
    } else {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); // fond transparent
    }
}`;

export default function InteractiveDroplets() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    // ensure transparent background and canvas fills parent container
    renderer.setClearColor(0x000000, 0);
    const w = (mount!.clientWidth || window.innerWidth);
    const h = (mount!.clientHeight || window.innerHeight);
    renderer.setSize(w, h);
    const canvas = renderer.domElement;
    canvas.style.background = "transparent";
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    mount.appendChild(canvas);

    const scene = new THREE.Scene();

    // placeholder for any GSAP tweens created elsewhere; ensure defined for cleanup
    const tweens: any[] = [];

    const camera = new THREE.PerspectiveCamera(
      60,
      (mount.clientWidth || window.innerWidth) /
        (mount.clientHeight || window.innerHeight),
      0.1,
      50
    );
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    const trailLength = 8;
    const pointerTrail = Array.from(
      { length: trailLength },
      () => new THREE.Vector2(0, 0)
    );

    const BIG_COUNT = 6;
    // create data objects for organic per-frame motion
    // We'll create two clusters: first cluster forms an 'L' in the top-left,
    // second cluster sits around the middle-right. Spheres are larger and closer.
    const bigSpheresData: Array<{
      base: THREE.Vector2;
      baseR: number;
      angle: number;
      speed: number;
      ampX: number;
      ampY: number;
      phase: number;
      radiusOffset: number;
    }> = [];

    // First cluster: L-shape top-left (use 3 big spheres)
    const cluster1Count = 3;
    // vertical arm (6 spheres)
    // First cluster: exactly three big spheres in an L at top-left
    // Positions chosen to tightly occupy the top-left corner
    bigSpheresData.push({
      base: new THREE.Vector2(-0.94, 0.88),
      baseR: 0.55,
      angle: 0.0,
      speed: 0.45,
      ampX: 0.04,
      ampY: 0.3,
      phase: 0.0,
      radiusOffset: 0.05,
    });
    bigSpheresData.push({
      base: new THREE.Vector2(-0.94, 0.58),
      baseR: 0.5,
      angle: 1.2,
      speed: 0.5,
      ampX: 0.035,
      ampY: 0.3,
      phase: 1.0,
      radiusOffset: 0.04,
    });
    bigSpheresData.push({
      base: new THREE.Vector2(-0.7, 0.88),
      baseR: 0.45,
      angle: 2.0,
      speed: 0.5,
      ampX: 0.1,
      ampY: 0.25,
      phase: 2.0,
      radiusOffset: 0.04,
    });

    // Second cluster: right-side aggregate of up to 3 spheres with varied sizes
    // Right cluster: keep as smaller, slightly lowered blobs (3 spheres)
    bigSpheresData.push({
      base: new THREE.Vector2(0.92, -0.12),
      baseR: 0.46,
      angle: Math.random() * Math.PI * 2,
      speed: 0.35,
      ampX: 0.04,
      ampY: 0.05,
      phase: Math.random() * Math.PI * 2,
      radiusOffset: 0.04,
    });

    bigSpheresData.push({
      base: new THREE.Vector2(0.84, -0.48),
      baseR: 0.2,
      angle: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.4,
      ampX: 0.03 + Math.random() * 0.02,
      ampY: 0.03 + Math.random() * 0.02,
      phase: Math.random() * Math.PI * 2,
      radiusOffset: 0.02,
    });

    bigSpheresData.push({
      base: new THREE.Vector2(0.96, -0.66),
      baseR: 0.28,
      angle: Math.random() * Math.PI * 2,
      speed: 0.25,
      ampX: 0.02,
      ampY: 0.02,
      phase: Math.random() * Math.PI * 2,
      radiusOffset: 0.02,
    });

    // placeholder array for shader uniforms (will be filled each frame)
    const bigSpheres: THREE.Vector3[] = Array.from(
      { length: BIG_COUNT },
      () => new THREE.Vector3(0, 0, 0)
    );

    const uniforms: any = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(
          (mount!.clientWidth || window.innerWidth),
          (mount!.clientHeight || window.innerHeight)
        ),
      },
      uPointerTrail: { value: pointerTrail },
      uBigSpheres: { value: bigSpheres },
    };

    const material = new THREE.RawShaderMaterial({
      vertexShader: baseVert,
      fragmentShader: outputFrag,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      glslVersion: THREE.GLSL1,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // no GSAP tweens for per-frame organic motion; compute positions in animate()

    let rafId = 0;
    const start = performance.now();

    // keep last client coords so we can recompute during scroll
    let lastClient: { x: number; y: number; has: boolean } = {
      x: 0,
      y: 0,
      has: false,
    };

    function computeNormalizedFromClient(cx: number, cy: number) {
      const rect = mount!.getBoundingClientRect();
      const x = cx - rect.left;
      const y = cy - rect.top;
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;
      const nx = (x / w) * 2 - 1;
      const ny = -(y / h) * 2 + 1;
      return { nx, ny };
    }

    function pushPointer(nx: number, ny: number) {
      for (let i = trailLength - 1; i > 0; i--) {
        pointerTrail[i].copy(pointerTrail[i - 1]);
      }
      pointerTrail[0].set(nx, ny);
    }

    function onPointerMove(e: PointerEvent) {
      const cx = e.clientX || (e as any).pageX || 0;
      const cy = e.clientY || (e as any).pageY || 0;
      lastClient.x = cx;
      lastClient.y = cy;
      lastClient.has = true;
      const { nx, ny } = computeNormalizedFromClient(cx, cy);
      pushPointer(nx, ny);
    }

    // attach pointermove to the mount so coordinates are relative to the container
    mount.addEventListener("pointermove", onPointerMove, { passive: true });

    // when scrolling, pointer events may not fire; recompute from last known client pos
    function onScroll() {
      if (!lastClient.has) return;
      const { nx, ny } = computeNormalizedFromClient(
        lastClient.x,
        lastClient.y
      );
      pushPointer(nx, ny);
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    function onResize() {
      const w = (mount!.clientWidth || window.innerWidth);
      const h = (mount!.clientHeight || window.innerHeight);
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", onResize, { passive: true });

    function animate() {
      uniforms.uTime.value = (performance.now() - start) / 1000;
      // update uniform pointer array (three uses Vector2 instances)
      uniforms.uPointerTrail.value = pointerTrail;
      // update big spheres uniform so shader receives animated positions
      const t = uniforms.uTime.value;
      for (let j = 0; j < bigSpheresData.length; j++) {
        const d = bigSpheresData[j];
        const otx = Math.cos(d.angle + t * d.speed * 1.0) * d.ampX;
        const oty =
          Math.sin(d.angle * 1.3 + t * d.speed * 0.9 + d.phase) * d.ampY;
        // compute oscillating radius but prevent excessive shrink when the cursor moves away
        const rawR = d.baseR + Math.sin(t * d.speed + d.phase) * d.radiusOffset;
        const minScale = 0.85; // keep radius at least 85% of baseR
        const clampedR = Math.max(d.baseR * minScale, rawR);
        bigSpheres[j].set(d.base.x + otx, d.base.y + oty, clampedR);
      }
      uniforms.uBigSpheres.value = bigSpheres;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      // remove event listener from mount
      mount.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      // kill GSAP tweens (guarded)
      try {
        if (typeof tweens !== "undefined" && tweens && tweens.length) {
          for (const t of tweens) t.kill();
        }
      } catch (err) {
        // ignore
      }
      // remove scroll listener
      window.removeEventListener("scroll", onScroll);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        position: "absolute",
        inset: 0,
        pointerEvents: "auto",
      }}
    />
  );
}
