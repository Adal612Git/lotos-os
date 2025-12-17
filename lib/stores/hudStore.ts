import { create } from "zustand";

interface HudState {
  secretUnlocked: boolean;
  unlockSecret: () => void;
}

export const useHudStore = create<HudState>((set) => ({
  secretUnlocked: false,
  unlockSecret: () => set({ secretUnlocked: true }),
}));
