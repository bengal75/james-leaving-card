import { GAME_CONFIG } from "../../lib/gameData";
import useGameState from "../../lib/stores/useGameState";

export default function Room() {
  const { roomLayout } = useGameState();
  const roomSize = GAME_CONFIG.ROOM_SIZE;
  
  return (
    <group>
      {/* Floor - dark gray concrete look */}
      <mesh 
        position={[0, -0.1, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[roomSize * 2, roomSize * 2]} />
        <meshLambertMaterial color="#3a3a3a" />
      </mesh>
      
      {/* Walls - brown/red DOOM-style */}
      {/* North Wall */}
      <mesh position={[0, roomSize / 2, -roomSize]} castShadow receiveShadow>
        <boxGeometry args={[roomSize * 2, roomSize, 0.5]} />
        <meshLambertMaterial color="#5a3020" emissive="#1a0a00" />
      </mesh>
      
      {/* South Wall */}
      <mesh position={[0, roomSize / 2, roomSize]} castShadow receiveShadow>
        <boxGeometry args={[roomSize * 2, roomSize, 0.5]} />
        <meshLambertMaterial color="#5a3020" emissive="#1a0a00" />
      </mesh>
      
      {/* East Wall */}
      <mesh position={[roomSize, roomSize / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, roomSize, roomSize * 2]} />
        <meshLambertMaterial color="#5a3020" emissive="#1a0a00" />
      </mesh>
      
      {/* West Wall */}
      <mesh position={[-roomSize, roomSize / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, roomSize, roomSize * 2]} />
        <meshLambertMaterial color="#5a3020" emissive="#1a0a00" />
      </mesh>
      
      {/* Some DOOM-style decorations */}
      {/* Metal barrels */}
      <mesh position={[-8, 1, -8]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 2, 8]} />
        <meshLambertMaterial color="#444444" emissive="#111111" />
      </mesh>
      
      <mesh position={[8, 1, -8]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 2, 8]} />
        <meshLambertMaterial color="#444444" emissive="#111111" />
      </mesh>
      
      {/* Stone pillars */}
      <mesh position={[-6, 2.5, 6]} castShadow>
        <boxGeometry args={[1.5, 5, 1.5]} />
        <meshLambertMaterial color="#666666" emissive="#0a0a0a" />
      </mesh>
      
      <mesh position={[6, 2.5, 6]} castShadow>
        <boxGeometry args={[1.5, 5, 1.5]} />
        <meshLambertMaterial color="#666666" emissive="#0a0a0a" />
      </mesh>
      
      {/* Layout-specific decorations */}
      {roomLayout === "default" && (
        <>
          {/* Tech panels - DOOM style */}
          <mesh position={[0, 3, -14.9]} castShadow>
            <boxGeometry args={[4, 2, 0.2]} />
            <meshLambertMaterial color="#223322" emissive="#002200" />
          </mesh>
          
          {/* Red emergency lights */}
          <mesh position={[-10, 6, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="#ff0000" />
          </mesh>
          <mesh position={[10, 6, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="#ff0000" />
          </mesh>
        </>
      )}
      
      {roomLayout === "corridor" && (
        <>
          {/* Corridor walls */}
          <mesh position={[-5, roomSize / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, roomSize, roomSize * 2]} />
            <meshLambertMaterial color="#3a2010" emissive="#0a0500" />
          </mesh>
          <mesh position={[5, roomSize / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, roomSize, roomSize * 2]} />
            <meshLambertMaterial color="#3a2010" emissive="#0a0500" />
          </mesh>
          
          {/* Corridor lights */}
          {[-10, -5, 0, 5, 10].map((z) => (
            <mesh key={z} position={[0, 8, z]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color="#ffaa00" />
            </mesh>
          ))}
        </>
      )}
      
      {roomLayout === "arena" && (
        <>
          {/* Arena platforms */}
          <mesh position={[-8, 1, -8]} castShadow receiveShadow>
            <boxGeometry args={[4, 2, 4]} />
            <meshLambertMaterial color="#555555" emissive="#0a0a0a" />
          </mesh>
          <mesh position={[8, 1, -8]} castShadow receiveShadow>
            <boxGeometry args={[4, 2, 4]} />
            <meshLambertMaterial color="#555555" emissive="#0a0a0a" />
          </mesh>
          <mesh position={[-8, 1, 8]} castShadow receiveShadow>
            <boxGeometry args={[4, 2, 4]} />
            <meshLambertMaterial color="#555555" emissive="#0a0a0a" />
          </mesh>
          <mesh position={[8, 1, 8]} castShadow receiveShadow>
            <boxGeometry args={[4, 2, 4]} />
            <meshLambertMaterial color="#555555" emissive="#0a0a0a" />
          </mesh>
          
          {/* Arena spotlights */}
          {[[-8, -8], [8, -8], [-8, 8], [8, 8]].map(([x, z], i) => (
            <mesh key={i} position={[x, 10, z]}>
              <sphereGeometry args={[0.4, 16, 16]} />
              <meshBasicMaterial color="#ff4400" />
            </mesh>
          ))}
        </>
      )}
      
      {/* Ceiling */}
      <mesh 
        position={[0, roomSize, 0]} 
        rotation={[Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[roomSize * 2, roomSize * 2]} />
        <meshLambertMaterial color="#2a1810" />
      </mesh>
    </group>
  );
}
