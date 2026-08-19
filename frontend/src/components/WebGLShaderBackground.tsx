'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function WebGLShaderBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect mobile or low-power device
    const checkMobile = () => {
      const mobileQuery = window.matchMedia('(max-width: 768px)').matches;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      return mobileQuery || hasTouch;
    };

    const isMob = checkMobile();
    setIsMobile(isMob);

    // If mobile, do not initialize heavy Three.js context at all - use CSS GPU aura instead!
    if (isMob || !mountRef.current) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;
    let isVisible = true;

    try {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      renderer = new THREE.WebGLRenderer({
        powerPreference: 'low-power',
        antialias: false,
        alpha: false,
        stencil: false,
        depth: false,
      });

      renderer.setSize(width, height);
      renderer.setPixelRatio(1.0); // Keep pixel ratio 1.0 for high performance
      mountRef.current.appendChild(renderer.domElement);

      const geometry = new THREE.PlaneGeometry(2, 2);

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `;

      // Optimized lightweight 1-pass gradient shader (Zero lag!)
      const fragmentShader = `
        uniform float uTime;
        uniform vec2 uResolution;
        varying vec2 vUv;

        void main() {
          vec2 p = vUv - 0.5;
          p.x *= uResolution.x / uResolution.y;

          float d = length(p);
          float angle = atan(p.y, p.x);

          float wave = sin(d * 4.0 - uTime * 0.4 + angle * 2.0) * 0.5 + 0.5;
          
          vec3 darkObsidian = vec3(0.015, 0.015, 0.025);
          vec3 deepAmber = vec3(0.12, 0.07, 0.02);
          vec3 sacredGold = vec3(0.25, 0.16, 0.03);

          vec3 col = mix(darkObsidian, deepAmber, smoothstep(0.8, 0.1, d));
          col += sacredGold * wave * 0.15 * smoothstep(0.9, 0.2, d);

          gl_FragColor = vec4(col, 1.0);
        }
      `;

      const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        depthWrite: false,
        depthTest: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Visibility API: Pause rendering when tab is hidden to save 100% CPU/GPU
      const handleVisibilityChange = () => {
        isVisible = !document.hidden;
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      let lastTime = 0;
      const targetFPS = 30; // 30fps is ultra-smooth for background and saves massive CPU/GPU
      const interval = 1000 / targetFPS;

      const animate = (currentTime: number) => {
        animationFrameId = requestAnimationFrame(animate);

        if (!isVisible) return;

        const delta = currentTime - lastTime;
        if (delta > interval) {
          lastTime = currentTime - (delta % interval);
          uniforms.uTime.value += 0.02;
          if (renderer) renderer.render(scene, camera);
        }
      };

      animationFrameId = requestAnimationFrame(animate);

      const handleResize = () => {
        if (!renderer) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        uniforms.uResolution.value.set(w, h);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        if (renderer && renderer.domElement && mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
          renderer.dispose();
          geometry.dispose();
          material.dispose();
        }
      };
    } catch {
      setIsMobile(true);
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-obsidian-950">
      {/* Three.js Canvas Container (Desktop only) */}
      {!isMobile && <div ref={mountRef} className="absolute inset-0 opacity-80" />}

      {/* Lightweight Hardware-Accelerated CSS Ambient Glow Mesh (Universal for all devices, 0% CPU!) */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-br from-amber-500/10 via-gold-600/5 to-transparent blur-3xl opacity-70 animate-pulse pointer-events-none transform-gpu"
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tl from-gold-500/10 via-amber-700/5 to-transparent blur-3xl opacity-60 pointer-events-none transform-gpu"
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] rounded-full bg-radial from-amber-500/5 to-transparent blur-3xl pointer-events-none transform-gpu"
      />
    </div>
  );
}
