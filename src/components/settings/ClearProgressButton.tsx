'use client';

import { useState } from 'react';
import { useColoringDispatch } from '@/context/ColoringContext';

export function ClearProgressButton() {
  const dispatch = useColoringDispatch();
  const [confirming, setConfirming] = useState(false);

  function handleClear() {
    dispatch({ type: 'RESET_ALL' });
    setConfirming(false);
    // Brief delay then reload so gallery cards re-read localStorage
    setTimeout(() => window.location.reload(), 100);
  }

  if (confirming) {
    return (
      <div className="py-4 border-b border-slate-100">
        <p className="text-sm font-semibold text-slate-800 mb-1">Clear all progress?</p>
        <p className="text-xs text-slate-400 mb-3">
          This will permanently remove all colouring progress. This cannot be undone.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-black rounded-xl transition-colors"
          >
            Yes, clear all
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-slate-100">
      <div>
        <p className="font-semibold text-slate-800 text-sm">Clear all progress</p>
        <p className="text-slate-400 text-xs mt-0.5">Remove all saved colouring progress</p>
      </div>
      <button
        onClick={() => setConfirming(true)}
        className="shrink-0 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-xl transition-colors border border-red-100"
      >
        Clear
      </button>
    </div>
  );
}
