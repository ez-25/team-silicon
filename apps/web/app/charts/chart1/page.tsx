'use client';

import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Chart1Page() {
  // x축 라벨
  const xLabels = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  // 시리즈 데이터
  const series = [
    {
      label: '시리즈 1',
      data: [
        29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        95.6, 54.4,
      ],
    },
    {
      label: '시리즈 2',
      data: [
        144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4,
        129.2,
      ],
    },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        차트1
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="body1" paragraph>
          이 페이지는 <b>@mui/x-charts/LineChart</b>를 사용한 첫 번째 차트
          예제입니다.
        </Typography>

        <Box sx={{ height: 400, width: '100%' }}>
          <LineChart
            xAxis={[{ data: xLabels, scaleType: 'point', label: '월' }]}
            yAxis={[{ label: '값' }]}
            series={series}
            height={400}
          />
        </Box>
      </Paper>
    </div>
  );
}
