import { GoogleGenAI, Type } from "@google/genai";
import type { SongData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A creative and fitting title for the song." },
    genre: { type: Type.STRING, description: "The most suitable musical genre (e.g., Pop, Rock, R&B, Afrobeat, Folk)." },
    mood: { type: Type.STRING, description: "The primary mood or emotion of the song (e.g., Joyful, Melancholic, Romantic, Intense)." },
    language: { type: Type.STRING, description: "The language of the lyrics, identified from the prompt." },
    lyrics: {
      type: Type.OBJECT,
      description: "The song lyrics, structured into parts, including the rhyme scheme for each part.",
      properties: {
        verse1: { type: Type.STRING },
        chorus: { type: Type.STRING },
        verse2: { type: Type.STRING },
        bridge: { type: Type.STRING },
        outro: { type: Type.STRING },
        rhymeScheme: {
          type: Type.OBJECT,
          description: "The rhyme scheme for each corresponding lyric section (e.g., AABB, ABAB).",
          properties: {
            verse1: { type: Type.STRING },
            chorus: { type: Type.STRING },
            verse2: { type: Type.STRING },
            bridge: { type: Type.STRING },
            outro: { type: Type.STRING }
          },
          required: ["verse1", "chorus", "verse2", "bridge", "outro"]
        }
      },
      required: ["verse1", "chorus", "verse2", "bridge", "outro", "rhymeScheme"]
    }
  },
  required: ["title", "genre", "mood", "language", "lyrics"]
};

export const generateSongwritingAssets = async (prompt: string): Promise<SongData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Act as an expert multilingual songwriter. Analyze the following prompt to determine the theme, language, mood, and genre. Then, write a complete song with a title and structured lyrics (Verse 1, Chorus, Verse 2, Bridge, Outro). For each lyric section, also provide its rhyme scheme (e.g., AABB, ABAB).

Prompt: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const songData: SongData = JSON.parse(jsonText);
    return songData;

  } catch (error) {
    console.error("Error generating songwriting assets:", error);
    throw new Error("Failed to generate content from Gemini API. Check console for details.");
  }
};
