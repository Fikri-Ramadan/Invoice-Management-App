'use client';

import { ShieldCheck } from 'lucide-react';

export default function LoadingComp() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ShieldCheck className="w-32 h-32 opacity-70 motion-safe:animate-bounce" />
    </div>
  );
}
