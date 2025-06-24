'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Typography, Box } from '@mui/material';
import { ArrayVisualizer } from './components/ArrayVisualizer';
import { ControlPanel } from './components/ControlPanel';
import { StatisticsPanel } from './components/StatisticsPanel';
import { sortingPluginManager } from './lib/plugin-manager';
import { audioManager } from './lib/audio-manager';
import { builtInPlugins } from './plugins';
import { SortingState, SortingStats, SortingCallbacks } from './types/sorting';

export default function Chart2Page() {
  const [sortingState, setSortingState] = useState<SortingState>({
    array: [],
    isRunning: false,
    currentPlugin: null,
    comparisons: 0,
    swaps: 0,
    steps: 0,
    highlightedIndices: [],
    completedIndices: [],
  });

  const [stats, setStats] = useState<SortingStats>({
    comparisons: 0,
    swaps: 0,
    steps: 0,
    timeElapsed: 0,
  });

  const [currentStep, setCurrentStep] = useState('');
  const [arraySize, setArraySize] = useState(20);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(150); // 애니메이션 속도 (ms)
  const [startTime, setStartTime] = useState(0);
  const shouldStopRef = useRef(false);

  // 플러그인 등록
  useEffect(() => {
    if (builtInPlugins.length === 0) return; // 기본 플러그인이 없으면 아무 작업도 하지 않음

    for (const plugin of builtInPlugins) {
      sortingPluginManager.registerPlugin(plugin);
    }

    // 첫 번째로 색인된 정렬 알고리즘 플러그인을 기본값으로 선택
    const firstPlugin = builtInPlugins[0]!;

    setSortingState((prev) => ({
      ...prev,
      currentPlugin: firstPlugin.name,
    }));
  }, []);

  // 초기 배열 생성
  useEffect(() => {
    generateRandomArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize]);

  // 시간 업데이트
  useEffect(() => {
    let interval: number;
    if (sortingState.isRunning) {
      interval = window.setInterval(() => {
        setStats((prev) => ({
          ...prev,
          timeElapsed: Date.now() - startTime,
        }));
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sortingState.isRunning, startTime]);

  const generateRandomArray = useCallback(() => {
    const array = Array.from({ length: arraySize }, (_, i) => i + 1);
    // Fisher-Yates shuffle
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j] || 0, array[i] || 0];
    }

    setSortingState((prev) => ({
      ...prev,
      array,
      highlightedIndices: [],
      completedIndices: [],
      comparisons: 0,
      swaps: 0,
      steps: 0,
    }));

    setStats({
      comparisons: 0,
      swaps: 0,
      steps: 0,
      timeElapsed: 0,
    });
    setCurrentStep('');
  }, [arraySize]);

  const handlePluginSelect = (pluginName: string) => {
    setSortingState((prev) => ({
      ...prev,
      currentPlugin: pluginName,
    }));
  };

  const handleStart = async () => {
    if (!sortingState.currentPlugin) return;

    // 중단 플래그 초기화
    shouldStopRef.current = false;

    setSortingState((prev) => ({
      ...prev,
      isRunning: true,
      highlightedIndices: [],
      completedIndices: [],
      comparisons: 0,
      swaps: 0,
      steps: 0,
    }));

    setStats({
      comparisons: 0,
      swaps: 0,
      steps: 0,
      timeElapsed: 0,
    });

    setStartTime(Date.now());
    await audioManager.setEnabled(audioEnabled);

    const callbacks: SortingCallbacks = {
      onCompare: (indexA: number, indexB: number) => {
        setSortingState((prev) => ({
          ...prev,
          comparisons: prev.comparisons + 1,
          highlightedIndices: [indexA, indexB],
        }));
        setStats((prev) => ({
          ...prev,
          comparisons: prev.comparisons + 1,
        }));

        if (audioEnabled) {
          audioManager.playCompareSound(
            sortingState.array[indexA] || 0,
            sortingState.array[indexB] || 0,
            1,
            arraySize,
          );
        }
      },

      getAnimationSpeed: () => animationSpeed,

      onSwap: (indexA: number, indexB: number) => {
        setSortingState((prev) => ({
          ...prev,
          swaps: prev.swaps + 1,
        }));
        setStats((prev) => ({
          ...prev,
          swaps: prev.swaps + 1,
        }));

        if (audioEnabled) {
          audioManager.playSwapSound(
            sortingState.array[indexA] || 0,
            sortingState.array[indexB] || 0,
            1,
            arraySize,
          );
        }
      },

      onAccess: () => {
        // 배열 접근 시각화는 생략 (너무 많은 업데이트 방지)
      },

      onComplete: (index: number) => {
        setSortingState((prev) => ({
          ...prev,
          completedIndices: [...prev.completedIndices, index],
        }));

        if (audioEnabled) {
          audioManager.playCompleteSound(
            sortingState.array[index] || 0,
            1,
            arraySize,
          );
        }
      },

      onStep: (currentArray: number[], step: string) => {
        setSortingState((prev) => ({
          ...prev,
          array: currentArray,
          steps: prev.steps + 1,
        }));
        setStats((prev) => ({
          ...prev,
          steps: prev.steps + 1,
        }));
        setCurrentStep(step);
      },

      shouldStop: () => shouldStopRef.current,
    };

    try {
      await sortingPluginManager.executeSort(
        sortingState.currentPlugin,
        sortingState.array,
        callbacks,
      );
    } catch (error) {
      console.error('Sorting error:', error);
    } finally {
      setSortingState((prev) => ({
        ...prev,
        isRunning: false,
        highlightedIndices: [],
      }));
      setCurrentStep('정렬 완료!');
    }
  };

  const handleStop = () => {
    shouldStopRef.current = true;

    setSortingState((prev) => ({
      ...prev,
      isRunning: false,
      highlightedIndices: [],
    }));
    audioManager.stopAllSounds();
    setCurrentStep('정렬 중단됨');
  };

  const handleAudioToggle = (enabled: boolean) => {
    setAudioEnabled(enabled);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        정렬 알고리즘 시각화 및 청각화
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ControlPanel
          plugins={sortingPluginManager.getAvailablePlugins()}
          selectedPlugin={sortingState.currentPlugin}
          onPluginSelect={handlePluginSelect}
          onStart={handleStart}
          onStop={handleStop}
          onShuffle={generateRandomArray}
          isRunning={sortingState.isRunning}
          arraySize={arraySize}
          onArraySizeChange={setArraySize}
          audioEnabled={audioEnabled}
          onAudioToggle={handleAudioToggle}
          animationSpeed={animationSpeed}
          onAnimationSpeedChange={setAnimationSpeed}
        />

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '2 1 500px', minWidth: 0 }}>
            <ArrayVisualizer
              array={sortingState.array}
              highlightedIndices={sortingState.highlightedIndices}
              completedIndices={sortingState.completedIndices}
            />
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
            <StatisticsPanel
              stats={stats}
              isRunning={sortingState.isRunning}
              currentStep={currentStep}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
