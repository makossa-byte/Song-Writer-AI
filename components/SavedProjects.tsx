import React from 'react';
import type { Project } from '../types';
import { TrashIcon } from './icons';

interface SavedProjectsProps {
  projects: Project[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
}

const SavedProjects: React.FC<SavedProjectsProps> = ({ projects, onLoad, onDelete }) => {
  if (projects.length === 0) {
    return null; // Don't render anything if there are no projects
  }

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-white">Saved Projects</h3>
      {projects.length > 0 ? (
        <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {projects.map((project) => (
            <li key={project.id} className="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-teal-300 truncate">{project.songData.title}</p>
                <p className="text-xs text-slate-400">
                  Saved: {new Date(project.savedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onLoad(project.id)}
                  className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-1 px-3 rounded-md transition-colors"
                  aria-label={`Load project ${project.songData.title}`}
                >
                  Load
                </button>
                <button
                  onClick={() => onDelete(project.id)}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  aria-label={`Delete project ${project.songData.title}`}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-400 text-center py-4">
          You have no saved projects. Click 'Save Project' after generating a song to save it here.
        </p>
      )}
    </div>
  );
};

export default SavedProjects;
