import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-red-300/30 shadow-lg text-center">
      <AlertTriangle className="h-16 w-16 text-red-300 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">Oops! Something went wrong</h3>
      <p className="text-white/80 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg text-white transition-all duration-200"
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}