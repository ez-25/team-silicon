import { SortingPlugin, SortingCallbacks } from '../types/sorting';

/**
 * 퀵 정렬 플러그인
 */
export const quickSortPlugin: SortingPlugin = {
  name: 'Quick Sort',
  description: '분할 정복 기법을 사용하는 효율적인 정렬 알고리즘',
  complexity: {
    time: 'O(n log n)',
    space: 'O(log n)',
  },

  sort: async (array: number[], callbacks: SortingCallbacks) => {
    const arr = [...array];

    const quickSort = async (low: number, high: number): Promise<void> => {
      // 중단 확인
      if (callbacks.shouldStop()) return;

      if (low < high) {
        const pivotIndex = await partition(arr, low, high, callbacks);

        if (callbacks.shouldStop()) return;

        // 피벗 완료 표시
        callbacks.onComplete(pivotIndex);

        // 재귀적으로 정렬
        await quickSort(low, pivotIndex - 1);
        await quickSort(pivotIndex + 1, high);
      }
    };

    await quickSort(0, arr.length - 1);

    // 중단되지 않았다면 모든 원소 완료 표시
    if (!callbacks.shouldStop()) {
      for (let i = 0; i < arr.length; i++) {
        callbacks.onComplete(i);
      }
    }
  },
};

/**
 * 파티션 함수
 */
async function partition(
  arr: number[],
  low: number,
  high: number,
  callbacks: SortingCallbacks,
): Promise<number> {
  const pivot = arr[high] || 0;
  let i = low - 1;

  for (let j = low; j < high; j++) {
    // 중단 확인
    if (callbacks.shouldStop()) return i + 1; // 현재 상태로 반환

    // 비교 시점 콜백
    callbacks.onCompare(j, high);
    callbacks.onAccess(j);
    callbacks.onAccess(high);

    if ((arr[j] || 0) < pivot) {
      i++;
      if (i !== j) {
        callbacks.onSwap(i, j);
        [arr[i], arr[j]] = [arr[j] || 0, arr[i] || 0];
      }
    }

    // 각 단계별 상태 업데이트
    callbacks.onStep([...arr], `피벗 ${pivot}과 비교: ${arr[j] || 0}`);

    // 애니메이션을 위한 딜레이
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  // 중단 확인
  if (callbacks.shouldStop()) return i + 1;

  // 피벗을 올바른 위치로 이동
  callbacks.onSwap(i + 1, high);
  [arr[i + 1], arr[high]] = [arr[high] || 0, arr[i + 1] || 0];

  callbacks.onStep([...arr], `피벗 ${pivot}을 위치 ${i + 1}로 이동`);
  await new Promise((resolve) => setTimeout(resolve, 150));

  return i + 1;
}
