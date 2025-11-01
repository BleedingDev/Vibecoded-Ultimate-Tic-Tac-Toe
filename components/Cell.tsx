import React from 'react';
import { CellValue, Player } from '../types';
import { PLAYER_COLORS } from '../constants';
import { CatIcon, DogIcon } from './Icons';

interface CellProps {
    value: CellValue;
    onClick: () => void;
    isClickable: boolean;
    currentPlayer: Player;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isClickable, currentPlayer }) => {
    const hoverClass = isClickable 
        ? `hover:bg-opacity-80 ${PLAYER_COLORS[currentPlayer].bg} hover:scale-105`
        : '';
    
    return (
        <div
            onClick={isClickable ? onClick : undefined}
            className={`aspect-square flex items-center justify-center p-2 text-4xl md:text-5xl font-bold rounded-md transition-all duration-200
                ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                ${value ? 'bg-white/80' : 'bg-white/40'}
                ${hoverClass}
            `}
        >
            {value && (
                <div className="w-full h-full animate-bounce-in p-1">
                    {value === Player.Cat ? <CatIcon /> : <DogIcon />}
                </div>
            )}
        </div>
    );
};

export default Cell;