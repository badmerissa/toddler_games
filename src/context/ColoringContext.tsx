'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { ColoringState, ColoringAction, RegionFill } from '@/types';
import { DEFAULT_COLOR } from '@/lib/colors';
import * as storage from '@/lib/storage';

const MAX_HISTORY = 20;

function reducer(state: ColoringState, action: ColoringAction): ColoringState {
  switch (action.type) {
    case 'SET_ACTIVE_COLOR':
      return { ...state, activeColor: action.color };

    case 'FILL_REGION': {
      const history = [
        { regionId: action.regionId, previousColor: action.previousColor },
        ...state.history,
      ].slice(0, MAX_HISTORY);
      const fills = { ...state.fills, [action.regionId]: action.color };
      return { ...state, fills, history };
    }

    case 'UNDO': {
      if (state.history.length === 0) return state;
      const [last, ...rest] = state.history;
      const fills = { ...state.fills };
      if (last.previousColor === '#FFFFFF') {
        delete fills[last.regionId];
      } else {
        fills[last.regionId] = last.previousColor;
      }
      return { ...state, fills, history: rest };
    }

    case 'LOAD_IMAGE':
      return {
        ...state,
        activeSlug: action.slug,
        fills: action.savedFills,
        history: [],
        isComplete: false,
        isCelebrating: false,
      };

    case 'CLEAR_IMAGE':
      return { ...state, fills: {}, history: [], isComplete: false, isCelebrating: false };

    case 'SET_COMPLETE':
      return { ...state, isComplete: true, isCelebrating: true };

    case 'DISMISS_CELEBRATION':
      return { ...state, isCelebrating: false };

    case 'TOGGLE_SOUND': {
      const soundEnabled = !state.soundEnabled;
      storage.setSettings({ soundEnabled });
      return { ...state, soundEnabled };
    }

    default:
      return state;
  }
}

const StateContext = createContext<ColoringState | null>(null);
const DispatchContext = createContext<React.Dispatch<ColoringAction> | null>(null);

export function ColoringProvider({ children }: { children: React.ReactNode }) {
  const settings = typeof window !== 'undefined' ? storage.getSettings() : { soundEnabled: true };

  const [state, baseDispatch] = useReducer(reducer, {
    activeSlug: null,
    activeColor: DEFAULT_COLOR,
    fills: {},
    history: [],
    isComplete: false,
    isCelebrating: false,
    soundEnabled: settings.soundEnabled,
  });

  // Wrap dispatch to handle persistence side-effects
  const dispatch = useCallback(
    (action: ColoringAction) => {
      if (action.type === 'FILL_REGION' && state.activeSlug) {
        storage.setRegionFill(state.activeSlug, action.regionId, action.color);
      }
      if (action.type === 'SET_COMPLETE' && state.activeSlug) {
        storage.setCompleted(state.activeSlug);
      }
      if (action.type === 'CLEAR_IMAGE' && state.activeSlug) {
        storage.clearProgress(state.activeSlug);
      }
      baseDispatch(action);
    },
    [state.activeSlug, baseDispatch]
  );

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useColoringState(): ColoringState {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error('useColoringState must be used within ColoringProvider');
  return ctx;
}

export function useColoringDispatch(): React.Dispatch<ColoringAction> {
  const ctx = useContext(DispatchContext);
  if (!ctx) throw new Error('useColoringDispatch must be used within ColoringProvider');
  return ctx;
}
