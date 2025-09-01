import type { Project } from '../types';

const STORAGE_KEY = 'songwriterAiProjects';

export const getProjects = (): Project[] => {
  try {
    const projectsJson = localStorage.getItem(STORAGE_KEY);
    return projectsJson ? JSON.parse(projectsJson) : [];
  } catch (error) {
    console.error("Failed to parse projects from localStorage", error);
    return [];
  }
};

export const saveProject = (project: Project): Project[] => {
  const projects = getProjects();
  const existingIndex = projects.findIndex(p => p.id === project.id);

  if (existingIndex > -1) {
    projects[existingIndex] = project; // Update existing project
  } else {
    projects.unshift(project); // Add new project to the beginning
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to save projects to localStorage", error);
  }
  return projects;
};

export const deleteProject = (projectId: string): Project[] => {
  let projects = getProjects();
  projects = projects.filter(p => p.id !== projectId);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to delete project from localStorage", error);
  }
  return projects;
};
