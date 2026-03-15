'use client';

import { useEffect, useRef, useState } from 'react';
import { useColoringState, useColoringDispatch } from '@/context/ColoringContext';
import { useSound } from '@/hooks/useSound';
import { applyFills, getRegionId, getCurrentFill } from '@/lib/svgUtils';

type Props = { svgPath: string };

export function SvgColoringPage({ svgPath }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeColor, fills } = useColoringState();
  const dispatch = useColoringDispatch();
  const { play } = useSound();
  const [loaded, setLoaded] = useState(false);
  const activeColorRef = useRef(activeColor);
  activeColorRef.current = activeColor;

  // Fetch and inject SVG
  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    fetch(svgPath)
      .then((r) => r.text())
      .then((text) => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = text;
        setLoaded(true);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [svgPath]);

  // Restore saved fills after SVG loads
  useEffect(() => {
    if (!loaded || !containerRef.current) return;
    applyFills(containerRef.current, fills);
  }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync fills from state to DOM (for undo)
  useEffect(() => {
    if (!loaded || !containerRef.current) return;
    const container = containerRef.current;
    const elements = container.querySelectorAll<SVGElement>('[data-region]');
    elements.forEach((el) => {
      const id = el.getAttribute('data-region');
      if (id) {
        el.style.fill = fills[id] ?? '#FFFFFF';
      }
    });
  }, [fills, loaded]);

  // Click handler via event delegation
  useEffect(() => {
    if (!loaded || !containerRef.current) return;
    const container = containerRef.current;

    function handleClick(e: MouseEvent) {
      const regionId = getRegionId(e.target);
      if (!regionId || !containerRef.current) return;
      const color = activeColorRef.current;
      const previousColor = getCurrentFill(containerRef.current, regionId);
      const el = (e.target as Element).closest<SVGElement>('[data-region]');
      if (el) el.style.fill = color;
      dispatch({ type: 'FILL_REGION', regionId, color, previousColor });
      play('fill-region');
    }

    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, [loaded, dispatch, play]);

  return (
    <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
      <div
        ref={containerRef}
        aria-label="Coloring canvas"
        className="w-full max-w-[500px] aspect-square [touch-action:manipulation] cursor-crosshair"
        style={{ maxHeight: '60vh' }}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-white/40 border-t-white animate-spin" />
        </div>
      )}
    </div>
  );
}
