import React from 'react';
import { Cloud } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Cloud className="h-16 w-16 text-white/60 animate-pulse mb-4" />
      <div className="text-white/80 text-lg">Loading weather data...</div>
      <div className="flex space-x-1 mt-4">
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}