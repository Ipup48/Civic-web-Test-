import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        honda: {
          red: '#DC2626',
          darkRed: '#991B1B',
          lightRed: '#EF4444',
          charcoal: '#0B0F17',
          dark: '#111827',
          card: '#18202F',
          border: '#2A364F',
        },
      },
    },
  },
  plugins: [],
};
export default config;
