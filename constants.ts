
import { Player } from './types';

export const PLAYER_COLORS: { [key in Player]: { text: string; border: string; bg: string; shadow: string } } = {
  [Player.X]: {
    text: 'text-blue-600',
    border: 'border-blue-600',
    bg: 'bg-blue-100',
    shadow: 'shadow-blue-500/50'
  },
  [Player.O]: {
    text: 'text-red-600',
    border: 'border-red-600',
    bg: 'bg-red-100',
    shadow: 'shadow-red-500/50'
  }
};
