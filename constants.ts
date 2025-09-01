import type { ChordProgression } from "./types";

export const TEMPOS = [60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
export const KEYS = [
  "C Major", "G Major", "D Major", "A Major", "E Major",
  "A Minor", "E Minor", "B Minor", "F# Minor", "C# Minor"
];

export const CHORD_PROGRESSIONS: { value: ChordProgression, label: string }[] = [
    { value: 'melody', label: 'Melody Only' },
    { value: 'chords', label: 'Melody + Chords (I-IV-V)' },
];