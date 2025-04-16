'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Componente para o caminho temporal
const TimePath = () => {
  const pathRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (pathRef.current) {
      // Efeito de ondulação no caminho
      const elapsedTime = clock.getElapsedTime();
      const vertices = pathRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const wave = Math.sin(x * 0.2 + elapsedTime) * 0.1;
        vertices[i + 1] = wave;
      }
      
      pathRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <group>
      {/* Caminho principal */}
      <mesh 
        ref={pathRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.1, 0]}
      >
        <planeGeometry args={[40, 4, 40, 1]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.8}
        />
      </mesh>
      
      {/* Linha central brilhante */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.09, 0]}
      >
        <planeGeometry args={[40, 0.1, 1, 1]} />
        <meshBasicMaterial color="#007AFF" transparent opacity={0.8} />
      </mesh>
      
      {/* Linhas de tempo */}
      {[...Array(10)].map((_, i) => (
        <mesh 
          key={`timeline-${i}`} 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[i * 4 - 18, -0.08, 0]}
        >
          <planeGeometry args={[0.05, 4, 1, 1]} />
          <meshBasicMaterial color="#333333" transparent opacity={0.5} />
        </mesh>
      ))}
      
      {/* Partículas no caminho */}
      <Sparkles 
        count={100}
        scale={[40, 0.5, 4]}
        position={[0, 0.1, 0]}
        size={0.6}
        speed={0.3}
        color="#007AFF"
        opacity={0.5}
      />
    </group>
  );
};

export default TimePath;
