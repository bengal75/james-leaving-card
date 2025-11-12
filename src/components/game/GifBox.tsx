import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface GifBoxProps {
	id: string;
	position: THREE.Vector3;
	hit: boolean;
	imageUrl: string;
}

export default function GifBox({ id, position, hit, imageUrl }: GifBoxProps) {
	const meshRef = useRef<THREE.Mesh>(null);

	useFrame((state) => {
		if (meshRef.current && !hit) {
			meshRef.current.position.y =
				position.y + Math.sin(state.clock.elapsedTime * 2) * 0.2;
			meshRef.current.rotation.y += 0.01;
		}
	});

	return (
		<group ref={meshRef} position={position}>
			<Html
				distanceFactor={8} // scales based on camera distance
				transform
				style={{
					width: "100px",
					height: "100px",
					opacity: hit ? 0.3 : 1,
					transition: "opacity 0.3s",
				}}
			>
				<img
					src={imageUrl}
					alt="GIF"
					style={{
						width: "100%",
						height: "100%",
						borderRadius: "8px",
					}}
				/>
			</Html>
		</group>
	);
}
