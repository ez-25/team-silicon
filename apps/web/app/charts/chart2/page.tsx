'use client';

import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import dynamic from 'next/dynamic';

// Dynamically import the Highcharts component with SSR disabled
const HighchartsReact = dynamic(() => import('highcharts-react-official'), {
  ssr: false,
});
const Highcharts = dynamic(() => import('highcharts'), { ssr: false });

export default function Chart2Page() {
  // Sample chart options
  const chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '차트2 - 파이 차트 예제',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: '카테고리',
        colorByPoint: true,
        data: [
          {
            name: '카테고리 A',
            y: 61.41,
            sliced: true,
            selected: true,
          },
          {
            name: '카테고리 B',
            y: 11.84,
          },
          {
            name: '카테고리 C',
            y: 10.85,
          },
          {
            name: '카테고리 D',
            y: 4.67,
          },
          {
            name: '카테고리 E',
            y: 4.18,
          },
          {
            name: '기타',
            y: 7.05,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        차트2
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="body1" paragraph>
          이 페이지는 Highcharts를 사용한 두 번째 차트 예제입니다.
        </Typography>

        <Box sx={{ height: '400px', width: '100%' }}>
          {typeof window !== 'undefined' && (
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          )}
        </Box>
      </Paper>
    </div>
  );
}
