'use client';

import Link from 'next/link';
import { useColoringState, useColoringDispatch } from '@/context/ColoringContext';
import { SettingsRow, Toggle } from '@/components/settings/SettingsRow';
import { PrivacyNotice } from '@/components/settings/PrivacyNotice';
import { ClearProgressButton } from '@/components/settings/ClearProgressButton';

export function SettingsContent() {
  const { soundEnabled, highContrast } = useColoringState();
  const dispatch = useColoringDispatch();

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/"
          className="text-slate-500 hover:text-slate-800 text-sm font-semibold flex items-center gap-1 transition-colors"
        >
          ← Back
        </Link>
        <h1 className="text-2xl font-black text-slate-800">Settings</h1>
      </div>

      {/* Sound */}
      <section className="mb-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Sound</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-4">
          <SettingsRow
            label="Sound effects"
            description="Play sounds when colouring and completing pages"
          >
            <Toggle
              checked={soundEnabled}
              onChange={() => dispatch({ type: 'TOGGLE_SOUND' })}
              label="Toggle sound effects"
            />
          </SettingsRow>
        </div>
      </section>

      {/* Display */}
      <section className="mb-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
          Display
        </h2>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-4">
          <SettingsRow
            label="High contrast colours"
            description="Increases border weight on colour swatches for easier selection"
          >
            <Toggle
              checked={highContrast}
              onChange={() => dispatch({ type: 'TOGGLE_HIGH_CONTRAST' })}
              label="Toggle high contrast mode"
            />
          </SettingsRow>
        </div>
      </section>

      {/* Data */}
      <section className="mb-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Data</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-4">
          <ClearProgressButton />
        </div>
      </section>

      {/* Privacy */}
      <section className="mb-6">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
          Privacy
        </h2>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-4">
          <PrivacyNotice />
        </div>
      </section>

      {/* Info */}
      <p className="text-center text-xs text-slate-400 mt-8">
        All data is stored locally on this device only.
        <br />
        No information is ever sent to any server.
      </p>
    </div>
  );
}
