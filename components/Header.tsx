
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 border-b border-slate-700">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 text-transparent bg-clip-text">
        Songwriter AI Studio
      </h1>
      <p className="mt-2 text-slate-400 max-w-2xl mx-auto">
        Turn your ideas into music. Enter a prompt to generate lyrics, detect genre & mood, and create a vocal demo.
      </p>
    </header>
  );
};

export default Header;
