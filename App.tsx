import React, { useState, useCallback, useEffect } from 'react';
import type { SongData, ChordProgression, Project } from './types';
import { generateSongwritingAssets } from './services/geminiService';
import { generateMidiData } from './services/musicService';
import * as projectStorage from './services/projectStorageService';

import Header from './components/Header';
import PromptInput from './components/PromptInput';
import LyricsDisplay from './components/LyricsDisplay';
import MusicPlayer from './components/MusicPlayer';
import VocalDemo from './components/VocalDemo';
import Loader from './components/Loader';
import SavedProjects from './components/SavedProjects';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [songData, setSongData] = useState<SongData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMusicLoading, setIsMusicLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [tempo, setTempo] = useState<number>(120);
  const [musicKey, setMusicKey] = useState<string>('C Major');
  const [chordProgression, setChordProgression] = useState<ChordProgression>('melody');
  
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(projectStorage.getProjects());
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setSongData(null);

    try {
      const data = await generateSongwritingAssets(prompt);
      setSongData(data);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  const handleGenerateMusicAndExport = useCallback(async () => {
    if (!songData) return;

    setIsMusicLoading(true);
    setError(null);

    try {
      const midiBase64 = await generateMidiData(tempo, musicKey, chordProgression);
      
      const byteCharacters = atob(midiBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'audio/midi' });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${songData.title.replace(/\s+/g, '_')}.mid`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (err: any) {
      setError('Failed to generate music. Please try again.');
      console.error(err);
    } finally {
      setIsMusicLoading(false);
    }
  }, [songData, tempo, musicKey, chordProgression]);

  const handleSaveProject = useCallback(() => {
    if (!songData) return;

    const newProject: Project = {
      id: crypto.randomUUID(),
      songData,
      tempo,
      musicKey,
      chordProgression,
      savedAt: new Date().toISOString(),
    };
    const updatedProjects = projectStorage.saveProject(newProject);
    setProjects(updatedProjects);
  }, [songData, tempo, musicKey, chordProgression]);
  
  const handleLoadProject = useCallback((id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
        setSongData(project.songData);
        setTempo(project.tempo);
        setMusicKey(project.musicKey);
        setChordProgression(project.chordProgression);
        setPrompt(''); // Clear prompt to avoid confusion
    }
  }, [projects]);

  const handleDeleteProject = useCallback((id: string) => {
      const updatedProjects = projectStorage.deleteProject(id);
      setProjects(updatedProjects);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          
          <SavedProjects projects={projects} onLoad={handleLoadProject} onDelete={handleDeleteProject} />

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">
              <strong>Error:</strong> {error}
            </div>
          )}

          {isLoading && <Loader />}
          
          {songData && (
            <div className="space-y-6">
              <LyricsDisplay songData={songData} onSave={handleSaveProject} />
              <MusicPlayer 
                tempo={tempo} 
                setTempo={setTempo} 
                musicKey={musicKey} 
                setMusicKey={setMusicKey}
                chordProgression={chordProgression}
                setChordProgression={setChordProgression}
                onGenerate={handleGenerateMusicAndExport}
                isGenerating={isMusicLoading}
              />
              <VocalDemo songData={songData} />
            </div>
          )}
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Google Gemini. Designed by a world-class AI engineer.</p>
      </footer>
    </div>
  );
};

export default App;
