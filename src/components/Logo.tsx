
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <img 
        src="/content/logo.svg"
        alt="Dry Ground AI Logo" 
        className="h-10 w-10" 
        style={{ display: 'block' }} 
        onError={(e) => console.error('Logo failed to load:', e)}
      />
      <span className="ml-3 text-xl font-bold text-white whitespace-nowrap">
        DRY GROUND <span className="text-[#00B7FF]">AI</span>
      </span>
    </div>
  );
};

export default Logo;
