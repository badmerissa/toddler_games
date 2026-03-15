import type { ImageProgress, ProgressStore, RegionFill, SettingsStore } from '@/types';

const PROGRESS_KEY = 'tcb_progress';
const SETTINGS_KEY = 'tcb_settings';

function readProgress(): ProgressStore {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { version: 1, images: {} };
    const parsed = JSON.parse(raw) as ProgressStore;
    if (parsed.version !== 1) return { version: 1, images: {} };
    return parsed;
  } catch {
    return { version: 1, images: {} };
  }
}

function writeProgress(store: ProgressStore): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(store));
  } catch {
    // QuotaExceededError or private browsing — fail silently
  }
}

export function getProgress(slug: string): ImageProgress {
  const store = readProgress();
  return store.images[slug] ?? { fills: {}, lastModified: Date.now(), completedAt: null };
}

export function setRegionFill(slug: string, regionId: string, color: string): void {
  const store = readProgress();
  if (!store.images[slug]) {
    store.images[slug] = { fills: {}, lastModified: Date.now(), completedAt: null };
  }
  store.images[slug].fills[regionId] = color;
  store.images[slug].lastModified = Date.now();
  writeProgress(store);
}

export function setCompleted(slug: string): void {
  const store = readProgress();
  if (store.images[slug]) {
    store.images[slug].completedAt = Date.now();
    writeProgress(store);
  }
}

export function clearProgress(slug: string): void {
  const store = readProgress();
  delete store.images[slug];
  writeProgress(store);
}

export function clearAllProgress(): void {
  writeProgress({ version: 1, images: {} });
}

export function getAllFills(slug: string): RegionFill {
  return getProgress(slug).fills;
}

export function getCompletionPercent(slug: string, regionCount: number): number {
  if (regionCount === 0) return 0;
  const fills = Object.keys(getProgress(slug).fills).length;
  return Math.min(100, Math.round((fills / regionCount) * 100));
}

export function getSettings(): SettingsStore {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { version: 1, soundEnabled: true, lastOpenedSlug: null };
    const parsed = JSON.parse(raw) as SettingsStore;
    if (parsed.version !== 1) return { version: 1, soundEnabled: true, lastOpenedSlug: null };
    return parsed;
  } catch {
    return { version: 1, soundEnabled: true, lastOpenedSlug: null };
  }
}

export function setSettings(partial: Partial<Omit<SettingsStore, 'version'>>): void {
  try {
    const current = getSettings();
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...partial }));
  } catch {
    // fail silently
  }
}
