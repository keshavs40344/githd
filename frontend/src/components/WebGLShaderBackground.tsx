'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WebGLShaderBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: false,
      alpha: false,
      stencil: false,
      depth: false,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uSpeed;
      uniform float uIntensity;

      varying vec2 vUv;

      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );
      float fbm( vec2 p ) {
        float f = 0.0;
        f += 0.50000*snoise( p ); p = m*p*2.02;
        f += 0.25000*snoise( p ); p = m*p*2.03;
        f += 0.12500*snoise( p ); p = m*p*2.01;
        f += 0.06250*snoise( p ); p = m*p*2.04;
        f += 0.03125*snoise( p );
        return f/0.984375;
      }

      void main() {
        vec2 p = -1.0 + 2.0 * vUv;
        p.x *= uResolution.x / uResolution.y;

        float time = uTime * uSpeed;

        vec2 q = vec2(fbm(p + vec2(0.0, 0.0) + time), fbm(p + vec2(5.2, 1.3) + time));
        vec2 r = vec2(fbm(p + 3.0*q + vec2(1.7, 9.2) + uMouse + time), fbm(p + 3.0*q + vec2(8.3, 2.8) + uMouse + time));
        float f = fbm(p + 3.5*r);

        vec3 cObsidianDark = vec3(0.02, 0.02, 0.03);
        vec3 cObsidianSlate = vec3(0.08, 0.07, 0.11);
        vec3 cDeepAmber = vec3(0.35, 0.22, 0.06);
        vec3 cRichGold = vec3(0.88, 0.65, 0.20);
        vec3 cBrightGold = vec3(1.00, 0.92, 0.60);

        vec3 color = mix(cObsidianDark, cObsidianSlate, clamp(f*f*4.0, 0.0, 1.0));
        color = mix(color, cDeepAmber, clamp(length(q), 0.0, 1.0));
        color = mix(color, cRichGold, clamp(length(r.x), 0.0, 1.0));
        color = mix(color, cBrightGold, pow(clamp(f*1.5, 0.0, 1.0), 3.0) * uIntensity);

        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        uv *=  1.0 - uv.yx;
        float vig = uv.x*uv.y * 15.0;
        vig = pow(vig, 0.45);
        color *= vig;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uSpeed: { value: 0.2 },
        uIntensity: { value: 1.3 },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    const targetMouse = new THREE.Vector2(0, 0);
    const currentMouse = new THREE.Vector2(0, 0);
    
    const onMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', onMouseMove);

    const onWindowResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener('resize', onWindowResize);

    const clock = new THREE.Clock();
    let isVisible = true;

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      currentMouse.lerp(targetMouse, 0.05);
      material.uniforms.uMouse.value.copy(currentMouse);
      material.uniforms.uTime.value = clock.getElapsedTime();
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10 pointer-events-none bg-obsidian-950" 
    />
  );
}
