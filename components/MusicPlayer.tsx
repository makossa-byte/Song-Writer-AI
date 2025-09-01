import React from 'react';
import { KEYS, TEMPOS, CHORD_PROGRESSIONS } from '../constants';
import { DownloadIcon, MusicIcon } from './icons';
import type { ChordProgression } from '../types';

interface MusicPlayerProps {
    tempo: number;
    setTempo: (tempo: number) => void;
    musicKey: string;
    setMusicKey: (key: string) => void;
    chordProgression: ChordProgression;
    setChordProgression: (progression: ChordProgression) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({tempo, setTempo, musicKey, setMusicKey, chordProgression, setChordProgression, onGenerate, isGenerating}) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-white flex items-center"><MusicIcon /> Music & Beat Generation</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div>
          <label htmlFor="tempo" className="block text-sm font-medium text-slate-400 mb-1">Tempo (BPM)</label>
          <select id="tempo" value={tempo} onChange={(e) => setTempo(Number(e.target.value))} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-indigo-500">
            {TEMPOS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="key" className="block text-sm font-medium text-slate-400 mb-1">Key</label>
          <select id="key" value={musicKey} onChange={(e) => setMusicKey(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-indigo-500">
            {KEYS.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="progression" className="block text-sm font-medium text-slate-400 mb-1">Progression</label>
          <select id="progression" value={chordProgression} onChange={(e) => setChordProgression(e.target.value as ChordProgression)} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-indigo-500">
            {CHORD_PROGRESSIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>
        
        <div className="self-end">
            <button 
                onClick={onGenerate}
                disabled={isGenerating} 
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <DownloadIcon /> Export MIDI
                </>
              )}
            </button>
        </div>

      </div>
      <p className="text-xs text-slate-500 mt-4 text-center">Music generation is simulated. A dummy MIDI file with the selected progression will be exported.</p>
    </div>
  );
};

export default MusicPlayer;