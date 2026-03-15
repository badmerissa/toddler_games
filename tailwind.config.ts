import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        'touch-sm': '48px',
        'touch-lg': '72px',
        'touch-xl': '96px',
      },
      fontSize: {
        toddler: ['3rem', { lineHeight: '1.2' }],
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
