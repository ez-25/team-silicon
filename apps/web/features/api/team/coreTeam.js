import {
  createCustomFetch,
  makeFetchMethods,
} from '@/shared/fetch/customFetch';

// 환경에 맞게 경로 세팅
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4002';
const PRE_PATH = ''; // 실제 API 엔드포인트에 맞게 조정
const BASE_URL = `${API_BASE_URL}${PRE_PATH}`;

// fetch 인스턴스 생성
export const fetchTeam = createCustomFetch({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API 메서드 생성
const methods = makeFetchMethods(fetchTeam);

// 401 등 인증 에러 핸들러(필요시 커스텀)
const UNAUTHORIZED_STATUS = 401;

const handleResponse = async (promise) => {
  try {
    const response = await promise;
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 아래는 coreOptimize.ts와 같은 스타일의 래핑 메서드
export const get = (endpoint, fetchOptions) =>
  handleResponse(methods.get(endpoint, fetchOptions));
export const put = (endpoint, fetchOptions) =>
  handleResponse(methods.put(endpoint, fetchOptions));
export const post = (endpoint, fetchOptions) =>
  handleResponse(methods.post(endpoint, fetchOptions));
export const patch = (endpoint, fetchOptions) =>
  handleResponse(methods.patch(endpoint, fetchOptions));
export const deleteFetch = (endpoint, fetchOptions) =>
  handleResponse(methods.deleteFetch(endpoint, fetchOptions));
