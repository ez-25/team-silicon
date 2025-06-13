'use client';

import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), sans-serif',
  },
});

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
