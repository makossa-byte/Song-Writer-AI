import React from 'react';
import type { SongData } from '../types';
import { DownloadIcon, SaveIcon } from './icons';

interface LyricsDisplayProps {
  songData: SongData;
  onSave: () => void;
}

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ songData, onSave }) => {
  const { title, genre, mood, language, lyrics } = songData;

  const fullLyricsText = Object.entries(lyrics)
    .filter(([key]) => key !== 'rhymeScheme')
    .map(([key, value]) => {
      const scheme = lyrics.rhymeScheme?.[key as keyof typeof lyrics.rhymeScheme];
      return `[${key.charAt(0).toUpperCase() + key.slice(1)}${scheme ? ` (${scheme})` : ''}]\n${value}`;
    })
    .join('\n\n');

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleExportTxt = () => {
    const fileName = `${title.replace(/\s+/g, '_')}_lyrics.txt`;
    downloadFile(fullLyricsText, fileName, 'text/plain');
  };

  const handleExportJson = () => {
    const fileName = `${title.replace(/\s+/g, '_')}_song_data.json`;
    downloadFile(JSON.stringify(songData, null, 2), fileName, 'application/json');
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-slate-700 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-slate-400">
            <span className="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">Genre: {genre}</span>
            <span className="bg-teal-500/20 text-teal-300 px-2 py-1 rounded">Mood: {mood}</span>
            <span className="bg-slate-500/20 text-slate-300 px-2 py-1 rounded">Language: {language}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
           <button onClick={onSave} className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
             <SaveIcon /> Save
           </button>
           <button onClick={handleExportTxt} className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
             <DownloadIcon /> TXT
           </button>
           <button onClick={handleExportJson} className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
             <DownloadIcon /> JSON
           </button>
        </div>
      </div>
      
      <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap max-h-[50vh] overflow-y-auto pr-2">
        {Object.entries(lyrics)
          .filter(([part, text]) => part !== 'rhymeScheme' && text)
          .map(([part, text]) => {
            const scheme = lyrics.rhymeScheme?.[part as keyof typeof lyrics.rhymeScheme];
            return (
              <div key={part} className="mb-4">
                <h3 className="font-bold text-teal-400 capitalize">
                  {part}
                  {scheme && <span className="text-sm font-normal text-slate-400 ml-2">({scheme})</span>}
                </h3>
                <p>{text as string}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LyricsDisplay;
