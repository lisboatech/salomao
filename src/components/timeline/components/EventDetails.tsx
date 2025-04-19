'use client';

import React from 'react';
import { Text, Float } from '@react-three/drei';

// Componente para exibir detalhes de um evento selecionado
const EventDetails = ({ meal, position = [0, 5, 0], color }: {
  meal: {
    type: string;
    calories: number;
    dateTime: string;
  };
  position?: [number, number, number];
  color: string;
}) => {
  return (
    <group position={position}>
      <Float
        speed={2}
        rotationIntensity={0.1}
        floatIntensity={0.2}
      >
        <mesh>
          <boxGeometry args={[6, 3, 0.1]} />
          <meshStandardMaterial
            color="#111111"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>

        <Text
          position={[0, 0.8, 0.1]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor={color}
        >
          {meal.type}
        </Text>

        <Text
          position={[0, 0.2, 0.1]}
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {`${meal.calories} calorias`}
        </Text>

        <Text
          position={[0, -0.4, 0.1]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {new Date(meal.dateTime).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </Float>
    </group>
  );
};

export default EventDetails;
