"use client";

import { createContext, useContext } from "react";

export type MusicContextValue = {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  isPlaying: boolean;
};

export const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error("useMusic must be used within BackgroundMusic");
  }

  return context;
}
