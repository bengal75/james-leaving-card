import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import "@fontsource/inter";
import GameWorld from "./components/game/GameWorld";
import GameUI from "./components/game/GameUI";
import MessageDialog from "./components/game/MessageDialog";
import AudioInit from "./components/game/AudioInit";

// Define control keys for the game
enum Controls {
	forward = "forward",
	backward = "backward",
	leftward = "leftward",
	rightward = "rightward",
}

const controls = [
	{ name: Controls.forward, keys: ["KeyW", "ArrowUp"] },
	{ name: Controls.backward, keys: ["KeyS", "ArrowDown"] },
	{ name: Controls.leftward, keys: ["KeyA", "ArrowLeft"] },
	{ name: Controls.rightward, keys: ["KeyD", "ArrowRight"] },
];

function App() {
	const [webglError, setWebglError] = useState(false);

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{webglError ? (
				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: "#1a1a1a",
						color: "#fff",
						fontFamily: "Inter, sans-serif",
						textAlign: "center",
						padding: "20px",
					}}
				>
					<div>
						<h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
							WebGL Not Available
						</h1>
						<p style={{ fontSize: "16px", lineHeight: "1.5" }}>
							This 3D game requires WebGL support to run.
							<br />
							Please try opening it in a modern browser with WebGL
							enabled,
							<br />
							or check your browser's hardware acceleration
							settings.
						</p>
					</div>
				</div>
			) : (
				<KeyboardControls map={controls}>
					<>
						<Canvas
							shadows
							camera={{
								position: [0, 1.6, 5],
								fov: 75,
								near: 0.1,
								far: 1000,
							}}
							gl={{
								antialias: false,
								alpha: false,
								powerPreference: "default",
								failIfMajorPerformanceCaveat: false,
							}}
							onCreated={({ gl }) => {
								console.log(
									"WebGL context created successfully",
								);
								console.log(
									"WebGL version:",
									gl.capabilities.isWebGL2
										? "WebGL2"
										: "WebGL1",
								);
							}}
							onError={(error) => {
								console.error("WebGL Error:", error);
								setWebglError(true);
							}}
						>
							<color attach="background" args={["#2a1810"]} />

							{/* Ambient lighting for DOOM-style atmosphere */}
							<ambientLight intensity={0.3} color="#ff6600" />
							<directionalLight
								position={[10, 10, 5]}
								intensity={0.8}
								color="#ffaa44"
								castShadow
								shadow-mapSize-width={2048}
								shadow-mapSize-height={2048}
							/>

							<Suspense fallback={null}>
								<GameWorld />
							</Suspense>
						</Canvas>

						<GameUI />
						<MessageDialog />
						<AudioInit />
					</>
				</KeyboardControls>
			)}
		</div>
	);
}

export default App;
