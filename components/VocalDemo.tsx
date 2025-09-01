
import React, { useState, useEffect } from 'react';
import type { SongData } from '../types';
import { PlayIcon, StopIcon } from './icons';

interface VocalDemoProps {
  songData: SongData | null;
}

const VocalDemo: React.FC<VocalDemoProps> = ({ songData }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        // Try to set a default English voice
        const defaultVoice = availableVoices.find(voice => voice.lang.includes('en'));
        setSelectedVoiceURI(defaultVoice?.voiceURI);
      }
    };

    // Voices are loaded asynchronously
    if ('onvoiceschanged' in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    loadVoices(); // Initial call
  }, []);

  const handlePlay = () => {
    if (!songData || isPlaying) return;

    const fullLyricsText = Object.values(songData.lyrics).join('. ');
    const utterance = new SpeechSynthesisUtterance(fullLyricsText);
    const selectedVoice = voices.find(v => v.voiceURI === selectedVoiceURI);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.lang = songData.language.split('-')[0] || 'en'; // Use base language
    utterance.pitch = 1;
    utterance.rate = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.cancel(); // Clear any previous utterances
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };
  
  const languageVoices = voices.filter(v => songData?.language ? v.lang.startsWith(songData.language.split('-')[0]) : true);

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-white">Vocal Demo</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label htmlFor="voice" className="block text-sm font-medium text-slate-400 mb-1">Voice</label>
          <select 
            id="voice" 
            value={selectedVoiceURI} 
            onChange={(e) => setSelectedVoiceURI(e.target.value)} 
            disabled={!songData || voices.length === 0}
            className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-teal-500"
          >
            {languageVoices.length > 0 ? languageVoices.map(voice => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.name} ({voice.lang})
              </option>
            )) : <option>No voices available for {songData?.language}</option>}
          </select>
        </div>
        <div className="flex gap-2">
          {!isPlaying ? (
            <button onClick={handlePlay} disabled={!songData} className="w-full flex justify-center items-center bg-teal-600 hover:bg-teal-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors">
              <PlayIcon /> Play Demo
            </button>
          ) : (
            <button onClick={handleStop} className="w-full flex justify-center items-center bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              <StopIcon /> Stop
            </button>
          )}
        </div>
      </div>
       <p className="text-xs text-slate-500 mt-4 text-center">Vocal demo uses your browser's built-in text-to-speech engine. Voice availability may vary.</p>
    </div>
  );
};

export default VocalDemo;
