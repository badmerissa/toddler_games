import { palette } from '@/lib/colors';
import { ColorSwatch } from './ColorSwatch';

export function ColorPalette() {
  return (
    <div className="w-full bg-white/10 backdrop-blur-sm py-3 px-2">
      <div
        className="grid gap-2 justify-center"
        style={{ gridTemplateColumns: 'repeat(9, 64px)' }}
      >
        {palette.map((color) => (
          <ColorSwatch key={color.hex} color={color} />
        ))}
      </div>
    </div>
  );
}
