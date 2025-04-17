'use client'

import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { usePathname } from 'next/navigation';

export const VisualizationSphere = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereRef = useRef<THREE.Points | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const initScene = () => {
      if (!containerRef.current) return;

      // Cleanup existing scene if any
      if (rendererRef.current || sceneRef.current) {
        cleanup();
      }

      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.z = 2;
      cameraRef.current = camera;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      const width = containerRef.current.clientWidth || 470;
      const height = containerRef.current.clientHeight || 470;
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Create sphere particles
      const geometry = new THREE.SphereGeometry(1, 64, 64);
      const positions = [];

      // Cores premium para a esfera - estilo Apple com gradiente sutil
      const createGradientColors = (numPoints: number) => {
        const colorArray = [];
        const primaryColor = new THREE.Color('#BF5AF2'); // Roxo Apple
        const secondaryColor = new THREE.Color('#0A84FF'); // Azul Apple

        // Cria um gradiente de cores para os pontos
        for (let i = 0; i < numPoints; i++) {
          // Cria uma mistura entre as duas cores baseada na posição
          // Favorece a cor roxa (80% roxo, 20% azul em média)
          const mixFactor = Math.random() * 0.4; // Limita a mistura para manter predominância do roxo
          const color = new THREE.Color().lerpColors(primaryColor, secondaryColor, mixFactor);

          // Adiciona uma pequena variação de brilho para alguns pontos
          const brightness = 0.9 + Math.random() * 0.2;
          color.multiplyScalar(brightness);

          colorArray.push(color.r, color.g, color.b);
        }

        return colorArray;
      };

      const colors = createGradientColors(3000);

      // Convert sphere geometry to points
      for (let i = 0; i < 3000; i++) {
        const vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.normalize();
        vertex.multiplyScalar(1);
        positions.push(vertex.x, vertex.y, vertex.z);
        // Cores já definidas pelo gradiente
      }

      const pointGeometry = new THREE.BufferGeometry();
      pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      pointGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const pointsMaterial = new THREE.PointsMaterial({
        size: 0.01, // Pontos menores para um visual mais premium
        vertexColors: true,
        transparent: true,
        opacity: 0.8, // Mais transparente
        sizeAttenuation: true,
      });

      const sphere = new THREE.Points(pointGeometry, pointsMaterial);
      scene.add(sphere);
      sphereRef.current = sphere;

      // Variáveis para animação suave estilo Apple
      let time = 0;
      let rotationSpeed = 0.0003; // Rotação mais lenta e elegante

      // Animation loop
      const animate = () => {
        time += 0.005; // Movimento mais lento
        animationFrameRef.current = requestAnimationFrame(animate);

        if (sphereRef.current) {
          // Rotação suave
          sphereRef.current.rotation.x += rotationSpeed;
          sphereRef.current.rotation.y += rotationSpeed * 1.2;

          // Efeito de respiração muito sutil - estilo Apple
          const breatheFactor = 1 + Math.sin(time * 0.3) * 0.005;
          sphereRef.current.scale.set(breatheFactor, breatheFactor, breatheFactor);
        }
        renderer.render(scene, camera);
      };
      animate();
    };

    const cleanup = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (containerRef.current) {
        const canvas = containerRef.current.querySelector('canvas');
        if (canvas) {
          containerRef.current.removeChild(canvas);
        }
      }
      if (sphereRef.current) {
        sphereRef.current.geometry.dispose();
        if (sphereRef.current.material instanceof THREE.Material) {
          sphereRef.current.material.dispose();
        }
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };

    initScene();
    return cleanup;
  }, [pathname]); // Adiciona pathname como dependência

  return <div ref={containerRef} className="w-[450px] h-[450px] mb-2 md:w-[450px] md:h-[450px] sm:w-[400px] sm:h-[400px]" key={pathname} />;
};
