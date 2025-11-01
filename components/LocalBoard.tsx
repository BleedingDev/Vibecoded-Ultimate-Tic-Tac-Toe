import React from 'react';
import Cell from './Cell';
import { LocalBoardState, Player } from '../types';
import { PLAYER_COLORS } from '../constants';
import { CatIcon, DogIcon } from './Icons';

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
    const activeHighlightClass = isGameActive && isActive ? `bg-lime-300/80 ring-4 ring-lime-400 ${PLAYER_COLORS[currentPlayer].shadow}` : 'bg-white/30';

    const winnerBgClass = winner && winner !== 'TIE' ? PLAYER_COLORS[winner].winnerBg : '';

    return (
        <div className={`relative aspect-square grid grid-cols-3 grid-rows-3 gap-1 p-1 rounded-lg transition-all duration-300 ${winner ? winnerBgClass : activeHighlightClass}`}>
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
                <div className="absolute inset-0 flex items-center justify-center p-2 pointer-events-none animate-scale-in">
                    {winner === 'TIE' ? (
                         <span className="text-8xl md:text-9xl font-bold text-slate-500 opacity-60">
                            -
                        </span>
                    ) : (
                        <div className="w-full h-full opacity-50">
                            {winner === Player.Cat ? <CatIcon /> : <DogIcon />}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LocalBoard;