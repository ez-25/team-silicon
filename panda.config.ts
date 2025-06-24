import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './apps/web/src/**/*.{js,jsx,ts,tsx}',
    './apps/web/app/**/*.{js,jsx,ts,tsx}',
    './packages/ui/src/**/*.{js,jsx,ts,tsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: {
            primary: { value: '#007bff' },
            secondary: { value: '#6c757d' },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',

  // Enable JSX runtime
  jsxFramework: 'react',
});
