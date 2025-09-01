
import React from 'react';
import { WandIcon } from './icons';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handleFileDrop = (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
            setPrompt(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
  };

  return (
    <div className="p-6 bg-slate-800 rounded-xl shadow-lg">
      <label htmlFor="prompt" className="block text-lg font-semibold mb-2 text-slate-300">
        Enter a theme, idea, or lyrics
      </label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        placeholder="e.g., 'A soulful Yoruba ballad about finding true love' or drag & drop a .txt file..."
        className="w-full h-32 p-3 bg-slate-900 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors duration-200 resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !prompt.trim()}
        className="mt-4 w-full flex items-center justify-center bg-teal-600 hover:bg-teal-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
      >
        <WandIcon />
        {isLoading ? 'Generating...' : 'Generate Song'}
      </button>
    </div>
  );
};

export default PromptInput;
