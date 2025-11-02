import React, { useState, useEffect } from 'react';
import { Player, GameState, CellValue, LocalBoardState, GlobalBoardState } from './types';
import { PLAYER_COLORS } from './constants';
import Board from './components/Board';

const App: React.FC = () => {
    const initialLocalBoards = (): LocalBoardState[] => Array(9).fill(null).map(() => 
        Array(3).fill(null).map(() => Array(3).fill(null))
    );
    const initialGlobalBoard = (): GlobalBoardState => Array(9).fill(null);

    const [localBoards, setLocalBoards] = useState<LocalBoardState[]>(initialLocalBoards);
    const [globalBoard, setGlobalBoard] = useState<GlobalBoardState>(initialGlobalBoard);
    const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.Cat);
    const [activeLocalBoard, setActiveLocalBoard] = useState<number | null>(null);
    const [gameState, setGameState] = useState<GameState>(GameState.InProgress);
    const [scores, setScores] = useState<{ [key in Player]: number }>({ [Player.Cat]: 0, [Player.Dog]: 0 });

    const checkWinner = (board: CellValue[][]): Player | 'TIE' | null => {
        const lines = [
            [board[0][0], board[0][1], board[0][2]], [board[1][0], board[1][1], board[1][2]], [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][0], board[2][0]], [board[0][1], board[1][1], board[2][1]], [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]], [board[0][2], board[1][1], board[2][0]],
        ];
        for (const line of lines) {
            if (line[0] && line[0] === line[1] && line[1] === line[2]) return line[0];
        }
        if (board.flat().every(cell => cell !== null)) return 'TIE';
        return null;
    };

    const checkGlobalWinner = (board: GlobalBoardState): Player | 'TIE' | null => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        for (const line of lines) {
            const [a, b, c] = line;
            if (board[a] && board[a] !== 'TIE' && board[a] === board[b] && board[a] === board[c]) {
                return board[a] as Player;
            }
        }
        if (board.every(cell => cell !== null)) return 'TIE';
        return null;
    };

    const handleCellClick = (globalIndex: number, localRow: number, localCol: number) => {
        if (gameState !== GameState.InProgress || 
            (activeLocalBoard !== null && activeLocalBoard !== globalIndex) || 
            localBoards[globalIndex][localRow][localCol] || 
            globalBoard[globalIndex]) {
            return;
        }

        const newLocalBoards = localBoards.map(board => board.map(row => [...row]));
        newLocalBoards[globalIndex][localRow][localCol] = currentPlayer;
        setLocalBoards(newLocalBoards);

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
                setScores(s => ({ ...s, [Player.Cat]: s[Player.Cat] + 1 }));
            } else if (globalWinner === Player.Dog) {
                setGameState(GameState.Dog_WINS);
                setScores(s => ({ ...s, [Player.Dog]: s[Player.Dog] + 1 }));
            } else {
                setGameState(GameState.TIE);
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
        const playerName = currentPlayer === Player.Cat ? 'Kočička' : 'Pejsek';
        switch (gameState) {
            case GameState.Cat_WINS: return 'Kočička vyhrála!';
            case GameState.Dog_WINS: return 'Pejsek vyhrál!';
            case GameState.TIE: return 'Remíza!';
            default: return `Na tahu je ${playerName}`;
        }
    };

    return (
        <div className="bg-indigo-700 min-h-screen text-white font-sans flex flex-col items-center justify-center p-4">
            <header className="text-center mb-6">
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-md">Ultimate Tic Tac Toe</h1>
                <div className="mt-4 p-3 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg w-full max-w-md mx-auto">
                    <p className={`text-2xl font-bold transition-colors duration-300 ${PLAYER_COLORS[currentPlayer].text}`}>
                        {getStatusMessage()}
                    </p>
                    <div className="mt-2 text-lg font-medium text-slate-700 flex justify-center items-center space-x-4">
                        <span className={`${PLAYER_COLORS[Player.Cat].text} font-semibold`}>Kočička: {scores[Player.Cat]}</span>
                        <span className="text-slate-400">|</span>
                        <span className={`${PLAYER_COLORS[Player.Dog].text} font-semibold`}>Pejsek: {scores[Player.Dog]}</span>
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
            
            <footer className="mt-6">
                <button 
                    onClick={handleNewGame} 
                    className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-lg hover:bg-pink-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 active:scale-95"
                >
                    Nová hra
                </button>
            </footer>
        </div>
    );
};

export default App;