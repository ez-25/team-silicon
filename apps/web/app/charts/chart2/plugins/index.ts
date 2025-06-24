import { bubbleSortPlugin } from './bubble-sort';
import { quickSortPlugin } from './quick-sort';
import { insertionSortPlugin } from './insertion-sort';
import { selectionSortPlugin } from './selection-sort';
import { mergeSortPlugin } from './merge-sort';

/**
 * 빌트인 정렬 알고리즘 플러그인들
 */
export const builtInPlugins = [
  insertionSortPlugin,
  selectionSortPlugin,
  bubbleSortPlugin,
  quickSortPlugin,
  mergeSortPlugin,
];
