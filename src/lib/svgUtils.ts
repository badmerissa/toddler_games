import type { RegionFill } from '@/types';

export function getRegionElements(container: HTMLElement): SVGElement[] {
  return Array.from(container.querySelectorAll<SVGElement>('[data-region]'));
}

export function applyFills(container: HTMLElement, fills: RegionFill): void {
  const elements = getRegionElements(container);
  for (const el of elements) {
    const regionId = el.getAttribute('data-region');
    if (regionId && fills[regionId]) {
      el.style.fill = fills[regionId];
    }
  }
}

export function getRegionId(target: EventTarget | null): string | null {
  if (!target || !(target instanceof Element)) return null;
  const el = target.closest('[data-region]');
  if (!el) return null;
  return el.getAttribute('data-region');
}

export function getCurrentFill(container: HTMLElement, regionId: string): string {
  const el = container.querySelector<SVGElement>(`[data-region="${regionId}"]`);
  return el?.style.fill ?? '#FFFFFF';
}
