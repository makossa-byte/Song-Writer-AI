import type { ChordProgression } from "../types";

/**
 * Simulates generating MIDI data based on tempo, key, and chord progression.
 * In a real application, this would involve a more complex music generation library
 * like Magenta.js or a backend service call.
 * 
 * @param tempo - The beats per minute of the music.
 * @param key - The musical key.
 * @param progression - The selected chord progression type.
 * @returns A promise that resolves to a base64 encoded string representing a dummy MIDI file.
 */
export const generateMidiData = async (tempo: number, key: string, progression: ChordProgression): Promise<string> => {
  console.log(`Generating music with Tempo: ${tempo} BPM, Key: ${key}, Progression: ${progression}`);

  // Simulate a network request or heavy computation
  await new Promise(resolve => setTimeout(resolve, 2500));

  // Base64 representation of a very simple MIDI file with a few melody notes in C Major.
  const melodyOnlyMidiBase64 = "TVRoZAAAAAYAAQACAGRNVHJrAAAAGwD/AQMAD1IB/wUlPHQA/wUyRQCAPACRRoA8AAABAJA9ADwAAAEAkEMAPAAASQCQQwA8AABJAJBDAEEAAEAA/y0=";
  
  // Base64 representation of a simple MIDI file with a melody and a basic I-IV-V chord progression.
  const melodyWithChordsMidiBase64 = "TVRoZAAAAAYAAQACAGRNVHJrAAAAQwD/AQMDUgD/BSVAAP8FWwMACQBEAEYAgQSQRAA8AABGAEEAAJA+ADwAAEEAAEJEAEQAAEYAAJA/ADwAAEEAAJCBAEEA/y0ATVRyawAAACIA/wFDAwAAQACQPAA8AACQQAA8AACQQgA8AAD/LQA=";
  
  const midiData = progression === 'chords' ? melodyWithChordsMidiBase64 : melodyOnlyMidiBase64;

  console.log(`Dummy MIDI data generated for: ${progression}`);
  return midiData;
};