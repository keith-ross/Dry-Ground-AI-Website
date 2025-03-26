
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <img src="/logo.svg" alt="Dry Ground AI Logo" className="h-8 w-8" />
      <span className="ml-3 text-xl font-bold text-white whitespace-nowrap">
        DRY GROUND <span className="text-[#00B7FF]">AI</span>
      </span>
    </div>
  );
};

export default Logo;
