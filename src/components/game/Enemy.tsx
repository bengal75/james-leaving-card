import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface EnemyProps {
  position: THREE.Vector3;
  health: number;
  maxHealth: number;
}

export default function Enemy({ position, health, maxHealth }: EnemyProps) {
  const groupRef = useRef<THREE.Group>(null);
  const healthBarRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Slight floating animation
      groupRef.current.position.copy(position);
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 3) * 0.1;
      
      // Face towards center (player area)
      groupRef.current.lookAt(0, groupRef.current.position.y, 0);
    }
    
    // Update health bar
    if (healthBarRef.current) {
      const healthPercent = health / maxHealth;
      healthBarRef.current.scale.x = healthPercent;
      
      // Change color based on health
      const material = healthBarRef.current.material as THREE.MeshBasicMaterial;
      if (healthPercent > 0.6) {
        material.color.setHex(0x00ff00);
      } else if (healthPercent > 0.3) {
        material.color.setHex(0xffff00);
      } else {
        material.color.setHex(0xff0000);
      }
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {/* Main enemy body - demonic red creature */}
      <mesh castShadow>
        <boxGeometry args={[1, 2, 1]} />
        <meshLambertMaterial color="#aa0000" emissive="#330000" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.2, 0.3, 0.5]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      <mesh position={[0.2, 0.3, 0.5]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      
      {/* Horns */}
      <mesh position={[-0.3, 0.8, 0.2]} rotation={[0, 0, -0.5]}>
        <coneGeometry args={[0.05, 0.3, 6]} />
        <meshLambertMaterial color="#444444" />
      </mesh>
      <mesh position={[0.3, 0.8, 0.2]} rotation={[0, 0, 0.5]}>
        <coneGeometry args={[0.05, 0.3, 6]} />
        <meshLambertMaterial color="#444444" />
      </mesh>
      
      {/* Health bar background */}
      <mesh position={[0, 1.5, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.2, 0.1]} />
        <meshBasicMaterial color="#333333" />
      </mesh>
      
      {/* Health bar */}
      <mesh 
        ref={healthBarRef}
        position={[-0.6, 1.5, 0.01]} 
        rotation={[0, 0, 0]}
      >
        <planeGeometry args={[1.2, 0.08]} />
        <meshBasicMaterial color="#00ff00" />
      </mesh>
    </group>
  );
}
