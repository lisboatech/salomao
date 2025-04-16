'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Trail, Float } from '@react-three/drei';
import * as THREE from 'three';

// Componente para uma esfera de evento na linha do tempo
const TimeEvent = ({ position, color, mealType, calories, date, index, onClick }: {
  position: [number, number, number];
  color: string;
  mealType: string;
  calories: number;
  date: string;
  index: number;
  onClick: () => void;
}) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Efeito de animação para entrada e hover
  useFrame((state) => {
    if (sphereRef.current) {
      // Efeito de pulsação
      const pulse = Math.sin(state.clock.getElapsedTime() * 2 + index) * 0.05 + 1;
      sphereRef.current.scale.set(pulse, pulse, pulse);
      
      // Efeito de hover
      if (hovered) {
        sphereRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
          sphereRef.current.material.emissiveIntensity,
          1.5,
          0.1
        );
      } else {
        sphereRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
          sphereRef.current.material.emissiveIntensity,
          0.8,
          0.1
        );
      }
    }
  });

  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short'
      });
    } catch (error) {
      return '';
    }
  };

  return (
    <group position={position}>
      {/* Esfera do evento */}
      <Trail
        width={1.5}
        length={4}
        color={color}
        attenuation={(t) => t * t}
      >
        <mesh
          ref={sphereRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Trail>

      {/* Texto do tipo de refeição */}
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.5}
        position={[0, 1.2, 0]}
      >
        <Text
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor={color}
        >
          {mealType.split(' ')[0]}
        </Text>
      </Float>

      {/* Texto de calorias */}
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {`${calories} cal`}
      </Text>

      {/* Data da refeição */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#111111"
      >
        {formatDate(date)}
      </Text>
    </group>
  );
};

export default TimeEvent;
