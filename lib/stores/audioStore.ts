import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AudioState {
  isPlaying: boolean;
  volume: number;
  togglePlay: () => void;
  setVolume: (vol: number) => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      isPlaying: false,
      volume: 0.5,
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      setVolume: (vol) => set({ volume: vol }),
    }),
    {
      name: 'lotos-audio-storage',
    }
  )
);
