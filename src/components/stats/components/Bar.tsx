'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Componente para uma barra 3D individual
const Bar = ({ position, height, color, mealType, calories, index, gradients }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Inicializar a altura da barra
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.y = 0.1;
      meshRef.current.position.y = 0.05;
    }
  }, []);

  // Efeito de animação para entrada das barras
  useFrame((state) => {
    if (meshRef.current) {
      // Animação de entrada sem setState para evitar loop
      if (meshRef.current.scale.y < height) {
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, height, 0.05);
        meshRef.current.position.y = meshRef.current.scale.y / 2;
      }

      // Efeito de hover
      if (hovered) {
        meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
          meshRef.current.material.emissiveIntensity,
          0.5,
          0.1
        );
      } else {
        meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
          meshRef.current.material.emissiveIntensity,
          0.2,
          0.1
        );
      }

      // Efeito de rotação sutil
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3 + index) * 0.03;
    }
  });

  return (
    <group position={position}>
      {/* Barra principal */}
      <mesh
        ref={meshRef}
        position={[0, 0.05, 0]}
        scale={[1, 0.1, 1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <boxGeometry args={[1.5, 1, 1.5]} />
        <meshPhysicalMaterial
          color={gradients && mealType && gradients[mealType] ? gradients[mealType].bottom : color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.85}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Texto do tipo de refeição em cima da barra */}
      <Text
        position={[0, height + 0.5, 0]}
        fontSize={0.35}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {mealType.split(' ')[0]}
      </Text>

      {/* Texto de calorias abaixo da barra */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {`${calories} cal`}
      </Text>

      {/* Reflexo no chão */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshPhysicalMaterial
          color={color}
          metalness={1}
          roughness={0.3}
          transparent
          opacity={0.15}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
};

export default Bar;
