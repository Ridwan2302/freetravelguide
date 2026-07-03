import React from 'react';
import { GraduationCap } from 'lucide-react';

interface LoaderProps {
  fullScreen?: boolean;
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ fullScreen = false, message = 'Chargement...' }) => {
  const inner = (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>
        <div className="absolute -inset-1 rounded-3xl border-2 border-blue-200 animate-ping opacity-40" />
      </div>
      <p className="text-sm font-medium text-slate-400">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        {inner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-16">{inner}</div>;
};
