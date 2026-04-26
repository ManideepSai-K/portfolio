'use client';

import { useState, KeyboardEvent, useRef, useEffect, ReactNode } from 'react';
import { parseInput } from '../core/compiler/parser';

interface HistoryLine {
  id: number;
  text?: string;
  type: 'input' | 'output' | 'system' | 'component';
  component?: ReactNode;
}

const BOOT_SEQUENCE = [
  "Initializing K_MANIDEEP_SAI environment...",
  "Loading core modules: [React, FastAPI, Node.js, Python]... OK",
  "Mounting local LLM runtime (Ollama)... OK",
  "Establishing connection to Google Generative AI... OK",
  "Starting development server...",
  "Ready. Type 'help' to begin."
];

const fileSystem: Record<string, string[]> = {
  '~': ['about.txt', 'projects', 'contact.sh'],
  '~/projects': ['ingreedy.exe', 'healbuddy.sh', 'saralq.js'],
};

const PROJECTS = {
  './ingreedy.exe': {
    title: 'Ingreedy',
    description: 'Full-Stack AI Application for data processing.',
    tags: ['React/Vite', 'FastAPI', 'Google GenAI'],
  },
  './healbuddy.sh': {
    title: 'Healbuddy',
    description: 'ML/AI-Backed Web App for health predictions & Q&A.',
    tags: ['HTML/CSS/JS', 'FastAPI', 'Ollama LLM'],
  },
  './saralq.js': {
    title: 'Saralq',
    description: 'Developer Tooling & Browser Extension for translation & proxying.',
    tags: ['JavaScript', 'Node.js/Express', 'Chrome Extension'],
  },
} as const;

const HELP_TEXT =
  'Available commands: help, clear, whoami, ask <query>, ls, cd, ./ingreedy.exe, ./healbuddy.sh, ./saralq.js';

function getProjectCard(command: string): ReactNode {
  const project = PROJECTS[command as keyof typeof PROJECTS];
  return (
    <div className="border border-green-500 p-4 my-2 bg-green-900/20 max-w-lg">
      <h3 className="text-xl font-bold text-green-400 mb-2">{project.title}</h3>
      <p className="text-sm mb-2 text-green-500">{project.description}</p>
      <div className="flex gap-2 text-xs flex-wrap">
        {project.tags.map((tag) => (
          <span key={tag} className="bg-green-900/80 text-green-300 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Terminal() {
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const [currentPath, setCurrentPath] = useState('~');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Boot Sequence Effect
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let delay = 0;

    BOOT_SEQUENCE.forEach((text, index) => {
      delay += Math.random() * 400 + 200;
      const timeoutId = setTimeout(() => {
        setHistory((prev) => [...prev, { id: Date.now() + index, text, type: 'system' }]);
        if (index === BOOT_SEQUENCE.length - 1) {
          setIsBooting(false);
        }
      }, delay);
      timeouts.push(timeoutId);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const handleCommand = async (rawInput: string) => {
    if (!rawInput.trim() || isBooting) return;

    const pushText = (text: string, type: HistoryLine['type']) => {
      setHistory((prev) => [...prev, { id: Date.now(), text, type }]);
    };

    const pushComponent = (component: ReactNode) => {
      setHistory((prev) => [...prev, { id: Date.now(), type: 'component', component }]);
    };

    pushText(`guest@manideep:${currentPath}$ ${rawInput}`, 'input');
    setInput('');

    const { command, args } = parseInput(rawInput);

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    switch (command) {
      case 'ls':
        pushText((fileSystem[currentPath] || []).join('  '), 'output');
        break;

      case 'cd':
        if (!args[0] || args[0] === '~') {
          setCurrentPath('~');
        } else if (args[0] === 'projects' && currentPath === '~') {
          setCurrentPath('~/projects');
        } else if (args[0] === '..') {
          setCurrentPath('~');
        } else {
          pushText(`cd: ${args[0]}: No such file or directory`, 'output');
        }
        break;

      case 'help':
        pushText(HELP_TEXT, 'output');
        break;

      case 'whoami':
        pushText('K. Manideep Sai', 'output');
        break;

      case 'ask':
        const query = args.join(' ').trim();
        if (!query) {
          pushText('Usage: ask <your question>', 'output');
          return;
        }

        pushText('Searching knowledge base...', 'system');
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
          });
          const data = await res.json();
          pushText(data.reply, 'output');
        } catch (error) {
          pushText('Error connecting to RAG backend.', 'output');
        }
        break;

      default:
        if (command in PROJECTS) {
          if (currentPath !== '~/projects') {
            pushText('Command not found', 'output');
            return;
          }
          pushComponent(getProjectCard(command));
          return;
        }

        pushText(`Command not found: ${command}`, 'output');
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="crt-text font-mono absolute inset-0 flex flex-col p-4 md:p-8 overflow-hidden">
      <div className="flex-1 overflow-y-auto whitespace-pre-wrap no-scrollbar">
        {history.map((line) => (
          <div key={line.id} className={`${line.type === 'system' ? 'text-green-700' : ''} mb-2`}>
            {line.type === 'component' ? line.component : line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {!isBooting && (
        <div className="flex mt-2 items-center text-green-500">
          <span className="mr-2 text-green-400">guest@manideep</span>
          <span className="mr-2 text-green-600">:</span>
          <span className="mr-2 text-green-300">{currentPath}</span>
          <span className="mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent outline-none crt-text"
            autoFocus
          />
        </div>
      )}
    </div>
  );
}
