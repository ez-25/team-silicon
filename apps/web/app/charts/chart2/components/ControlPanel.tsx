'use client';

import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Typography,
  Slider,
  FormControlLabel,
  Switch,
  Chip,
} from '@mui/material';
import {
  PlayArrow,
  Stop,
  Shuffle,
  VolumeUp,
  VolumeOff,
} from '@mui/icons-material';
import { SortingPlugin } from '../types/sorting';

interface ControlPanelProps {
  plugins: SortingPlugin[];
  selectedPlugin: string | null;
  onPluginSelect: (pluginName: string) => void;
  onStart: () => void;
  onStop: () => void;
  onShuffle: () => void;
  isRunning: boolean;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  audioEnabled: boolean;
  onAudioToggle: (enabled: boolean) => void;
}

/**
 * 정렬 알고리즘 제어 패널 컴포넌트
 */
export const ControlPanel: React.FC<ControlPanelProps> = ({
  plugins,
  selectedPlugin,
  onPluginSelect,
  onStart,
  onStop,
  onShuffle,
  isRunning,
  arraySize,
  onArraySizeChange,
  audioEnabled,
  onAudioToggle,
}) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          알고리즘 선택
        </Typography>
        <ButtonGroup variant="outlined">
          {plugins.map((plugin) => (
            <Button
              key={plugin.name}
              variant={
                selectedPlugin === plugin.name ? 'contained' : 'outlined'
              }
              onClick={() => onPluginSelect(plugin.name)}
              disabled={isRunning}
              sx={{ mb: 1 }}
            >
              {plugin.name}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* 선택된 알고리즘 정보 */}
      {selectedPlugin && (
        <Box sx={{ mb: 3 }}>
          {plugins
            .filter((p) => p.name === selectedPlugin)
            .map((plugin) => (
              <Box key={plugin.name}>
                <Typography variant="body2" color="text.secondary">
                  {plugin.description}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                  <Chip
                    label={`시간: ${plugin.complexity.time}`}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label={`공간: ${plugin.complexity.space}`}
                    size="small"
                    color="secondary"
                  />
                </Box>
              </Box>
            ))}
        </Box>
      )}

      {/* 배열 크기 조절 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          배열 크기: {arraySize}
        </Typography>
        <Slider
          value={arraySize}
          onChange={(_, value) => onArraySizeChange(value as number)}
          min={5}
          max={50}
          step={1}
          disabled={isRunning}
          marks={[
            { value: 5, label: '5' },
            { value: 20, label: '20' },
            { value: 50, label: '50' },
          ]}
        />
      </Box>

      {/* 제어 버튼 */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlayArrow />}
          onClick={onStart}
          disabled={isRunning || !selectedPlugin}
        >
          시작
        </Button>

        <Button
          variant="contained"
          color="error"
          startIcon={<Stop />}
          onClick={onStop}
          disabled={!isRunning}
        >
          정지
        </Button>

        <Button
          variant="outlined"
          startIcon={<Shuffle />}
          onClick={onShuffle}
          disabled={isRunning}
        >
          섞기
        </Button>
      </Box>

      {/* 오디오 제어 */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={
            <Switch
              checked={audioEnabled}
              onChange={(e) => onAudioToggle(e.target.checked)}
              disabled={isRunning}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {audioEnabled ? <VolumeUp /> : <VolumeOff />}
              <Typography variant="body2">
                사운드 {audioEnabled ? '켜짐' : '꺼짐'}
              </Typography>
            </Box>
          }
        />
      </Box>
    </Paper>
  );
};
