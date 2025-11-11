import { useState } from "react";
import type { FC } from "react";
import { Player, GameState } from "./types";
import type { CellValue, LocalBoardState, GlobalBoardState } from "./types";
import { PLAYER_COLORS } from "./constants";
import Board from "./components/Board";

type AudioContextConstructor = typeof AudioContext;

interface WindowWithAudioContext extends Window {
	AudioContext?: AudioContextConstructor;
	webkitAudioContext?: AudioContextConstructor;
}

const createAudioContext = (): AudioContext | null => {
	if (typeof window === "undefined") {
		return null;
	}

	const win = window as WindowWithAudioContext;
	const AudioContextCtor = win.AudioContext ?? win.webkitAudioContext;

	if (!AudioContextCtor) {
		console.warn("AudioContext is not supported in this environment.");
		return null;
	}

	try {
		return new AudioContextCtor();
	} catch (error) {
		console.warn("AudioContext creation failed:", error);
		return null;
	}
};

// Generated better meow sound using oscillators
const playCatSound = () => {
	const audioContext = createAudioContext();
	if (!audioContext) {
		return;
	}

	try {
		// Create a more realistic meow with multiple oscillators
		const osc1 = audioContext.createOscillator();
		const osc2 = audioContext.createOscillator();
		const gainNode = audioContext.createGain();

		osc1.connect(gainNode);
		osc2.connect(gainNode);
		gainNode.connect(audioContext.destination);

		// Meow frequencies - sliding up then down
		osc1.type = "sine";
		osc2.type = "triangle";
		osc1.frequency.setValueAtTime(400, audioContext.currentTime);
		osc1.frequency.exponentialRampToValueAtTime(
			800,
			audioContext.currentTime + 0.1,
		);
		osc1.frequency.exponentialRampToValueAtTime(
			600,
			audioContext.currentTime + 0.2,
		);

		osc2.frequency.setValueAtTime(600, audioContext.currentTime);
		osc2.frequency.exponentialRampToValueAtTime(
			900,
			audioContext.currentTime + 0.1,
		);
		osc2.frequency.exponentialRampToValueAtTime(
			700,
			audioContext.currentTime + 0.2,
		);

		gainNode.gain.setValueAtTime(0, audioContext.currentTime);
		gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.02);
		gainNode.gain.exponentialRampToValueAtTime(
			0.01,
			audioContext.currentTime + 0.25,
		);

		osc1.start(audioContext.currentTime);
		osc2.start(audioContext.currentTime);
		osc1.stop(audioContext.currentTime + 0.25);
		osc2.stop(audioContext.currentTime + 0.25);
	} catch (error) {
		console.warn("Audio not supported:", error);
	}
};

// Generated better bark sound
const playDogSound = () => {
	const audioContext = createAudioContext();
	if (!audioContext) {
		return;
	}

	try {
		// Create a more realistic bark
		const osc1 = audioContext.createOscillator();
		const osc2 = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		const filter = audioContext.createBiquadFilter();

		osc1.connect(filter);
		osc2.connect(filter);
		filter.connect(gainNode);
		gainNode.connect(audioContext.destination);

		// Bark sound characteristics
		filter.type = "lowpass";
		filter.frequency.value = 1000;
		filter.Q.value = 5;

		osc1.type = "sawtooth";
		osc2.type = "square";
		osc1.frequency.setValueAtTime(150, audioContext.currentTime);
		osc1.frequency.exponentialRampToValueAtTime(
			120,
			audioContext.currentTime + 0.15,
		);

		osc2.frequency.setValueAtTime(200, audioContext.currentTime);
		osc2.frequency.exponentialRampToValueAtTime(
			100,
			audioContext.currentTime + 0.15,
		);

		gainNode.gain.setValueAtTime(0, audioContext.currentTime);
		gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.01);
		gainNode.gain.exponentialRampToValueAtTime(
			0.01,
			audioContext.currentTime + 0.2,
		);

		osc1.start(audioContext.currentTime);
		osc2.start(audioContext.currentTime);
		osc1.stop(audioContext.currentTime + 0.2);
		osc2.stop(audioContext.currentTime + 0.2);

		// Add a quick second "arf" sound
		setTimeout(() => {
			try {
				const arfOsc = audioContext.createOscillator();
				const arfGain = audioContext.createGain();
				arfOsc.connect(arfGain);
				arfGain.connect(audioContext.destination);

				arfOsc.type = "square";
				arfOsc.frequency.value = 180;
				arfGain.gain.setValueAtTime(0, audioContext.currentTime);
				arfGain.gain.linearRampToValueAtTime(
					0.2,
					audioContext.currentTime + 0.01,
				);
				arfGain.gain.exponentialRampToValueAtTime(
					0.01,
					audioContext.currentTime + 0.08,
				);

				arfOsc.start(audioContext.currentTime);
				arfOsc.stop(audioContext.currentTime + 0.08);
			} catch (error) {
				console.warn('Secondary "arf" sound failed:', error);
			}
		}, 300);
	} catch (error) {
		console.warn("Audio not supported:", error);
	}
};

// Victory fanfare sound
const playVictorySound = () => {
	const audioContext = createAudioContext();
	if (!audioContext) {
		return;
	}

	try {
		// Create victory fanfare with ascending notes
		const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, C (octave higher)

		notes.forEach((frequency, index) => {
			const oscillator = audioContext.createOscillator();
			const gainNode = audioContext.createGain();

			oscillator.connect(gainNode);
			gainNode.connect(audioContext.destination);

			oscillator.type = "triangle";
			oscillator.frequency.value = frequency;

			const startTime = audioContext.currentTime + index * 0.15;
			const duration = 0.3;

			gainNode.gain.setValueAtTime(0, startTime);
			gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
			gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

			oscillator.start(startTime);
			oscillator.stop(startTime + duration);
		});
	} catch (error) {
		console.warn("Audio not supported:", error);
	}
};

// Tie game sound
const playTieSound = () => {
	const audioContext = createAudioContext();
	if (!audioContext) {
		return;
	}

	try {
		// Create a "womp womp" descending sound
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();

		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		oscillator.type = "sawtooth";
		oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
		oscillator.frequency.exponentialRampToValueAtTime(
			100,
			audioContext.currentTime + 0.5,
		);

		gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(
			0.01,
			audioContext.currentTime + 0.5,
		);

		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.5);
	} catch (error) {
		console.warn("Audio not supported:", error);
	}
};

// Game over fanfare (tududum!)
const playGameOverFanfare = () => {
	const audioContext = createAudioContext();
	if (!audioContext) {
		return;
	}

	try {
		// Create dramatic fanfare with chords
		const chords = [
			[261.63, 329.63, 392.0], // C major chord
			[293.66, 369.99, 440.0], // D minor chord
			[329.63, 415.3, 493.88], // E minor chord
			[349.23, 440.0, 523.25], // F major chord
			[392.0, 493.88, 587.33], // G major chord
			[523.25, 659.25, 783.99], // C major octave higher for finale
		];

		chords.forEach((chord, chordIndex) => {
			chord.forEach((frequency, noteIndex) => {
				const oscillator = audioContext.createOscillator();
				const gainNode = audioContext.createGain();

				oscillator.connect(gainNode);
				gainNode.connect(audioContext.destination);

				oscillator.type = noteIndex === 0 ? "triangle" : "sine";
				oscillator.frequency.value = frequency;

				const startTime = audioContext.currentTime + chordIndex * 0.4;
				const duration = chordIndex === chords.length - 1 ? 0.8 : 0.4; // Longer for final chord

				gainNode.gain.setValueAtTime(0, startTime);
				gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
				gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

				oscillator.start(startTime);
				oscillator.stop(startTime + duration);
			});
		});
	} catch (error) {
		console.warn("Audio not supported:", error);
	}
};

const App: FC = () => {
	const initialLocalBoards = (): LocalBoardState[] =>
		Array(9)
			.fill(null)
			.map(() =>
				Array(3)
					.fill(null)
					.map(() => Array(3).fill(null)),
			);
	const initialGlobalBoard = (): GlobalBoardState => Array(9).fill(null);

	const [localBoards, setLocalBoards] = useState<LocalBoardState[]>(
		initialLocalBoards(),
	);
	const [globalBoard, setGlobalBoard] = useState<GlobalBoardState>(
		initialGlobalBoard(),
	);
	const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.Cat);
	const [activeLocalBoard, setActiveLocalBoard] = useState<number | null>(null);
	const [gameState, setGameState] = useState<GameState>(GameState.InProgress);
	const [scores, setScores] = useState<{ [key in Player]: number }>({
		[Player.Cat]: 0,
		[Player.Dog]: 0,
	});
	const [isMuted, setIsMuted] = useState<boolean>(false);

	const checkWinner = (board: CellValue[][]): Player | "TIE" | null => {
		const lines = [
			[board[0][0], board[0][1], board[0][2]],
			[board[1][0], board[1][1], board[1][2]],
			[board[2][0], board[2][1], board[2][2]],
			[board[0][0], board[1][0], board[2][0]],
			[board[0][1], board[1][1], board[2][1]],
			[board[0][2], board[1][2], board[2][2]],
			[board[0][0], board[1][1], board[2][2]],
			[board[0][2], board[1][1], board[2][0]],
		];
		for (const line of lines) {
			if (line[0] && line[0] === line[1] && line[1] === line[2]) return line[0];
		}
		if (board.flat().every((cell) => cell !== null)) return "TIE";
		return null;
	};

	const checkGlobalWinner = (
		board: GlobalBoardState,
	): Player | "TIE" | null => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8], // rows
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8], // columns
			[0, 4, 8],
			[2, 4, 6], // diagonals
		];
		for (const line of lines) {
			const [a, b, c] = line;
			if (
				board[a] &&
				board[a] !== "TIE" &&
				board[a] === board[b] &&
				board[a] === board[c]
			) {
				return board[a] as Player;
			}
		}
		if (board.every((cell) => cell !== null)) return "TIE";
		return null;
	};

	const handleCellClick = (
		globalIndex: number,
		localRow: number,
		localCol: number,
	) => {
		if (
			gameState !== GameState.InProgress ||
			(activeLocalBoard !== null && activeLocalBoard !== globalIndex) ||
			localBoards[globalIndex][localRow][localCol] ||
			globalBoard[globalIndex]
		) {
			return;
		}

		const newLocalBoards = localBoards.map((board) =>
			board.map((row) => [...row]),
		);
		newLocalBoards[globalIndex][localRow][localCol] = currentPlayer;
		setLocalBoards(newLocalBoards);

		// Přehrání zvuku podle aktuálního hráče (pokud není muted)
		if (!isMuted) {
			if (currentPlayer === Player.Cat) {
				playCatSound();
			} else {
				playDogSound();
			}
		}

		const localWinner = checkWinner(newLocalBoards[globalIndex]);
		const newGlobalBoard = [...globalBoard];
		if (localWinner) {
			newGlobalBoard[globalIndex] = localWinner;
			setGlobalBoard(newGlobalBoard);
		}

		const globalWinner = checkGlobalWinner(newGlobalBoard);
		if (globalWinner) {
			if (globalWinner === Player.Cat) {
				setGameState(GameState.Cat_WINS);
				setScores((s) => ({ ...s, [Player.Cat]: s[Player.Cat] + 1 }));
				if (!isMuted) {
					setTimeout(() => playVictorySound(), 500);
					setTimeout(() => playGameOverFanfare(), 1000);
				}
			} else if (globalWinner === Player.Dog) {
				setGameState(GameState.Dog_WINS);
				setScores((s) => ({ ...s, [Player.Dog]: s[Player.Dog] + 1 }));
				if (!isMuted) {
					setTimeout(() => playVictorySound(), 500);
					setTimeout(() => playGameOverFanfare(), 1000);
				}
			} else {
				setGameState(GameState.TIE);
				if (!isMuted) {
					setTimeout(() => playTieSound(), 500);
				}
			}
		} else {
			const nextLocalBoardIndex = localRow * 3 + localCol;
			if (newGlobalBoard[nextLocalBoardIndex]) {
				setActiveLocalBoard(null);
			} else {
				setActiveLocalBoard(nextLocalBoardIndex);
			}
			setCurrentPlayer(currentPlayer === Player.Cat ? Player.Dog : Player.Cat);
		}
	};

	const handleNewGame = () => {
		setLocalBoards(initialLocalBoards());
		setGlobalBoard(initialGlobalBoard());
		setCurrentPlayer(Player.Cat);
		setActiveLocalBoard(null);
		setGameState(GameState.InProgress);
	};

	const getStatusMessage = () => {
		const playerName = currentPlayer === Player.Cat ? "Kočička" : "Pejsek";
		switch (gameState) {
			case GameState.Cat_WINS:
				return "Kočička vyhrála!";
			case GameState.Dog_WINS:
				return "Pejsek vyhrál!";
			case GameState.TIE:
				return "Remíza!";
			default:
				return `Na tahu je ${playerName}`;
		}
	};

	return (
		<div className="bg-indigo-700 min-h-screen text-white font-sans flex flex-col items-center justify-center p-4">
			<header className="text-center mb-6">
				<h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-md">
					Ultimate Tic Tac Toe
				</h1>
				<div className="mt-4 p-3 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg w-full max-w-md mx-auto">
					<p
						className={`text-2xl font-bold transition-colors duration-300 ${PLAYER_COLORS[currentPlayer].text}`}
					>
						{getStatusMessage()}
					</p>
					<div className="mt-2 text-lg font-medium text-slate-700 flex justify-center items-center space-x-4">
						<span className={`${PLAYER_COLORS[Player.Cat].text} font-semibold`}>
							Kočička: {scores[Player.Cat]}
						</span>
						<span className="text-slate-400">|</span>
						<span className={`${PLAYER_COLORS[Player.Dog].text} font-semibold`}>
							Pejsek: {scores[Player.Dog]}
						</span>
					</div>
				</div>
			</header>

			<main className="w-full max-w-2xl mx-auto">
				<Board
					localBoards={localBoards}
					globalBoard={globalBoard}
					activeLocalBoard={activeLocalBoard}
					onCellClick={handleCellClick}
					currentPlayer={currentPlayer}
					gameState={gameState}
				/>
			</main>

			<footer className="mt-6 flex flex-col items-center space-y-4">
				<div className="flex space-x-4">
					<button
						type="button"
						onClick={() => setIsMuted(!isMuted)}
						className={`px-6 py-3 font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 ${
							isMuted
								? "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400"
								: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-400"
						}`}
					>
						{isMuted ? "🔇 Zvuky vypnuty" : "🔊 Zvuky zapnuty"}
					</button>
					<button
						type="button"
						onClick={handleNewGame}
						className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-lg hover:bg-pink-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 active:scale-95"
					>
						Nová hra
					</button>
				</div>
				{isMuted && (
					<p className="text-sm text-yellow-200 animate-pulse">
						💡 Zvuky jsou vypnuty - klikni na tlačítko pro jejich zapnutí!
					</p>
				)}
			</footer>
		</div>
	);
};

export default App;
