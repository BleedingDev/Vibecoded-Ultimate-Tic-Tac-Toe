
import React from 'react';
import LocalBoard from './LocalBoard';
import { LocalBoardState, GlobalBoardState, Player, GameState } from '../types';

interface BoardProps {
    localBoards: LocalBoardState[];
    globalBoard: GlobalBoardState;
    activeLocalBoard: number | null;
    onCellClick: (globalIndex: number, localRow: number, localCol: number) => void;
    currentPlayer: Player;
    gameState: GameState;
}

const Board: React.FC<BoardProps> = ({ localBoards, globalBoard, activeLocalBoard, onCellClick, currentPlayer, gameState }) => {
    return (
        <div className="aspect-square grid grid-cols-3 grid-rows-3 gap-2 p-2 bg-slate-800 rounded-xl shadow-2xl">
            {localBoards.map((boardData, index) => (
                <LocalBoard
                    key={index}
                    boardData={boardData}
                    globalIndex={index}
                    winner={globalBoard[index]}
                    isActive={activeLocalBoard === index || (activeLocalBoard === null && !globalBoard[index])}
                    onCellClick={onCellClick}
                    currentPlayer={currentPlayer}
                    isGameActive={gameState === GameState.InProgress}
                />
            ))}
        </div>
    );
};

export default Board;
