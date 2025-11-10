import { forwardRef } from "react";
import * as THREE from "three";

const Minigun = forwardRef<THREE.Group>((props, ref) => {
  return (
    <group 
      ref={ref}
      position={[0.5, -0.3, -0.8]} 
      rotation={[0, 0, 0]}
      scale={[0.6, 0.6, 0.6]}
    >
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.2, 1.2]} />
        <meshLambertMaterial color="#333333" />
      </mesh>
      
      {/* Barrels */}
      <group position={[0, 0, -0.5]}>
        {Array.from({ length: 6 }, (_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 0.15;
          return (
            <mesh 
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                0
              ]}
            >
              <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
              <meshLambertMaterial color="#444444" />
            </mesh>
          );
        })}
      </group>
      
      {/* Handle */}
      <mesh position={[-0.2, -0.15, 0.3]}>
        <boxGeometry args={[0.05, 0.3, 0.1]} />
        <meshLambertMaterial color="#222222" />
      </mesh>
      
      {/* Trigger guard */}
      <mesh position={[-0.1, -0.2, 0.2]}>
        <boxGeometry args={[0.1, 0.05, 0.2]} />
        <meshLambertMaterial color="#222222" />
      </mesh>
      
      {/* Muzzle flash effect (could be animated) */}
      <mesh position={[0, 0, -0.9]} visible={false}>
        <coneGeometry args={[0.1, 0.2, 8]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.8} />
      </mesh>
    </group>
  );
});

Minigun.displayName = "Minigun";

export default Minigun;
