import { create } from "zustand";
import { persist } from "zustand/middleware";
interface GreetingStore {
  greeted: boolean;
  setGreeted: () => void;
  reset: () => void;
}

export const useGreetingStore = create<GreetingStore>()(
  persist(
    (set) => ({
      greeted: false,
      setGreeted: () => set({ greeted: true }),
      reset: () => set({ greeted: false }),
    }),
    {
      name: "greeting-storage",
    },
  ),
);
