import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import useGameState from "../../lib/stores/useGameState";
import { useAudio } from "../../lib/stores/useAudio";
import Player from "./Player";
import Room from "./Room";
import MessageBox from "./MessageBox";
import Enemy from "./Enemy";
import Bullet from "./Bullet";
import { GAME_MESSAGES, ENEMY_SPAWN_POSITIONS, GAME_CONFIG } from "../../lib/gameData";
import * as THREE from "three";

export default function GameWorld() {
  const {
    bullets,
    enemies,
    messageBoxes,
    playerPosition,
    playerHealth,
    currentLevel,
    addEnemy,
    removeEnemy,
    updateBullets,
    updateEnemies,
    damageEnemy,
    damagePlayer,
    hitMessageBox,
    showMessage,
    incrementScore,
    nextLevel
  } = useGameState();

  const { playHit, playSuccess } = useAudio();
  const lastEnemySpawn = useRef(Date.now());
  const initialized = useRef(false);
  const levelCompleteRef = useRef(false);
  const enemiesSpawnedThisLevel = useRef(0);
  const killedEnemiesThisFrame = useRef(new Set<string>());

  // Initialize message boxes on first load
  useEffect(() => {
    if (!initialized.current) {
      useGameState.setState({
        messageBoxes: GAME_MESSAGES.map(msg => ({
          id: msg.id,
          position: msg.position,
          message: msg.message,
          hit: false
        }))
      });
      initialized.current = true;
    }
  }, []);

  // Game loop
  useFrame(() => {
    // Clear killed enemies tracking at start of frame
    killedEnemiesThisFrame.current.clear();

    // Update bullets
    updateBullets();

    // Update enemies
    updateEnemies();

    // Spawn new enemies periodically
    const now = Date.now();
    const maxEnemiesForLevel = GAME_CONFIG.MAX_ENEMIES + (currentLevel - 1) * 2; // Increase enemies per level
    const enemiesNeededForLevel = 5 + (currentLevel - 1) * 3; // Total enemies to defeat per level

    if (!levelCompleteRef.current &&
        now - lastEnemySpawn.current > GAME_CONFIG.ENEMY_SPAWN_INTERVAL &&
        enemies.length < maxEnemiesForLevel &&
        enemiesSpawnedThisLevel.current < enemiesNeededForLevel) {
      const spawnIndex = Math.floor(Math.random() * ENEMY_SPAWN_POSITIONS.length);
      const spawnPosition = ENEMY_SPAWN_POSITIONS[spawnIndex].clone();

      addEnemy({
        id: `enemy-${now}`,
        position: spawnPosition,
        health: GAME_CONFIG.ENEMY_HEALTH,
        maxHealth: GAME_CONFIG.ENEMY_HEALTH,
        target: new THREE.Vector3(0, 0, 0),
        speed: GAME_CONFIG.ENEMY_SPEED,
        lastAttackTime: 0
      });

      enemiesSpawnedThisLevel.current += 1;
      lastEnemySpawn.current = now;
    }

    // Check for level completion
    if (!levelCompleteRef.current &&
        enemiesSpawnedThisLevel.current >= enemiesNeededForLevel &&
        enemies.length === 0) {
      console.log("Level complete!");
      levelCompleteRef.current = true;

      // Show level complete message after a delay
      setTimeout(() => {
        useGameState.setState({
          currentMessage: `
            <h2 style="color: #ff6600; margin-bottom: 16px;">LEVEL ${currentLevel} COMPLETE!</h2>
            <p style="margin-bottom: 12px;">Excellent work, soldier!</p>
            <p style="margin-bottom: 12px;">Enemies Defeated: ${enemiesSpawnedThisLevel.current}</p>
            <p style="margin-bottom: 12px;">You've been granted:</p>
            <ul style="margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">+30 Health</li>
              <li style="margin-bottom: 8px;">Full Ammo Resupply</li>
            </ul>
            <p style="margin-top: 16px; color: #ff4400;"><strong>Click to proceed to Level ${currentLevel + 1}</strong></p>
          `,
          showDialog: true,
          crosshair: false
        });

        // Advance to next level when dialog is closed
        const unsubscribe = useGameState.subscribe(
          state => state.showDialog,
          (showDialog) => {
            if (!showDialog && levelCompleteRef.current) {
              nextLevel();
              levelCompleteRef.current = false;
              enemiesSpawnedThisLevel.current = 0;
              unsubscribe();
            }
          }
        );
      }, 1000);
    }

    // Check bullet collisions
    bullets.forEach(bullet => {
      // Get the current enemies from state each time to avoid stale data
      const currentEnemies = useGameState.getState().enemies;

      // Check collision with enemies
      currentEnemies.forEach(enemy => {
        // Skip if already killed this frame
        if (killedEnemiesThisFrame.current.has(enemy.id)) {
          return;
        }

        const distance = bullet.position.distanceTo(enemy.position);
        if (distance < GAME_CONFIG.HIT_DISTANCE) {
          console.log("Bullet hit enemy:", enemy.id);

          // Damage the enemy
          damageEnemy(enemy.id, GAME_CONFIG.ENEMY_DAMAGE);
          useGameState.getState().removeBullet(bullet.id);
          playHit();

          // Get the enemy after damage to check if it should die
          const updatedEnemies = useGameState.getState().enemies;
          const damagedEnemy = updatedEnemies.find(e => e.id === enemy.id);

          if (damagedEnemy && damagedEnemy.health <= 0) {
            killedEnemiesThisFrame.current.add(enemy.id);
            removeEnemy(enemy.id);
            incrementScore(100);
            playSuccess();
          }
        }
      });

      // Check collision with message boxes
      messageBoxes.forEach(box => {
        if (!box.hit) {
          const distance = bullet.position.distanceTo(box.position);
          if (distance < GAME_CONFIG.HIT_DISTANCE) {
            console.log("Bullet hit message box:", box.id);
            hitMessageBox(box.id);
            showMessage(box.message);
            useGameState.getState().removeBullet(bullet.id);
            incrementScore(50);
            playSuccess();
          }
        }
      });
    });

    // Check if enemies can attack player
    const currentTime = Date.now();
    enemies.forEach(enemy => {
      const distanceToPlayer = enemy.position.distanceTo(playerPosition);

      if (distanceToPlayer < GAME_CONFIG.ENEMY_ATTACK_RANGE) {
        // Enemy is close enough to attack
        if (currentTime - enemy.lastAttackTime > GAME_CONFIG.ENEMY_ATTACK_COOLDOWN) {
          // Attack cooldown has passed
          console.log("Enemy attacking player:", enemy.id);
          damagePlayer(GAME_CONFIG.ENEMY_DAMAGE);
          playHit();

          // Update last attack time
          useGameState.setState(state => ({
            enemies: state.enemies.map(e =>
              e.id === enemy.id ? { ...e, lastAttackTime: currentTime } : e
            )
          }));
        }
      }
    });

    // Check for game over
    if (playerHealth <= 0) {
      console.log("Game Over!");
      // Could add game over screen here
    }
  });

  return (
    <>
      <Room />
      <Player />

      {/* Render message boxes */}
      {messageBoxes.map(box => (
        <MessageBox
          key={box.id}
          position={box.position}
          hit={box.hit}
        />
      ))}

      {/* Render enemies */}
      {enemies.map(enemy => (
        <Enemy
          key={enemy.id}
          position={enemy.position}
          health={enemy.health}
          maxHealth={enemy.maxHealth}
        />
      ))}

      {/* Render bullets */}
      {bullets.map(bullet => (
        <Bullet
          key={bullet.id}
          position={bullet.position}
        />
      ))}
    </>
  );
}
