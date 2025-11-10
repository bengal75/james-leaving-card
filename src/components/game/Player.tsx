import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { PerspectiveCamera } from "three";
import useGameState from "../../lib/stores/useGameState";
import { useAudio } from "../../lib/stores/useAudio";
import Minigun from "./Minigun";
import { GAME_CONFIG } from "../../lib/gameData";
import * as THREE from "three";
import { PointerLockControls } from "@react-three/drei";

enum Controls {
  forward = "forward",
  backward = "backward",
  leftward = "leftward",
  rightward = "rightward",
}

export default function Player() {
  const { camera, gl } = useThree();
  const minigunRef = useRef<THREE.Group>(null);
  const {
    playerPosition,
    playerRotation,
    updatePlayerPosition,
    updatePlayerRotation,
    addBullet,
    showDialog,
    fireWeapon,
    reload,
    isReloading,
  } = useGameState();
  const { playShoot } = useAudio();

  const [, get] = useKeyboardControls<Controls>();

  // Mouse controls
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (showDialog) return; // Don't rotate camera when dialog is open

      // TODO: This had a crazy mouse movement so I used PointerLockControls instead.
      // const sensitivity = 0.002;
      // const rotation = camera.rotation.clone();

      // rotation.y -= event.movementX * sensitivity;
      // rotation.x -= event.movementY * sensitivity;

      // // Clamp vertical rotation
      // rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.x));

      // camera.rotation.copy(rotation);
      // updatePlayerRotation(rotation);
    };

    const handleClick = (event: MouseEvent) => {
      if (event.button === 0) {
        // Left click
        if (showDialog) {
          // Close dialog
          useGameState.getState().hideMessage();
        } else {
          // Shoot
          shoot();
        }
      }
    };

    const handlePointerLock = () => {
      if (!showDialog) {
        gl.domElement.requestPointerLock();
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "r" || event.key === "R") {
        reload();
      }
    };

    gl.domElement.addEventListener("click", handlePointerLock);
    gl.domElement.addEventListener("mousemove", handleMouseMove);
    gl.domElement.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      gl.domElement.removeEventListener("click", handlePointerLock);
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
      gl.domElement.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [camera, gl, showDialog, reload]);

  const shoot = () => {
    // Check if can fire weapon
    if (!fireWeapon()) {
      return; // Out of ammo or reloading
    }

    console.log("Player shooting");

    // Get camera direction
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    // Create bullet
    const bulletId = `bullet-${Date.now()}-${Math.random()}`;
    const bullet = {
      id: bulletId,
      position: camera.position.clone(),
      direction: direction.normalize(),
      speed: GAME_CONFIG.BULLET_SPEED,
    };

    addBullet(bullet);
    playShoot();

    // Animate minigun (if ref exists)
    if (minigunRef.current) {
      const originalRotation = minigunRef.current.rotation.z;
      minigunRef.current.rotation.z = originalRotation + 0.1;
      setTimeout(() => {
        if (minigunRef.current) {
          minigunRef.current.rotation.z = originalRotation;
        }
      }, 100);
    }
  };

  useFrame(() => {
    const controls = get();
    const velocity = new THREE.Vector3();

    // Movement
    if (controls.forward) {
      console.log("Moving forward");
      velocity.z -= GAME_CONFIG.PLAYER_SPEED;
    }
    if (controls.backward) {
      console.log("Moving backward");
      velocity.z += GAME_CONFIG.PLAYER_SPEED;
    }
    if (controls.leftward) {
      console.log("Moving left");
      velocity.x -= GAME_CONFIG.PLAYER_SPEED;
    }
    if (controls.rightward) {
      console.log("Moving right");
      velocity.x += GAME_CONFIG.PLAYER_SPEED;
    }

    // Apply camera rotation to movement
    velocity.applyQuaternion(camera.quaternion);

    // Update position
    const newPosition = camera.position.clone().add(velocity);

    // Keep player within room bounds
    const roomSize = GAME_CONFIG.ROOM_SIZE;
    newPosition.x = Math.max(
      -roomSize + 1,
      Math.min(roomSize - 1, newPosition.x),
    );
    newPosition.z = Math.max(
      -roomSize + 1,
      Math.min(roomSize - 1, newPosition.z),
    );
    newPosition.y = 1.6; // Keep camera at eye level

    camera.position.copy(newPosition);
    updatePlayerPosition(newPosition);
  });

  return (
    <group>
      <PointerLockControls />
      <Minigun ref={minigunRef} />
    </group>
  );
}
