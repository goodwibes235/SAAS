"use client";

import { useEffect, useRef } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as THREE from "three";

interface IntelligenceCoreProps {
  className?: string;
}

/**
 * IntelligenceCore
 *
 * A Three.js WebGL scene rendered into a canvas.
 * Scene composition:
 *   - Central icosahedral core (wireframe over solid)
 *   - Three fine orbital rings at different inclinations
 *   - Six workflow nodes distributed on the rings
 *   - Luminous connector lines between nodes and core
 *   - Point light + ambient lighting for depth
 *   - Subtle idle animation and continuous orbital drift
 *
 * Falls back to a CSS-composed static SVG if WebGL is unavailable.
 */
export default function IntelligenceCore({ className }: IntelligenceCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const sceneRef = useRef<{
    renderer: import("three").WebGLRenderer;
    scene: import("three").Scene;
    camera: import("three").PerspectiveCamera;
    cleanup: () => void;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const canvas = canvasRef.current;
      const wrapper = wrapperRef.current;
      if (!canvas || !wrapper) return;

      // Test WebGL availability
      const testCtx = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!testCtx) {
        // Fallback handled via CSS class toggled below
        canvas.style.display = "none";
        const fb = wrapper.querySelector(".core-fallback");
        if (fb) (fb as HTMLElement).style.display = "flex";
        return;
      }

      const THREE = await import("three");
      if (cancelled) return;

      // --- Renderer ---
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = false;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      const scene = new THREE.Scene();

      // --- Camera ---
      const camera = new THREE.PerspectiveCamera(
        45,
        wrapper.clientWidth / wrapper.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0.5, 7);
      camera.lookAt(0, 0, 0);

      // --- Colors ---
      const CYAN = new THREE.Color(0x54d9ff);
      const VIOLET = new THREE.Color(0x9a83ff);
      const WHITE = new THREE.Color(0xf0f4ff);
      const DIM_CYAN = new THREE.Color(0x1a4a5a);

      // --- Lights ---
      const ambientLight = new THREE.AmbientLight(0x0d1a2a, 3);
      scene.add(ambientLight);

      const cyanLight = new THREE.PointLight(CYAN, 8, 12);
      cyanLight.position.set(2, 2, 3);
      scene.add(cyanLight);

      const violetLight = new THREE.PointLight(VIOLET, 5, 10);
      violetLight.position.set(-3, -1, 2);
      scene.add(violetLight);

      const rimLight = new THREE.PointLight(WHITE, 2, 8);
      rimLight.position.set(0, 4, -2);
      scene.add(rimLight);

      // --- Core Geometry ---
      // Solid inner core
      const coreGeo = new THREE.IcosahedronGeometry(1.0, 1);
      const coreMat = new THREE.MeshPhongMaterial({
        color: 0x0d1e2e,
        emissive: new THREE.Color(0x0a2535),
        emissiveIntensity: 1,
        shininess: 120,
        transparent: true,
        opacity: 0.92,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      scene.add(coreMesh);

      // Wireframe overlay
      const wireGeo = new THREE.IcosahedronGeometry(1.02, 1);
      const wireMat = new THREE.MeshBasicMaterial({
        color: CYAN,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      scene.add(wireMesh);

      // Outer glow shell
      const glowGeo = new THREE.IcosahedronGeometry(1.18, 2);
      const glowMat = new THREE.MeshBasicMaterial({
        color: CYAN,
        transparent: true,
        opacity: 0.04,
        side: THREE.BackSide,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      scene.add(glowMesh);

      // --- Orbital Rings ---
      function makeRing(
        radius: number,
        tubeRadius: number,
        rotX: number,
        rotY: number,
        color: InstanceType<typeof THREE.Color>,
        opacity: number
      ) {
        const geo = new THREE.TorusGeometry(radius, tubeRadius, 4, 96);
        const mat = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = rotX;
        mesh.rotation.y = rotY;
        scene.add(mesh);
        return mesh;
      }

      const ring1 = makeRing(
        2.1, 0.006, Math.PI / 2, 0, CYAN, 0.35
      );
      const ring2 = makeRing(
        2.5, 0.005, Math.PI / 3, Math.PI / 5, VIOLET, 0.25
      );
      const ring3 = makeRing(
        1.75, 0.004, Math.PI / 6, Math.PI / 3, CYAN, 0.18
      );

      // --- Workflow Nodes ---
      const nodePositions: InstanceType<typeof THREE.Vector3>[] = [
        new THREE.Vector3(2.1, 0, 0),
        new THREE.Vector3(-2.1, 0, 0),
        new THREE.Vector3(0, 2.1, 0),
        new THREE.Vector3(1.48, -1.48, 0),
        new THREE.Vector3(-1.48, 1.48, 0),
        new THREE.Vector3(0, -2.1, 0),
      ];

      const nodeColors = [CYAN, VIOLET, CYAN, VIOLET, CYAN, VIOLET];

      const nodes: InstanceType<typeof THREE.Mesh>[] = [];
      nodePositions.forEach((pos, i) => {
        const geo = new THREE.OctahedronGeometry(0.12, 0);
        const mat = new THREE.MeshPhongMaterial({
          color: nodeColors[i],
          emissive: nodeColors[i],
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0.9,
          shininess: 200,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        scene.add(mesh);
        nodes.push(mesh);

        // Node halo
        const haloGeo = new THREE.SphereGeometry(0.22, 12, 12);
        const haloMat = new THREE.MeshBasicMaterial({
          color: nodeColors[i],
          transparent: true,
          opacity: 0.06,
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.copy(pos);
        scene.add(halo);
      });

      // --- Connector Lines ---
      const connectorGroup = new THREE.Group();
      scene.add(connectorGroup);

      function makeConnector(from: InstanceType<typeof THREE.Vector3>, to: InstanceType<typeof THREE.Vector3>, color: InstanceType<typeof THREE.Color>, opacity: number) {
        const points = [from.clone(), to.clone()];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity,
        });
        return new THREE.Line(geo, mat);
      }

      const origin = new THREE.Vector3(0, 0, 0);
      nodePositions.forEach((pos, i) => {
        const line = makeConnector(origin, pos, nodeColors[i], 0.22);
        connectorGroup.add(line);
      });

      // Cross-connectors between alternating nodes
      for (let i = 0; i < nodePositions.length - 1; i += 2) {
        const line = makeConnector(
          nodePositions[i],
          nodePositions[(i + 2) % nodePositions.length],
          DIM_CYAN,
          0.1
        );
        connectorGroup.add(line);
      }

      // --- Data Particle Field ---
      const particleCount = 160;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 2.8 + Math.random() * 2.2;
        particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = r * Math.cos(phi);
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(particlePositions, 3)
      );
      const particleMat = new THREE.PointsMaterial({
        color: CYAN,
        size: 0.025,
        transparent: true,
        opacity: 0.4,
        sizeAttenuation: true,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // --- Resize handling ---
      function onResize() {
        if (!wrapper) return;
        const w = wrapper.clientWidth;
        const h = wrapper.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
      window.addEventListener("resize", onResize);
      onResize();

      // --- Reduced motion check ---
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // --- Scroll responsiveness ---
      let scrollY = 0;
      const handleScroll = () => {
        scrollY = window.scrollY;
      };
      window.addEventListener("scroll", handleScroll, { passive: true });

      // --- Animate ---
      let t = 0;
      function animate() {
        if (cancelled) return;
        animFrameRef.current = requestAnimationFrame(animate);

        if (!reducedMotion) {
          t += 0.008;
          const scrollRotation = scrollY * 0.0012;

          // Core rotation with scroll-linked reactivity
          coreMesh.rotation.y = t * 0.18 + scrollRotation;
          coreMesh.rotation.x = Math.sin(t * 0.12) * 0.06;
          wireMesh.rotation.y = t * 0.22 + scrollRotation * 1.25;
          wireMesh.rotation.x = Math.sin(t * 0.12) * 0.06;
          glowMesh.rotation.y = t * 0.15 + scrollRotation * 0.8;

          // Rings independent drift
          ring1.rotation.z = t * 0.12;
          ring2.rotation.z = -t * 0.09;
          ring3.rotation.z = t * 0.16;
          ring2.rotation.x = Math.PI / 3 + Math.sin(t * 0.07) * 0.06;

          // Nodes orbit the rings
          nodePositions.forEach((basePos, i) => {
            const angle = t * (0.08 + i * 0.012);
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            nodes[i].position.x = basePos.x * cos - basePos.y * sin;
            nodes[i].position.y = basePos.x * sin + basePos.y * cos;
            nodes[i].position.z = basePos.z + Math.sin(t * 0.3 + i) * 0.08;
            // Pulse scale
            const pulse = 1 + Math.sin(t * 2.5 + i * 1.2) * 0.12;
            nodes[i].scale.setScalar(pulse);
          });

          // Particle slow drift
          particles.rotation.y = t * 0.025;
          particles.rotation.x = Math.sin(t * 0.015) * 0.05;

          // Connector lines update to match moving nodes
          connectorGroup.children.forEach((child, i) => {
            if (i < nodes.length && child instanceof THREE.Line) {
              const pos = child.geometry.attributes.position;
              pos.setXYZ(1, nodes[i].position.x, nodes[i].position.y, nodes[i].position.z);
              pos.needsUpdate = true;
            }
          });

          // Lights subtle movement
          cyanLight.position.x = 2 + Math.sin(t * 0.4) * 0.8;
          cyanLight.position.y = 2 + Math.cos(t * 0.3) * 0.6;
          violetLight.position.x = -3 + Math.cos(t * 0.35) * 0.6;
        }

        renderer.render(scene, camera);
      }
      animate();

      // Store for cleanup
      sceneRef.current = {
        renderer,
        scene,
        camera,
        cleanup: () => {
          window.removeEventListener("resize", onResize);
          window.removeEventListener("scroll", handleScroll);
          if (animFrameRef.current !== null) {
            cancelAnimationFrame(animFrameRef.current);
          }
          renderer.dispose();
          [
            coreGeo, wireGeo, glowGeo,
            particleGeo,
          ].forEach((g) => g.dispose());
          [coreMat, wireMat, glowMat, particleMat].forEach((m) => m.dispose());
        },
      };
    }

    init().catch(console.error);

    return () => {
      cancelled = true;
      sceneRef.current?.cleanup();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`relative w-full h-full ${className ?? ""}`}>
      {/* WebGL canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="NEXORA Intelligence Core — interactive 3D visualization of connected AI workflow nodes"
        role="img"
      />

      {/* Static CSS fallback — shown when WebGL is unavailable */}
      <div
        className="core-fallback"
        style={{
          display: "none",
          position: "absolute",
          inset: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-sm max-h-sm opacity-70"
        >
          {/* Outer rings */}
          <circle cx="200" cy="200" r="165" stroke="#54D9FF" strokeWidth="0.8" strokeOpacity="0.3" />
          <circle cx="200" cy="200" r="120" stroke="#9A83FF" strokeWidth="0.6" strokeOpacity="0.25" />
          <circle cx="200" cy="200" r="80" stroke="#54D9FF" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Center core */}
          <polygon
            points="200,152 240,188 224,236 176,236 160,188"
            stroke="#54D9FF"
            strokeWidth="1.2"
            fill="#0d1e2e"
            fillOpacity="0.9"
            strokeOpacity="0.7"
          />
          {/* Connector lines */}
          <line x1="200" y1="200" x2="365" y2="200" stroke="#54D9FF" strokeWidth="0.6" strokeOpacity="0.3" />
          <line x1="200" y1="200" x2="35" y2="200" stroke="#54D9FF" strokeWidth="0.6" strokeOpacity="0.3" />
          <line x1="200" y1="200" x2="200" y2="35" stroke="#9A83FF" strokeWidth="0.6" strokeOpacity="0.3" />
          <line x1="200" y1="200" x2="200" y2="365" stroke="#9A83FF" strokeWidth="0.6" strokeOpacity="0.3" />
          <line x1="200" y1="200" x2="316" y2="316" stroke="#54D9FF" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="200" y1="200" x2="84" y2="84" stroke="#9A83FF" strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Nodes */}
          <circle cx="365" cy="200" r="5" fill="#54D9FF" fillOpacity="0.8" />
          <circle cx="35" cy="200" r="5" fill="#9A83FF" fillOpacity="0.8" />
          <circle cx="200" cy="35" r="5" fill="#54D9FF" fillOpacity="0.8" />
          <circle cx="200" cy="365" r="4" fill="#9A83FF" fillOpacity="0.7" />
          <circle cx="316" cy="316" r="4" fill="#54D9FF" fillOpacity="0.7" />
          <circle cx="84" cy="84" r="4" fill="#9A83FF" fillOpacity="0.7" />
        </svg>
      </div>
    </div>
  );
}
