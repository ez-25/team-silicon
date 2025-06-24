import { SortingPlugin, SortingCallbacks } from '../types/sorting';

/**
 * 삽입 정렬 플러그인
 */
export const insertionSortPlugin: SortingPlugin = {
  name: 'Insertion Sort',
  description: '정렬된 부분에 원소를 하나씩 삽입하는 정렬 알고리즘',
  complexity: {
    time: 'O(n²)',
    space: 'O(1)',
  },

  sort: async (array: number[], callbacks: SortingCallbacks) => {
    const arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      // 중단 확인
      if (callbacks.shouldStop()) return;

      const key = arr[i] || 0;
      let j = i - 1;

      // 현재 삽입할 원소에 접근
      callbacks.onAccess(i);
      callbacks.onStep([...arr], `키 ${key}를 정렬된 부분에 삽입`);
      await new Promise((resolve) => setTimeout(resolve, 150));

      // 정렬된 부분에서 올바른 위치 찾기
      while (j >= 0 && arr[j] > key) {
        // 중단 확인
        if (callbacks.shouldStop()) return;

        // 비교 및 접근
        callbacks.onCompare(j, i);
        callbacks.onAccess(j);

        // 원소를 오른쪽으로 이동
        arr[j + 1] = arr[j] || 0;
        callbacks.onSwap(j, j + 1);

        callbacks.onStep([...arr], `${arr[j] || 0}을 오른쪽으로 이동`);
        await new Promise((resolve) => setTimeout(resolve, 150));

        j--;
      }

      // 키를 올바른 위치에 삽입
      arr[j + 1] = key;
      callbacks.onStep([...arr], `키 ${key}를 위치 ${j + 1}에 삽입`);
      await new Promise((resolve) => setTimeout(resolve, 150));

      // 삽입 완료된 위치 표시
      callbacks.onComplete(j + 1);
    }

    // 중단되지 않았다면 모든 원소 완료 표시
    if (!callbacks.shouldStop()) {
      for (let i = 0; i < arr.length; i++) {
        callbacks.onComplete(i);
      }
    }
  },
};