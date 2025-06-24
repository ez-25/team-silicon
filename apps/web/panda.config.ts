import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],

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
          light: {
            background: { value: '#ffffff' },
            foreground: { value: '#171717' },
          },
        },
      },
      semanticTokens: {
        colors: {
          background: {
            value: {
              base: '{colors.light.background}',
              _dark: '#0a0a0a',
            },
          },
          foreground: {
            value: {
              base: '{colors.light.foreground}',
              _dark: '#ededed',
            },
          },
        },
      },
    },
  },

  // Global CSS styles
  globalCss: {
    'html, body': {
      maxWidth: '100vw',
      overflowX: 'hidden',
    },
    body: {
      color: 'foreground',
      background: 'background',
    },
    '*': {
      boxSizing: 'border-box',
      padding: 0,
      margin: 0,
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    '.imgDark': {
      display: 'none',
    },
    _dark: {
      html: {
        colorScheme: 'dark',
      },
      '.imgLight': {
        display: 'none',
      },
      '.imgDark': {
        display: 'unset',
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',

  // Enable JSX runtime
  jsxFramework: 'react',
});
