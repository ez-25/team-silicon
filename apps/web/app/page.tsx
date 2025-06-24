'use client';

import { Typography, Paper, Box, Card, CardContent } from '@mui/material';

export default function HomePage() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome to EZ-Template Dashboard
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="body1">
          This is a frontend project built with Turborepo, Next.js, MUI,
          Highcharts, and React-Flow.
        </Typography>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Charts
            </Typography>
            <Typography variant="body2">
              Navigate to the charts section to view interactive data
              visualizations using Highcharts.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Flowcharts
            </Typography>
            <Typography variant="body2">
              Explore interactive flowcharts and diagrams built with React-Flow.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
