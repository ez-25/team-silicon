import { SortingPlugin, SortingCallbacks } from '../types/sorting';

/**
 * 병합 정렬 플러그인
 */
export const mergeSortPlugin: SortingPlugin = {
  name: 'Merge Sort',
  description: '분할 정복 기법을 사용하여 안정적으로 정렬하는 알고리즘',
  complexity: {
    time: 'O(n log n)',
    space: 'O(n)',
  },

  sort: async (array: number[], callbacks: SortingCallbacks) => {
    const arr = [...array];

    const mergeSort = async (
      tempArr: number[],
      left: number,
      right: number,
    ): Promise<void> => {
      // 중단 확인
      if (callbacks.shouldStop()) return;

      if (left >= right) return;

      const mid = Math.floor((left + right) / 2);

      // 분할 단계 시각화
      callbacks.onStep([...arr], `구간 [${left}, ${right}]를 [${left}, ${mid}]와 [${mid + 1}, ${right}]로 분할`);
      await new Promise((resolve) => setTimeout(resolve, callbacks.getAnimationSpeed() * 1.5));

      // 왼쪽 절반 정렬
      await mergeSort(tempArr, left, mid);
      if (callbacks.shouldStop()) return;

      // 오른쪽 절반 정렬
      await mergeSort(tempArr, mid + 1, right);
      if (callbacks.shouldStop()) return;

      // 병합
      await merge(tempArr, left, mid, right, callbacks);
    };

    const merge = async (
      tempArr: number[],
      left: number,
      mid: number,
      right: number,
      callbacks: SortingCallbacks,
    ): Promise<void> => {
      // 임시 배열에 복사
      for (let i = left; i <= right; i++) {
        tempArr[i] = arr[i] || 0;
      }

      let i = left; // 왼쪽 부분의 시작 인덱스
      let j = mid + 1; // 오른쪽 부분의 시작 인덱스
      let k = left; // 병합된 배열의 인덱스

      callbacks.onStep([...arr], `구간 [${left}, ${mid}]와 [${mid + 1}, ${right}] 병합 시작`);
      await new Promise((resolve) => setTimeout(resolve, callbacks.getAnimationSpeed() * 1.5));

      // 두 부분을 비교하여 병합
      while (i <= mid && j <= right) {
        // 중단 확인
        if (callbacks.shouldStop()) return;

        callbacks.onCompare(i, j);
        callbacks.onAccess(i);
        callbacks.onAccess(j);

        if ((tempArr[i] || 0) <= (tempArr[j] || 0)) {
          arr[k] = tempArr[i] || 0;
          callbacks.onStep([...arr], `${tempArr[i] || 0}을 위치 ${k}에 배치`);
          i++;
        } else {
          arr[k] = tempArr[j] || 0;
          callbacks.onStep([...arr], `${tempArr[j] || 0}을 위치 ${k}에 배치`);
          j++;
        }

        callbacks.onAccess(k);
        k++;
        await new Promise((resolve) => setTimeout(resolve, callbacks.getAnimationSpeed()));
      }

      // 왼쪽 부분에 남은 원소들 복사
      while (i <= mid) {
        if (callbacks.shouldStop()) return;
        arr[k] = tempArr[i] || 0;
        callbacks.onAccess(k);
        callbacks.onStep([...arr], `남은 원소 ${tempArr[i] || 0}을 위치 ${k}에 배치`);
        i++;
        k++;
        await new Promise((resolve) => setTimeout(resolve, callbacks.getAnimationSpeed()));
      }

      // 오른쪽 부분에 남은 원소들 복사
      while (j <= right) {
        if (callbacks.shouldStop()) return;
        arr[k] = tempArr[j] || 0;
        callbacks.onAccess(k);
        callbacks.onStep([...arr], `남은 원소 ${tempArr[j] || 0}을 위치 ${k}에 배치`);
        j++;
        k++;
        await new Promise((resolve) => setTimeout(resolve, callbacks.getAnimationSpeed()));
      }

      // 병합 완료된 구간 표시
      for (let idx = left; idx <= right; idx++) {
        callbacks.onComplete(idx);
      }

      callbacks.onStep([...arr], `구간 [${left}, ${right}] 병합 완료`);
      await new Promise((resolve) => setTimeout(resolve, callbacks.getAnimationSpeed() * 1.5));
    };

    // 임시 배열 생성
    const tempArr = new Array(arr.length);
    await mergeSort(tempArr, 0, arr.length - 1);

    // 중단되지 않았다면 모든 원소 완료 표시
    if (!callbacks.shouldStop()) {
      for (let i = 0; i < arr.length; i++) {
        callbacks.onComplete(i);
      }
    }
  },
};