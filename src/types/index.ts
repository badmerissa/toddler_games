export type ColoringImage = {
  slug: string;
  label: string;
  svgPath: string;
  regionCount: number;
  thumbnailColor: string;
};

export type RegionFill = Record<string, string>; // regionId → hex

export type ImageProgress = {
  fills: RegionFill;
  lastModified: number;
  completedAt: number | null;
};

export type ProgressStore = {
  version: 1;
  images: Record<string, ImageProgress>;
};

export type SettingsStore = {
  version: 2;
  soundEnabled: boolean;
  highContrast: boolean;
  lastOpenedSlug: string | null;
};

export type ColorEntry = {
  hex: string;
  label: string;
};

export type HistoryEntry = {
  regionId: string;
  previousColor: string;
};

export type ColoringState = {
  activeSlug: string | null;
  activeColor: string;
  fills: RegionFill;
  history: HistoryEntry[];
  isComplete: boolean;
  isCelebrating: boolean;
  soundEnabled: boolean;
  highContrast: boolean;
};

export type ColoringAction =
  | { type: 'SET_ACTIVE_COLOR'; color: string }
  | { type: 'FILL_REGION'; regionId: string; color: string; previousColor: string }
  | { type: 'UNDO' }
  | { type: 'LOAD_IMAGE'; slug: string; savedFills: RegionFill }
  | { type: 'CLEAR_IMAGE'; slug: string }
  | { type: 'SET_COMPLETE' }
  | { type: 'DISMISS_CELEBRATION' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'TOGGLE_HIGH_CONTRAST' }
  | { type: 'RESET_ALL' };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  type: 'original' | 'curated';
  externalLinks?: { title: string; url: string; source: string }[];
};
