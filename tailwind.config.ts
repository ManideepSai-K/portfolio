import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'retro-green': '#00ff41',
        'retro-black': '#0a0a0a',
        'phosphor-amber': '#ffb000',
      },
      fontFamily: {
        mono: ['VT323', 'monospace'],
      },
      keyframes: {
        flicker: {
          '0%': { opacity: '0.97' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.98' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        flicker: 'flicker 0.15s infinite',
        blink: 'blink 1s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
