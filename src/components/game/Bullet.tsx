import * as THREE from "three";

interface BulletProps {
  position: THREE.Vector3;
}

export default function Bullet({ position }: BulletProps) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#ffff00" />
      
      {/* Simple glow effect */}
      <pointLight position={[0, 0, 0]} color="#ffaa00" intensity={2} distance={2} />
    </mesh>
  );
}
