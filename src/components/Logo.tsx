
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <img 
        src="/favicon.svg" 
        alt="Dry Ground AI"
        className="h-8 w-auto"
        style={{ minWidth: '32px' }} // Prevent collapse while loading
      />
    </div>
  );
};

export default Logo;
