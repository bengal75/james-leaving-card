import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import * as THREE from "three";
import { GAME_CONFIG } from "../gameData";

export interface Bullet {
  id: string;
  position: THREE.Vector3;
  direction: THREE.Vector3;
  speed: number;
}

export interface Enemy {
  id: string;
  position: THREE.Vector3;
  health: number;
  maxHealth: number;
  target: THREE.Vector3;
  speed: number;
  lastAttackTime: number;
}

export interface MessageBox {
  id: string;
  position: THREE.Vector3;
  message: string;
  hit: boolean;
}

export interface GameState {
  // Player state
  playerPosition: THREE.Vector3;
  playerRotation: THREE.Euler;
  playerHealth: number;
  playerMaxHealth: number;
  ammoInClip: number;
  reserveAmmo: number;
  maxClipSize: number;
  isReloading: boolean;
  
  // Game objects
  bullets: Bullet[];
  enemies: Enemy[];
  messageBoxes: MessageBox[];
  
  // UI state
  currentMessage: string | null;
  showDialog: boolean;
  crosshair: boolean;
  
  // Game stats
  score: number;
  enemiesKilled: number;
  messagesRead: number;
  
  // Level progression
  currentLevel: number;
  roomLayout: "default" | "corridor" | "arena";
  
  // Actions
  addBullet: (bullet: Bullet) => void;
  removeBullet: (id: string) => void;
  updateBullets: () => void;
  
  addEnemy: (enemy: Enemy) => void;
  removeEnemy: (id: string) => void;
  updateEnemies: () => void;
  damageEnemy: (id: string, damage: number) => void;
  
  hitMessageBox: (id: string) => void;
  showMessage: (message: string) => void;
  hideMessage: () => void;
  
  updatePlayerPosition: (position: THREE.Vector3) => void;
  updatePlayerRotation: (rotation: THREE.Euler) => void;
  damagePlayer: (damage: number) => void;
  healPlayer: (amount: number) => void;
  fireWeapon: () => boolean;
  reload: () => void;
  
  incrementScore: (points: number) => void;
  nextLevel: () => void;
  reset: () => void;
}

const useGameState = create<GameState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    playerPosition: new THREE.Vector3(0, 0, 0),
    playerRotation: new THREE.Euler(0, 0, 0),
    playerHealth: 100,
    playerMaxHealth: 100,
    ammoInClip: GAME_CONFIG.AMMO_PER_CLIP,
    reserveAmmo: GAME_CONFIG.MAX_AMMO - GAME_CONFIG.AMMO_PER_CLIP,
    maxClipSize: GAME_CONFIG.AMMO_PER_CLIP,
    isReloading: false,
    bullets: [],
    enemies: [],
    messageBoxes: [],
    currentMessage: null,
    showDialog: false,
    crosshair: true,
    score: 0,
    enemiesKilled: 0,
    messagesRead: 0,
    currentLevel: 1,
    roomLayout: "default",
    
    // Bullet actions
    addBullet: (bullet) => {
      console.log("Adding bullet:", bullet.id);
      set((state) => ({
        bullets: [...state.bullets, bullet]
      }));
    },
    
    removeBullet: (id) => {
      set((state) => ({
        bullets: state.bullets.filter(bullet => bullet.id !== id)
      }));
    },
    
    updateBullets: () => {
      set((state) => ({
        bullets: state.bullets.map(bullet => ({
          ...bullet,
          position: bullet.position.clone().add(
            bullet.direction.clone().multiplyScalar(bullet.speed)
          )
        })).filter(bullet => {
          // Remove bullets that are too far away
          return bullet.position.length() < 100;
        })
      }));
    },
    
    // Enemy actions
    addEnemy: (enemy) => {
      set((state) => ({
        enemies: [...state.enemies, enemy]
      }));
    },
    
    removeEnemy: (id) => {
      set((state) => ({
        enemies: state.enemies.filter(enemy => enemy.id !== id),
        enemiesKilled: state.enemiesKilled + 1
      }));
    },
    
    updateEnemies: () => {
      const { playerPosition } = get();
      set((state) => ({
        enemies: state.enemies.map(enemy => {
          // Move enemy towards player slowly
          const direction = playerPosition.clone().sub(enemy.position).normalize();
          const newPosition = enemy.position.clone().add(direction.multiplyScalar(enemy.speed));
          
          return {
            ...enemy,
            position: newPosition,
            target: playerPosition.clone()
          };
        })
      }));
    },
    
    damageEnemy: (id, damage) => {
      set((state) => ({
        enemies: state.enemies.map(enemy => 
          enemy.id === id 
            ? { ...enemy, health: Math.max(0, enemy.health - damage) }
            : enemy
        )
      }));
    },
    
    // Message box actions
    hitMessageBox: (id) => {
      set((state) => ({
        messageBoxes: state.messageBoxes.map(box =>
          box.id === id ? { ...box, hit: true } : box
        )
      }));
    },
    
    showMessage: (message) => {
      set({
        currentMessage: message,
        showDialog: true,
        crosshair: false,
        messagesRead: get().messagesRead + 1
      });
    },
    
    hideMessage: () => {
      set({
        currentMessage: null,
        showDialog: false,
        crosshair: true
      });
    },
    
    // Player actions
    updatePlayerPosition: (position) => {
      set({ playerPosition: position });
    },
    
    updatePlayerRotation: (rotation) => {
      set({ playerRotation: rotation });
    },
    
    damagePlayer: (damage) => {
      set((state) => ({
        playerHealth: Math.max(0, state.playerHealth - damage)
      }));
    },
    
    healPlayer: (amount) => {
      set((state) => ({
        playerHealth: Math.min(state.playerMaxHealth, state.playerHealth + amount)
      }));
    },
    
    fireWeapon: () => {
      const state = get();
      if (state.isReloading) return false;
      if (state.ammoInClip <= 0) {
        console.log("Clip empty - need to reload");
        return false;
      }
      
      set((state) => ({
        ammoInClip: state.ammoInClip - 1
      }));
      return true;
    },
    
    reload: () => {
      const state = get();
      if (state.isReloading || state.ammoInClip === state.maxClipSize || state.reserveAmmo === 0) {
        return;
      }
      
      console.log("Reloading...");
      set({ isReloading: true });
      
      setTimeout(() => {
        set((state) => {
          const ammoNeeded = state.maxClipSize - state.ammoInClip;
          const ammoToLoad = Math.min(ammoNeeded, state.reserveAmmo);
          
          return {
            ammoInClip: state.ammoInClip + ammoToLoad,
            reserveAmmo: state.reserveAmmo - ammoToLoad,
            isReloading: false
          };
        });
        console.log("Reload complete!");
      }, GAME_CONFIG.RELOAD_TIME);
    },
    
    // Score actions
    incrementScore: (points) => {
      set((state) => ({
        score: state.score + points
      }));
    },
    
    nextLevel: () => {
      set((state) => {
        const newLevel = state.currentLevel + 1;
        let newLayout: "default" | "corridor" | "arena" = "default";
        
        // Alternate room layouts based on level
        if (newLevel % 3 === 0) {
          newLayout = "arena";
        } else if (newLevel % 2 === 0) {
          newLayout = "corridor";
        }
        
        return {
          currentLevel: newLevel,
          roomLayout: newLayout,
          playerHealth: Math.min(state.playerMaxHealth, state.playerHealth + 30), // Heal on level up
          ammoInClip: GAME_CONFIG.AMMO_PER_CLIP,
          reserveAmmo: GAME_CONFIG.MAX_AMMO - GAME_CONFIG.AMMO_PER_CLIP, // Replenish ammo
          enemies: [],
          bullets: []
        };
      });
    },
    
    reset: () => {
      set({
        bullets: [],
        enemies: [],
        currentMessage: null,
        showDialog: false,
        crosshair: true,
        score: 0,
        enemiesKilled: 0,
        messagesRead: 0,
        currentLevel: 1,
        roomLayout: "default",
        playerHealth: 100,
        ammoInClip: GAME_CONFIG.AMMO_PER_CLIP,
        reserveAmmo: GAME_CONFIG.MAX_AMMO - GAME_CONFIG.AMMO_PER_CLIP
      });
    }
  }))
);

export default useGameState;
