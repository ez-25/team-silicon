'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          EZ-Template Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
