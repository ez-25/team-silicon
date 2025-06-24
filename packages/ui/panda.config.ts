import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: false, // Disable preflight for component library

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

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
