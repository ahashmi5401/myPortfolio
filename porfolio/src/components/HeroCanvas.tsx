import React, { useEffect, useRef } from 'react';
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
} from 'three';

interface HeroCanvasProps {
  theme: 'dark' | 'light';
}

const PARTICLE_COUNT = 800;
const MAX_FRAME_DELTA = 50; // ms — skip frame if tab was backgrounded

const HeroCanvas: React.FC<HeroCanvasProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- Renderer ---
    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setClearColor(0x000000, 0);

    // --- Scene & Camera ---
    const scene = new Scene();
    const camera = new PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 500);
    camera.position.z = 120;

    // --- Particle Geometry ---
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT);     // unique sine phase per particle
    const driftSpeed = new Float32Array(PARTICLE_COUNT);  // unique drift speed per particle

    const goldColor = new Color(0xc9a84c);
    const whiteColor = new Color(0xffffff);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Spread particles in a wide, shallow field
      positions[i3]     = (Math.random() - 0.5) * 280;
      positions[i3 + 1] = (Math.random() - 0.5) * 160;
      positions[i3 + 2] = (Math.random() - 0.5) * 80;

      // 70% gold, 30% white — both dim
      const isGold = Math.random() > 0.3;
      const c = isGold ? goldColor : whiteColor;
      colors[i3]     = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      phases[i] = Math.random() * Math.PI * 2;
      driftSpeed[i] = 0.00008 + Math.random() * 0.00022; // extremely slow: max ~0.0003
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));

    const material = new PointsMaterial({
      size: theme === 'dark' ? 1.0 : 0.9,
      sizeAttenuation: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.4 : 0.55,
      vertexColors: true,
      depthWrite: false,
    });

    const points = new Points(geometry, material);
    scene.add(points);

    // --- Mouse tracking ---
    const mouse = { x: 0, y: 0 };
    const cameraTarget = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1]
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // --- Resize ---
    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // --- Animation loop ---
    let frameId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      frameId = requestAnimationFrame(animate);

      // Frame delta guard — skip jank frames after tab switch
      const delta = now - lastTime;
      lastTime = now;
      if (delta > MAX_FRAME_DELTA) return;

      const pos = geometry.attributes.position as BufferAttribute;
      const arr = pos.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const speed = driftSpeed[i];
        const phase = phases[i];

        // Pure sine-wave drift — calm breathing motion
        arr[i3]     += Math.sin(now * 0.0004 + phase) * speed;
        arr[i3 + 1] += Math.cos(now * 0.0003 + phase * 1.3) * speed;
        arr[i3 + 2] += Math.sin(now * 0.00025 + phase * 0.7) * speed * 0.5;

        // Soft edge wrapping
        if (arr[i3]     > 140) arr[i3]     = -140;
        if (arr[i3]     < -140) arr[i3]     = 140;
        if (arr[i3 + 1] > 80) arr[i3 + 1] = -80;
        if (arr[i3 + 1] < -80) arr[i3 + 1] = 80;
      }
      pos.needsUpdate = true;

      // Ultra-lazy camera follow — barely noticeable, silky smooth
      cameraTarget.x = mouse.x * 0.5;
      cameraTarget.y = mouse.y * 0.3;
      camera.position.x += (cameraTarget.x - camera.position.x) * 0.02;
      camera.position.y += (cameraTarget.y - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default HeroCanvas;
