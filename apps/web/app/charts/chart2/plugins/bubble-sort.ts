import { SortingPlugin, SortingCallbacks } from '../types/sorting';

/**
 * 버블 정렬 플러그인
 */
export const bubbleSortPlugin: SortingPlugin = {
  name: 'Bubble Sort',
  description: '인접한 원소들을 비교하여 정렬하는 간단한 알고리즘',
  complexity: {
    time: 'O(n²)',
    space: 'O(1)',
  },

  sort: async (array: number[], callbacks: SortingCallbacks) => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      // 중단 확인
      if (callbacks.shouldStop()) return;

      for (let j = 0; j < n - i - 1; j++) {
        if (callbacks.shouldStop()) return;

        // 비교 시점 콜백
        callbacks.onCompare(j, j + 1);
        callbacks.onAccess(j);
        callbacks.onAccess(j + 1);

        if ((arr[j] || 0) > (arr[j + 1] || 0)) {
          // 교환 시점 콜백
          callbacks.onSwap(j, j + 1);
          [arr[j], arr[j + 1]] = [arr[j + 1] || 0, arr[j] || 0];
        }

        // 각 단계별 상태 업데이트
        callbacks.onStep([...arr], `비교: ${j}번째와 ${j + 1}번째`);

        // 애니메이션을 위한 딜레이
        await new Promise((resolve) => setTimeout(resolve, callbacks.getAnimationSpeed()));
      }

      // 정렬 완료된 원소 표시
      callbacks.onComplete(n - i - 1);
    }
  },
};
