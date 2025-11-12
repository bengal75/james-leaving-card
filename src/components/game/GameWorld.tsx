import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import useGameState from "../../lib/stores/useGameState";
import { useAudio } from "../../lib/stores/useAudio";
import Player from "./Player";
import Room from "./Room";
import MessageBox from "./MessageBox";
import GifBox from "./GifBox";
import Enemy from "./Enemy";
import Bullet from "./Bullet";
import {
	GAME_MESSAGES,
	GIF_MESSAGES,
	ENEMY_SPAWN_POSITIONS,
	GAME_CONFIG,
} from "../../lib/gameData";
import * as THREE from "three";

export default function GameWorld() {
	const {
		bullets,
		enemies,
		messageBoxes,
		gifBoxes = [],
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
		hitGifBox,
		showMessage,
		incrementScore,
		nextLevel,
	} = useGameState();

	const { playHit, playSuccess } = useAudio();
	const lastEnemySpawn = useRef(Date.now());
	const initialized = useRef(false);
	const levelCompleteRef = useRef(false);
	const enemiesSpawnedThisLevel = useRef(0);
	const killedEnemiesThisFrame = useRef(new Set<string>());

	useEffect(() => {
		if (!initialized.current) {
			useGameState.setState({
				messageBoxes: GAME_MESSAGES.map((msg) => ({
					id: msg.id,
					position: msg.position,
					message: msg.message,
					hit: false,
				})),
				gifBoxes: GIF_MESSAGES.map((gif) => ({
					id: gif.id,
					position: gif.position,
					message: gif.message,
					imageUrl: gif.imageUrl,
					hit: false,
				})),
			});
			initialized.current = true;
		}
	}, []);

	useFrame(() => {
		killedEnemiesThisFrame.current.clear();
		updateBullets();
		updateEnemies();

		const now = Date.now();
		const maxEnemies = GAME_CONFIG.MAX_ENEMIES + (currentLevel - 1) * 2;
		const neededEnemies = 5 + (currentLevel - 1) * 3;

		if (
			!levelCompleteRef.current &&
			now - lastEnemySpawn.current > GAME_CONFIG.ENEMY_SPAWN_INTERVAL &&
			enemies.length < maxEnemies &&
			enemiesSpawnedThisLevel.current < neededEnemies
		) {
			const spawn =
				ENEMY_SPAWN_POSITIONS[
					Math.floor(Math.random() * ENEMY_SPAWN_POSITIONS.length)
				].clone();

			addEnemy({
				id: `enemy-${now}`,
				position: spawn,
				health: GAME_CONFIG.ENEMY_HEALTH,
				maxHealth: GAME_CONFIG.ENEMY_HEALTH,
				target: new THREE.Vector3(0, 0, 0),
				speed: GAME_CONFIG.ENEMY_SPEED,
				lastAttackTime: 0,
			});

			enemiesSpawnedThisLevel.current++;
			lastEnemySpawn.current = now;
		}

		if (
			!levelCompleteRef.current &&
			enemiesSpawnedThisLevel.current >= neededEnemies &&
			enemies.length === 0
		) {
			levelCompleteRef.current = true;

			setTimeout(() => {
				useGameState.setState({
					currentMessage: `
            <h2 style="color: #ff6600; margin-bottom: 16px;">LEVEL ${currentLevel} COMPLETE!</h2>
            <p style="margin-bottom: 12px;">Enemies Defeated: ${enemiesSpawnedThisLevel.current}</p>
            <ul style="margin: 0; padding-left: 20px;">
              <li>+30 Health</li>
              <li>Full Ammo</li>
            </ul>
            <p style="margin-top: 12px; color: #ff4400;"><strong>Click to continue</strong></p>
          `,
					showDialog: true,
					crosshair: false,
				});

				const unsubscribe = useGameState.subscribe(
					(state) => state.showDialog,
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

		bullets.forEach((bullet) => {
			const currentEnemies = useGameState.getState().enemies;
			currentEnemies.forEach((enemy) => {
				if (killedEnemiesThisFrame.current.has(enemy.id)) return;

				const dist = bullet.position.distanceTo(enemy.position);
				if (dist < GAME_CONFIG.HIT_DISTANCE) {
					damageEnemy(enemy.id, GAME_CONFIG.ENEMY_DAMAGE);
					useGameState.getState().removeBullet(bullet.id);
					playHit();

					const updated = useGameState
						.getState()
						.enemies.find((e) => e.id === enemy.id);
					if (updated && updated.health <= 0) {
						killedEnemiesThisFrame.current.add(enemy.id);
						removeEnemy(enemy.id);
						incrementScore(100);
						playSuccess();
					}
				}
			});

			const boxes = useGameState.getState().messageBoxes;
			boxes.forEach((box) => {
				if (
					!box.hit &&
					bullet.position.distanceTo(box.position) <
						GAME_CONFIG.HIT_DISTANCE
				) {
					hitMessageBox(box.id);
					showMessage(box.message);
					useGameState.getState().removeBullet(bullet.id);
					incrementScore(50);
					playSuccess();
				}
			});

			const gifs = useGameState.getState().gifBoxes;
			gifs.forEach((gif) => {
				if (
					!gif.hit &&
					bullet.position.distanceTo(gif.position) <
						GAME_CONFIG.HIT_DISTANCE
				) {
					hitGifBox(gif.id);
					showMessage(gif.message);
					useGameState.getState().removeBullet(bullet.id);
					incrementScore(50);
					playSuccess();
				}
			});
		});

		enemies.forEach((enemy) => {
			const dist = enemy.position.distanceTo(playerPosition);
			const now = Date.now();

			if (
				dist < GAME_CONFIG.ENEMY_ATTACK_RANGE &&
				now - enemy.lastAttackTime > GAME_CONFIG.ENEMY_ATTACK_COOLDOWN
			) {
				damagePlayer(GAME_CONFIG.ENEMY_DAMAGE);
				playHit();
				useGameState.setState((state) => ({
					enemies: state.enemies.map((e) =>
						e.id === enemy.id ? { ...e, lastAttackTime: now } : e
					),
				}));
			}
		});

		if (playerHealth <= 0) {
			console.log("Game Over");
		}
	});

	return (
		<>
			<Room />
			<Player />

			{messageBoxes.map((box) => (
				<MessageBox
					key={box.id}
					position={box.position}
					hit={box.hit}
				/>
			))}

			{gifBoxes.map((box) => (
				<GifBox
					key={box.id}
					id={box.id}
					position={box.position}
					imageUrl={box.imageUrl}
					hit={box.hit}
				/>
			))}

			{enemies.map((enemy) => (
				<Enemy
					key={enemy.id}
					position={enemy.position}
					health={enemy.health}
					maxHealth={enemy.maxHealth}
				/>
			))}

			{bullets.map((bullet) => (
				<Bullet key={bullet.id} position={bullet.position} />
			))}
		</>
	);
}
