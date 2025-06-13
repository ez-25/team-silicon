'use client';

import React from 'react';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import Header from './Header';
import LeftNavBar from './LeftNavBar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <LeftNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
