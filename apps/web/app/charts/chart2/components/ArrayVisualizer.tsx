'use client';

import React from 'react';
import { Box, Paper } from '@mui/material';

interface ArrayVisualizerProps {
  array: number[];
  highlightedIndices?: number[];
  completedIndices?: number[];
  maxValue?: number;
}

/**
 * 배열을 막대 차트 형태로 시각화하는 컴포넌트
 */
export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  array,
  highlightedIndices = [],
  completedIndices = [],
  maxValue,
}) => {
  const max = maxValue || Math.max(...array);
  const containerHeight = 300;

  const getBarColor = (index: number): string => {
    if (completedIndices.includes(index)) {
      return '#4caf50'; // 완료된 원소는 초록색
    }
    if (highlightedIndices.includes(index)) {
      return '#f44336'; // 비교/교환 중인 원소는 빨간색
    }
    return '#2196f3'; // 기본 파란색
  };

  const getBarHeight = (value: number): number => {
    return (value / max) * (containerHeight - 40);
  };

  return (
    <Paper sx={{ p: 2, height: containerHeight + 80 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          height: containerHeight,
          gap: 0.5,
          justifyContent: 'center',
        }}
      >
        {array.map((value, index) => (
          <Box
            key={index}
            sx={{
              width: Math.max(20, 400 / array.length),
              height: getBarHeight(value),
              backgroundColor: getBarColor(index),
              borderRadius: '2px 2px 0 0',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
              textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
              transition: 'all 0.3s ease',
              position: 'relative',
              minHeight: 20,
            }}
          >
            {array.length <= 20 && (
              <span style={{ marginBottom: '4px' }}>{value}</span>
            )}
            {/* 인덱스 표시 */}
            <Box
              sx={{
                position: 'absolute',
                bottom: -25,
                fontSize: '10px',
                color: 'text.secondary',
              }}
            >
              {index}
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};
