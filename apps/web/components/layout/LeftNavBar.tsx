'use client';

import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Toolbar,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

const LeftNavBar: React.FC = () => {
  const pathname = usePathname();
  const [chartsOpen, setChartsOpen] = useState(true);

  const handleChartsClick = () => {
    setChartsOpen(!chartsOpen);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/"
              selected={pathname === '/'}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/table"
              selected={pathname === '/table'}
            >
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Table" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/table"
              selected={pathname === '/flow'}
            >
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Flow" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleChartsClick}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="차트" />
              {chartsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={chartsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href="/charts/chart1"
                selected={pathname === '/charts/chart1'}
              >
                <ListItemIcon>
                  <ShowChartIcon />
                </ListItemIcon>
                <ListItemText primary="차트1" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href="/charts/chart2"
                selected={pathname === '/charts/chart2'}
              >
                <ListItemIcon>
                  <ShowChartIcon />
                </ListItemIcon>
                <ListItemText primary="차트2" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
};

export default LeftNavBar;
