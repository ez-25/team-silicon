import { SortingPlugin, SortingCallbacks } from '../types/sorting';

/**
 * 선택 정렬 플러그인
 */
export const selectionSortPlugin: SortingPlugin = {
  name: 'Selection Sort',
  description: '매번 최솟값을 찾아 앞쪽으로 이동시키는 정렬 알고리즘',
  complexity: {
    time: 'O(n²)',
    space: 'O(1)',
  },

  sort: async (array: number[], callbacks: SortingCallbacks) => {
    const arr = [...array];

    for (let i = 0; i < arr.length - 1; i++) {
      // 중단 확인
      if (callbacks.shouldStop()) return;

      let minIndex = i;
      callbacks.onAccess(i);
      callbacks.onStep([...arr], `위치 ${i}부터 최솟값 찾기 시작`);
      await new Promise((resolve) => setTimeout(resolve, 150));

      // 최솟값 찾기
      for (let j = i + 1; j < arr.length; j++) {
        // 중단 확인
        if (callbacks.shouldStop()) return;

        callbacks.onCompare(j, minIndex);
        callbacks.onAccess(j);
        callbacks.onAccess(minIndex);

        if ((arr[j] || 0) < (arr[minIndex] || 0)) {
          minIndex = j;
          callbacks.onStep([...arr], `새로운 최솟값 ${arr[j] || 0} 발견 (위치 ${j})`);
        } else {
          callbacks.onStep([...arr], `${arr[j] || 0}와 ${arr[minIndex] || 0} 비교`);
        }

        await new Promise((resolve) => setTimeout(resolve, 150));
      }

      // 최솟값을 올바른 위치로 이동
      if (minIndex !== i) {
        callbacks.onSwap(i, minIndex);
        [arr[i], arr[minIndex]] = [arr[minIndex] || 0, arr[i] || 0];
        callbacks.onStep([...arr], `최솟값 ${arr[i] || 0}을 위치 ${i}로 이동`);
      } else {
        callbacks.onStep([...arr], `이미 올바른 위치에 있음`);
      }

      // 정렬 완료된 위치 표시
      callbacks.onComplete(i);
      await new Promise((resolve) => setTimeout(resolve, 150));
    }

    // 중단되지 않았다면 마지막 원소도 완료 표시
    if (!callbacks.shouldStop()) {
      callbacks.onComplete(arr.length - 1);
    }
  },
};