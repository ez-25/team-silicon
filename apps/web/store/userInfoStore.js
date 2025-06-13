import { create } from 'zustand';

/**
 * 학생 추가 폼의 입력값, 에러 메시지 등을 전역 관리하는 zustand store
 */
export const useUserInfoStore = create((set) => ({
  userInfo: {
    name: 'baby',
    age: 0,
  },
  setUserInfo: (userInfo) => set({ userInfo }),
  reset: () => set({ userInfo: { name: 'baby', age: 0 } }),
}));
