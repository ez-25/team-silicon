# 정렬 알고리즘 시각화 및 청각화 데모 PoC 앱 명세

[아이디어 발표 슬라이드](./정렬%20알고리즘%20시각%20및%20청각화%20구현.pdf)를 먼저 참고 바랍니다.

## 프로젝트 요구사항

- 웹 프런트엔드 서비스 개발 강의 자율 구현과제
- 5일 안에 PoC 규모로 완성 필요
- 정렬 알고리즘을 플러그인으로 읽어들일 수 있는 구조
- 시각화 + 청각화 (항목 크기에 따른 음의 높이 변화)
- 모든 정렬 알고리즘과 호환되는 플러그인 인터페이스 설계

## 참고 자료

- [The Sound of Sorting - "Audibilization" and Visualization of Sorting Algorithms](https://panthema.net/2013/sound-of-sorting)
  - ["15 Sorting Algorithms in 6 Minutes"](https://youtu.be/kPRA0W1kECg) 영상
- https://mszula.github.io/visual-sorting/ (모범 구현체)

## 기술 스택

현재 구성된 프로젝트 구조를 바탕으로 정렬 시각화 기능을 구현해주세요.

- Next.js 15+ Turborepo 모노레포
- Material-UI v7, @mui/x-charts
- TypeScript, 이미 설정된 개발 환경
- 기존 apps/web/ 구조 활용

## 구현해야 하는 기능

1. 정렬 시각화 컴포넌트 (막대 차트 형태)
2. 알고리즘 선택 및 제어 UI
3. 플러그인 시스템 (다양한 정렬 알고리즘 지원)
4. Web Audio API 활용한 청각화
5. 실시간 통계 (비교/교환 횟수 등)

## 서비스 아키텍쳐 설계하기

해당 웹 프런트엔드 서비스는 정렬 알고리즘 구현체를 플러그인으로써 읽어들일 수 있어야 합니다. 읽어들이는 플러그인 인터페이스는 어떤 정렬 알고리즘이든 호환이 되어야 하도록 설계해야 합니다.

### 1. 플러그인 인터페이스 설계 철학

- **범용성 (Universality)**

  - 모든 종류의 정렬 알고리즘 (O(n²), O(n log n), 특이한 알고리즘)이 동일한 인터페이스로 작동
  - 알고리즘의 내부 구현에 관계없이 시각화 엔진이 동작할 수 있도록 추상화

- **확장성 (Extensibility)**

  - 새로운 정렬 알고리즘을 추가할 때 기존 코드 수정 없이 플러그인만 추가
  - 사용자가 직접 정렬 알고리즘을 작성해서 플러그인으로 등록 가능

### 2. 플러그인 인터페이스 구조 예

```typescript
interface SortingPlugin {
  // 메타데이터
  name: string; // "Bubble Sort", "Quick Sort" 등
  description: string; // 알고리즘 설명
  complexity: {
    time: string; // "O(n²)", "O(n log n)" 등
    space: string; // 공간 복잡도
  };

  // 정렬 실행 함수
  sort: (array: number[], callbacks: SortingCallbacks) => Promise<void> | void;
}

interface SortingCallbacks {
  // 시각화를 위한 콜백 함수들
  onCompare: (indexA: number, indexB: number) => void; // 비교 시점
  onSwap: (indexA: number, indexB: number) => void; // 교환 시점
  onAccess: (index: number) => void; // 배열 접근 시점
  onComplete: (index: number) => void; // 정렬 완료된 원소
  onStep: (currentArray: number[], step: string) => void; // 각 단계별 상태
}
```

### 3. 플러그인 등록 및 관리 시스템 예

```typescript
class SortingPluginManager {
  private plugins: Map<string, SortingPlugin> = new Map();

  // 플러그인 등록
  registerPlugin(plugin: SortingPlugin): void;

  // 플러그인 목록 조회
  getAvailablePlugins(): SortingPlugin[];

  // 특정 플러그인 실행
  executeSort(pluginName: string, array: number[]): Promise<void>;
}
```

### 4. 구체적인 구현 예시

**Bubble Sort 플러그인:**

```typescript
const bubbleSortPlugin: SortingPlugin = {
  name: 'Bubble Sort',
  description: '인접한 원소들을 비교하여 정렬하는 간단한 알고리즘',
  complexity: { time: 'O(n²)', space: 'O(1)' },

  sort: async (array: number[], callbacks: SortingCallbacks) => {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        callbacks.onCompare(j, j + 1);
        if (arr[j] > arr[j + 1]) {
          callbacks.onSwap(j, j + 1);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
        callbacks.onStep([...arr], `비교: ${j}번째와 ${j + 1}번째`);
        await new Promise((resolve) => setTimeout(resolve, 100)); // 애니메이션 딜레이
      }
      callbacks.onComplete(arr.length - i - 1);
    }
  },
};
```

### 5. 플러그인 불러오기

#### 정적 로딩 예

```typescript
// plugins/index.ts
export const builtInPlugins = [
  bubbleSortPlugin,
  quickSortPlugin,
  mergeSortPlugin,
  // ... 기본 제공 알고리즘들
];
```

#### 동적 로딩 예 (런타임, 백로그 기능)

```typescript
// 사용자가 업로드한 플러그인 파일 로딩
async function loadUserPlugin(pluginCode: string): Promise<SortingPlugin> {
  // 안전한 코드 실행 환경에서 플러그인 로드
  const plugin = eval(`(${pluginCode})`);
  return plugin;
}
```

### 6. 플러그인 검증 시스템 예

```typescript
function validatePlugin(plugin: SortingPlugin): boolean {
  // 필수 속성 확인
  if (!plugin.name || !plugin.sort) return false;

  // 정렬 함수 시그니처 확인
  if (typeof plugin.sort !== 'function') return false;

  // 안전성 검사 (악성 코드 방지)
  // ...

  return true;
}
```

### 7. 실제 기대하는 사용 흐름

1. **플러그인 등록**: 웹 페이지 로드 시 빌트인 플러그인을 불러옴
2. **UI에서 선택**: 사용자가 버튼 그룹을 통해 특정 정렬 알고리즘 선택, 버튼 그룹에 등록된 알고리즘의 순서는 플러그인을 주입한 배열의 색인값을 따릅니다. 기본으로 선택한 정렬 알고리즘은 첫번째로 색인된 정렬 알고리즘 플러그인입니다.
3. **실행**: 선택된 플러그인의 `sort` 함수 호출
4. **시각화 및 청각화**: 콜백 함수들을 통해 실시간으로 정렬 과정을 시각 및 eb Audio API 활용한 청각화함
5. **통계**: 비교/교환 횟수 등을 자동으로 카운팅

이런 구조로 설계하면 어떤 정렬 알고리즘이든 동일한 방식으로 시각화할 수 있고, 사용자가 새로운 알고리즘을 쉽게 추가할 수 있습니다.
