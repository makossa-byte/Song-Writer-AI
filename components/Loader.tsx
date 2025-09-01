
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-800/50 rounded-lg">
      <div className="w-12 h-12 border-4 border-t-transparent border-teal-400 border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-slate-300">Generating your song...</p>
    </div>
  );
};

export default Loader;
