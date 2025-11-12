import { useEffect } from "react";
import { useAudio } from "../../lib/stores/useAudio";

export default function AudioInit() {
	const { setHitSound, setSuccessSound, setBackgroundMusic } = useAudio();

	useEffect(() => {
		// Initialize audio elements
		const hit = new Audio("/sounds/hit.mp3");
		hit.volume = 0.3;
		hit.preload = "auto";

		const success = new Audio("/sounds/success.mp3");
		success.volume = 0.4;
		success.preload = "auto";

		const background = new Audio("/sounds/background.mp3");
		background.volume = 0.2;
		background.loop = true;
		background.preload = "auto";

		setHitSound(hit);
		setSuccessSound(success);
		setBackgroundMusic(background);

		console.log("Audio files initialized");

		// Start background music on first user interaction
		const startBackgroundMusic = () => {
			background.play().catch((err) => {
				console.log("Background music autoplay prevented:", err);
			});
			document.removeEventListener("click", startBackgroundMusic);
		};

		document.addEventListener("click", startBackgroundMusic);

		return () => {
			document.removeEventListener("click", startBackgroundMusic);
			background.pause();
		};
	}, [setHitSound, setSuccessSound, setBackgroundMusic]);

	return null;
}
