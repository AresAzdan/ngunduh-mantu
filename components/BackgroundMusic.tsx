"use client";

import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { Music2, Pause, Play } from "lucide-react";
import { MusicContext } from "./MusicContext";

const MUSIC_SRC = "/music/frieren.mp3";
const TARGET_VOLUME = 0.3;
const FADE_DURATION_MS = 3000;
const FADE_STEP_MS = 50;

type BackgroundMusicProps = {
  children: ReactNode;
};

export default function BackgroundMusic({ children }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const setPlaybackState = useCallback((playing: boolean) => {
    isPlayingRef.current = playing;
    setIsPlaying(playing);
  }, []);

  const clearFade = useCallback(() => {
    if (fadeIntervalRef.current !== null) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(MUSIC_SRC);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
      audioRef.current = audio;
    }

    return audioRef.current;
  }, []);

  const fadeToTargetVolume = useCallback(
    (audio: HTMLAudioElement) => {
      clearFade();

      const startVolume = audio.volume;
      const startedAt = window.performance.now();

      if (startVolume >= TARGET_VOLUME) {
        audio.volume = TARGET_VOLUME;
        return;
      }

      fadeIntervalRef.current = window.setInterval(() => {
        const elapsed = window.performance.now() - startedAt;
        const progress = Math.min(elapsed / FADE_DURATION_MS, 1);
        audio.volume = startVolume + (TARGET_VOLUME - startVolume) * progress;

        if (progress >= 1) {
          audio.volume = TARGET_VOLUME;
          clearFade();
        }
      }, FADE_STEP_MS);
    },
    [clearFade],
  );

  const play = useCallback(() => {
    const audio = ensureAudio();

    if (!audio.paused || isPlayingRef.current) {
      return;
    }

    void audio
      .play()
      .then(() => {
        setHasStarted(true);
        setPlaybackState(true);
        fadeToTargetVolume(audio);
      })
      .catch(() => {
        setPlaybackState(false);
      });
  }, [ensureAudio, fadeToTargetVolume, setPlaybackState]);

  const pause = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    clearFade();
    audio.pause();
    setPlaybackState(false);
  }, [clearFade, setPlaybackState]);

  const toggle = useCallback(() => {
    if (isPlayingRef.current) {
      pause();
      return;
    }

    play();
  }, [pause, play]);

  const contextValue = useMemo(
    () => ({
      play,
      pause,
      toggle,
      isPlaying,
    }),
    [isPlaying, pause, play, toggle],
  );

  return (
    <MusicContext.Provider value={contextValue}>
      {children}

      {hasStarted && (
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
          aria-pressed={isPlaying}
          className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#A6842E]/60 bg-[#10260D] text-[#A6842E] shadow-[0_12px_32px_rgba(16,38,13,0.35),0_0_20px_rgba(166,132,46,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C2A34F] hover:text-[#C2A34F] focus:outline-none focus:ring-2 focus:ring-[#A6842E]/70 focus:ring-offset-2 focus:ring-offset-[#F6F8F6] ${
            isPlaying ? "ring-1 ring-[#A6842E]/50" : "opacity-80"
          }`}
        >
          <span className="absolute inset-1 rounded-full border border-[#A6842E]/20" />
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-[#A6842E]/10 animate-ping" />
          )}
          <span className="relative z-10">
            {isPlaying ? <Pause size={22} /> : <Play size={22} fill="currentColor" />}
          </span>
          <Music2
            size={12}
            className={`absolute right-2 top-2 transition-opacity ${
              isPlaying ? "opacity-80" : "opacity-35"
            }`}
          />
        </button>
      )}
    </MusicContext.Provider>
  );
}
