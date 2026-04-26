'use client';

import { useState, useCallback } from 'react';

/**
 * useFileSystem Hook
 * 
 * Manages virtual file system state:
 * - Current directory
 * - File listings
 * - Command history
 * - Navigation
 */

export interface FileSystemState {
  currentDirectory: string;
  files: string[];
  history: string[];
}

export function useFileSystem() {
  const [state, setState] = useState<FileSystemState>({
    currentDirectory: '/home/user',
    files: ['about.md', 'projects/', 'skills.md'],
    history: [],
  });

  const cd = useCallback((path: string) => {
    setState((prev) => ({
      ...prev,
      currentDirectory: path,
    }));
  }, []);

  const ls = useCallback(() => {
    return state.files;
  }, [state.files]);

  const addToHistory = useCallback((command: string) => {
    setState((prev) => ({
      ...prev,
      history: [...prev.history, command],
    }));
  }, []);

  return {
    ...state,
    cd,
    ls,
    addToHistory,
  };
}
