'use client';

import React from 'react';
import { Box, Paper, Typography, LinearProgress } from '@mui/material';
import { SortingStats } from '../types/sorting';

interface StatisticsPanelProps {
  stats: SortingStats;
  isRunning: boolean;
  currentStep?: string;
}

/**
 * 정렬 통계 표시 패널
 */
export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  stats,
  isRunning,
  currentStep,
}) => {
  const formatTime = (milliseconds: number): string => {
    if (milliseconds < 1000) {
      return `${milliseconds}ms`;
    }
    return `${(milliseconds / 1000).toFixed(1)}s`;
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        실시간 통계
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" color="primary">
            {stats.comparisons}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            비교 횟수
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" color="secondary">
            {stats.swaps}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            교환 횟수
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" color="info.main">
            {stats.steps}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            총 단계
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" color="success.main">
            {formatTime(stats.timeElapsed)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            소요 시간
          </Typography>
        </Box>
      </Box>

      {/* 현재 단계 표시 */}
      {currentStep && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            현재 단계
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentStep}
          </Typography>
        </Box>
      )}

      {/* 진행 상태 표시 */}
      {isRunning && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            정렬 진행중...
          </Typography>
          <LinearProgress />
        </Box>
      )}
    </Paper>
  );
};
