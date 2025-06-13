"use client";

import { Typography, Paper, Grid, Card, CardContent } from '@mui/material';

export default function HomePage() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome to EZ-Template Dashboard
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="body1">
          This is a frontend project built with Turborepo, Next.js, MUI, Highcharts, and React-Flow.
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Charts
              </Typography>
              <Typography variant="body2">
                Navigate to the charts section to view interactive data visualizations using Highcharts.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
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
        </Grid>
      </Grid>
    </div>
  );
}
