"use client";

import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import dynamic from 'next/dynamic';

// Dynamically import the Highcharts component with SSR disabled
const HighchartsReact = dynamic(() => import('highcharts-react-official'), { ssr: false });
const Highcharts = dynamic(() => import('highcharts'), { ssr: false });

export default function Chart1Page() {
  // Sample chart options
  const chartOptions = {
    title: {
      text: '차트1 - 연간 데이터 분석'
    },
    xAxis: {
      categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    },
    yAxis: {
      title: {
        text: '값'
      }
    },
    series: [{
      name: '시리즈 1',
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }, {
      name: '시리즈 2',
      data: [144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2]
    }]
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        차트1
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="body1" paragraph>
          이 페이지는 Highcharts를 사용한 첫 번째 차트 예제입니다.
        </Typography>
        
        <Box sx={{ height: '400px', width: '100%' }}>
          {typeof window !== 'undefined' && (
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
            />
          )}
        </Box>
      </Paper>
    </div>
  );
}
