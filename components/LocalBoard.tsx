
import React from 'react';
import Cell from './Cell';
import { LocalBoardState, Player } from '../types';
import { PLAYER_COLORS } from '../constants';

interface LocalBoardProps {
    boardData: LocalBoardState;
    globalIndex: number;
    winner: Player | 'TIE' | null;
    isActive: boolean;
    onCellClick: (globalIndex: number, localRow: number, localCol: number) => void;
    currentPlayer: Player;
    isGameActive: boolean;
}

const LocalBoard: React.FC<LocalBoardProps> = ({ boardData, globalIndex, winner, isActive, onCellClick, currentPlayer, isGameActive }) => {
    const activeHighlightClass = isGameActive && isActive ? `bg-yellow-200/50 ring-2 ring-yellow-400 ${PLAYER_COLORS[currentPlayer].shadow}` : 'bg-slate-200';

    return (
        <div className={`relative aspect-square grid grid-cols-3 grid-rows-3 gap-1 rounded-md transition-all duration-300 ${winner ? 'bg-slate-300' : activeHighlightClass}`}>
            {boardData.flat().map((cellValue, index) => {
                const localRow = Math.floor(index / 3);
                const localCol = index % 3;
                return (
                    <Cell
                        key={index}
                        value={cellValue}
                        onClick={() => onCellClick(globalIndex, localRow, localCol)}
                        isClickable={isGameActive && isActive && !cellValue && !winner}
                        currentPlayer={currentPlayer}
                    />
                );
            })}
            {winner && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-scale-in">
                    {winner !== 'TIE' ? (
                        <span className={`text-8xl md:text-9xl font-bold opacity-60 ${PLAYER_COLORS[winner].text}`}>
                            {winner}
                        </span>
                    ) : (
                        <span className="text-5xl md:text-6xl font-bold text-slate-500 opacity-60">
                            -
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default LocalBoard;
