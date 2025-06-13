'use client';

import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Chart2Page() {
  // 예시 데이터 (카테고리별 값)
  const xLabels = [
    '카테고리 A',
    '카테고리 B',
    '카테고리 C',
    '카테고리 D',
    '카테고리 E',
    '기타',
  ];
  const data = [61.41, 11.84, 10.85, 4.67, 4.18, 7.05];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        차트2
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="body1" paragraph>
          이 페이지는 <b>@mui/x-charts/LineChart</b>를 사용한 두 번째 차트
          예제입니다.
        </Typography>

        <Box sx={{ height: 400, width: '100%' }}>
          <LineChart
            xAxis={[{ data: xLabels, scaleType: 'point', label: '카테고리' }]}
            yAxis={[{ label: '비율(%)' }]}
            series={[{ label: '카테고리', data }]}
            height={400}
          />
        </Box>
      </Paper>
    </div>
  );
}
