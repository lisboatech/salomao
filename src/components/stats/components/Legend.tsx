'use client';

import React from 'react';
import { Text } from '@react-three/drei';

// Componente para a legenda
const Legend = ({ colors }) => {
  return (
    <group position={[-6, 0, 0]}>
      {Object.entries(colors).map(([type, color], index) => (
        <group key={type} position={[0, -index * 0.8, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <Text position={[1, 0, 0]} fontSize={0.4} color="white" anchorX="left">
            {type}
          </Text>
        </group>
      ))}
    </group>
  );
};

export default Legend;
