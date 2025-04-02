import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <img
        src="/logo.svg"
        alt="Dry Ground AI Logo"
        className="h-11 w-15"
        style={{ display: "block" }}
        onError={(e) => {
          console.error("Logo failed to load");
          e.currentTarget.style.display = "none";
        }}
      />
      <span className="ml-3 text-xl font-bold text-white whitespace-nowrap">
        <span className="text-[#00B7FF]"> </span>
      </span>
    </div>
  );
};

export default Logo;
