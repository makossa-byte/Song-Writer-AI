export type ChordProgression = 'melody' | 'chords';

export interface Lyrics {
  verse1: string;
  chorus: string;
  verse2: string;
  bridge: string;
  outro: string;
  rhymeScheme: {
    verse1: string;
    chorus: string;
    verse2: string;
    bridge: string;
    outro: string;
  };
}

export interface SongData {
  title: string;
  lyrics: Lyrics;
  genre: string;
  mood: string;
  language: string;
}

export interface Project {
  id: string;
  songData: SongData;
  tempo: number;
  musicKey: string;
  chordProgression: ChordProgression;
  savedAt: string; // ISO string date
}
