
import React from 'react';
import { CellValue, Player } from '../types';
import { PLAYER_COLORS } from '../constants';

interface CellProps {
    value: CellValue;
    onClick: () => void;
    isClickable: boolean;
    currentPlayer: Player;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isClickable, currentPlayer }) => {
    const hoverClass = isClickable 
        ? `hover:bg-opacity-80 ${PLAYER_COLORS[currentPlayer].bg}`
        : '';
    
    const valueClass = value ? PLAYER_COLORS[value].text : '';

    return (
        <div
            onClick={isClickable ? onClick : undefined}
            className={`aspect-square flex items-center justify-center text-4xl md:text-5xl font-bold rounded-sm transition-colors duration-200
                ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                ${value ? 'bg-slate-300' : 'bg-slate-100'}
                ${hoverClass}
            `}
        >
            {value && (
                <span className={`animate-fade-in ${valueClass}`}>
                    {value}
                </span>
            )}
        </div>
    );
};

export default Cell;
