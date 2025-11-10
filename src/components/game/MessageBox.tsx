import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MessageBoxProps {
  position: THREE.Vector3;
  hit: boolean;
}

export default function MessageBox({ position, hit }: MessageBoxProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && !hit) {
      // Floating animation
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh 
      ref={meshRef}
      position={position}
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial 
        color={hit ? "#666666" : "#00ff44"} 
        emissive={hit ? "#000000" : "#002200"}
        transparent
        opacity={hit ? 0.5 : 1}
      />
      
      {/* Glowing outline effect for unread messages */}
      {!hit && (
        <mesh scale={[1.1, 1.1, 1.1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial 
            color="#44ff44" 
            transparent 
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </mesh>
  );
}
