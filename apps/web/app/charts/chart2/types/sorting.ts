/**
 * 정렬 알고리즘 플러그인 인터페이스
 */
export interface SortingPlugin {
  // 메타데이터
  name: string;
  description: string;
  complexity: {
    time: string;
    space: string;
  };

  // 정렬 실행 함수
  sort: (array: number[], callbacks: SortingCallbacks) => Promise<void> | void;
}

/**
 * 시각화를 위한 콜백 함수들
 */
export interface SortingCallbacks {
  onCompare: (indexA: number, indexB: number) => void;
  onSwap: (indexA: number, indexB: number) => void;
  onAccess: (index: number) => void;
  onComplete: (index: number) => void;
  onStep: (currentArray: number[], step: string) => void;
  shouldStop: () => boolean;
}

/**
 * 정렬 실행 상태
 */
export interface SortingState {
  array: number[];
  isRunning: boolean;
  currentPlugin: string | null;
  comparisons: number;
  swaps: number;
  steps: number;
  highlightedIndices: number[];
  completedIndices: number[];
}

/**
 * 정렬 통계
 */
export interface SortingStats {
  comparisons: number;
  swaps: number;
  steps: number;
  timeElapsed: number;
}
