import { Player } from './types';

export const PLAYER_COLORS: { [key in Player]: { text: string; border: string; bg: string; shadow: string; winnerBg: string; } } = {
  [Player.Cat]: {
    text: 'text-amber-500',
    border: 'border-amber-500',
    bg: 'bg-amber-100',
    shadow: 'shadow-amber-400/50',
    winnerBg: 'bg-amber-400/50'
  },
  [Player.Dog]: {
    text: 'text-teal-500',
    border: 'border-teal-500',
    bg: 'bg-teal-100',
    shadow: 'shadow-teal-400/50',
    winnerBg: 'bg-teal-400/50'
  }
};