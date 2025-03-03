import React from 'react';
import { BrainCircuit } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <div className="flex items-center justify-center">
          <BrainCircuit className="h-7 w-7 text-brand-primary" />
        </div>
        {/* Subtle glow effect */}
        <div className="absolute -inset-1 bg-brand-primary/20 rounded-full blur-sm opacity-70"></div>
      </div>
      <span className="ml-3 text-xl font-bold text-white">
        Dry Ground <span className="text-brand-primary">AI</span>
      </span>
    </div>
  );
};

export default Logo;