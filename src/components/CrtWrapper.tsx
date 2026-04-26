
'use client';

import { ReactNode } from 'react';

export default function CrtWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/10] bg-[#020202] rounded-[2rem] border-[16px] md:border-[32px] border-[#050505] shadow-[0_24px_70px_rgba(0,0,0,0.9)] flex items-center justify-center p-2 md:p-4">
      <div className="relative h-full w-full bg-[#010101] rounded-xl overflow-hidden shadow-[inset_0_0_90px_rgba(0,0,0,0.95)] border border-[#0a0a0a]">
        <div className="absolute inset-0 z-10 animate-[flicker_0.15s_infinite]">
          {children}
        </div>

        <div className="crt-overlay" />
        <div className="crt-vignette" />

        <div className="absolute top-0 left-0 w-full h-[5px] bg-green-500/5 z-40 animate-[scanline_8s_linear_infinite] pointer-events-none" />
      </div>
    </div>
  );
}
