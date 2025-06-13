// 핵심 fetch 유틸리티 및 관련 함수/클래스 (apiCommon.ts JS 포팅)

/**
 * HTTP 에러를 나타내는 커스텀 에러 클래스
 * @class
 * @extends Error
 * @param {number} status - HTTP 상태 코드
 * @param {string} statusText - HTTP 상태 텍스트
 * @param {object} body - 에러 응답 본문 (JSON 객체)
 */
export class HttpError extends Error {
  constructor(status, statusText, body) {
    // 에러 메시지는 body.message, statusText, status 순으로 우선 사용
    super((body && body.message) || statusText || String(status));
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}

/**
 * 객체가 비어있는지 확인하는 헬퍼 함수
 * @param {any} obj - 검사할 객체 또는 값
 * @returns {boolean} - 객체가 null/undefined 이거나 배열/객체가 비어있으면 true, 아니면 false
 */
export function isEmpty(obj) {
  if (obj == null) return true; // null 또는 undefined 인 경우 비어있음
  if (Array.isArray(obj)) return obj.length === 0; // 배열이면 길이 검사
  if (typeof obj === 'object') return Object.keys(obj).length === 0; // 객체면 키 개수 검사
  return false; // 그 외 타입은 비어있지 않음으로 간주
}

// HTTP 메소드 상수
export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

export const METHODS = [
  METHOD.GET,
  METHOD.POST,
  METHOD.PUT,
  METHOD.DELETE,
  METHOD.PATCH,
];

/**
 * 커스텀 fetch 유틸리티 생성 함수
 * @param {object} optionsDefault - 기본 옵션 객체, baseUrl 및 headers 포함 가능
 * @param {string} [optionsDefault.baseUrl] - 기본 API 베이스 URL
 * @param {object} [optionsDefault.headers] - 기본 HTTP 헤더 객체
 * @returns {object} - fetch, setHeaders, setHeader, addHeaders, getHeaders 메소드를 포함한 객체 반환
 */
export function createCustomFetch(optionsDefault) {
  const baseUrl = optionsDefault && optionsDefault.baseUrl;
  const headers = optionsDefault && optionsDefault.headers;
  const data = {
    fetchOptions: (() => {
      const r = {};
      if (headers) {
        Object.assign(r, { headers });
      }
      return r;
    })(),
    customFetchOptions: {
      baseUrl,
    },
  };

  return {
    /**
     * 커스텀 fetch 함수
     * @param {string} endpoint - 요청할 API 엔드포인트 경로
     * @param {object} [fetchOptions={}] - fetch 호출 시 옵션 (method, headers 등)
     * @returns {Promise<Response>} - fetch의 Response 객체를 반환하는 프로미스
     * @throws {HttpError} - HTTP 응답이 ok가 아닐 경우 HttpError 발생
     */
    fetch: (endpoint, fetchOptions = {}) => {
      // baseUrl이 있으면 결합하여 전체 URL 생성
      const fullUrl = data.customFetchOptions.baseUrl
        ? `${data.customFetchOptions.baseUrl}${endpoint}`
        : endpoint;

      // 헤더 병합: 기본 헤더 + 함수 호출 시 전달된 헤더
      const optionsThis = Object.assign(
        {},
        data.fetchOptions,
        fetchOptions,
        (() => {
          const hds = {};
          if (data.fetchOptions.headers) {
            Object.assign(hds, data.fetchOptions.headers);
          }
          if (fetchOptions.headers) {
            Object.assign(hds, fetchOptions.headers);
          }
          if (isEmpty(hds)) {
            return {};
          }
          return { headers: hds };
        })(),
      );

      // fetch 호출 및 응답 처리
      return fetch(fullUrl, optionsThis)
        .then(async (response) => {
          // 응답이 실패일 경우 에러 처리
          if (!response.ok) {
            let errorBody;
            try {
              // 응답 본문을 JSON으로 파싱 시도
              errorBody = await response.json();
            } catch {
              // 파싱 실패 시 빈 객체 할당
              errorBody = {};
            }
            // HttpError 인스턴스 던지기
            throw new HttpError(
              response.status,
              response.statusText,
              errorBody,
            );
          }
          // 성공 시 Response 객체 반환
          return response;
        })
        .catch((error) => {
          // fetch 호출 중 발생한 에러 콘솔 출력 후 재던짐
          console.error('Fetch error:', error);
          throw error;
        });
    },

    /**
     * 기본 헤더를 새로 설정하는 함수
     * @param {object} headers - 새로 설정할 헤더 객체
     * @returns {object} - 설정된 헤더 객체 반환
     */
    setHeaders: (headers) => {
      data.fetchOptions.headers = Object.assign({}, headers);
      return data.fetchOptions.headers;
    },

    /**
     * 특정 헤더 키-값을 설정 또는 추가하는 함수
     * @param {string} key - 헤더 키
     * @param {string} value - 헤더 값
     * @returns {object} - 변경된 헤더 객체 반환
     */
    setHeader: (key, value) => {
      if (data.fetchOptions.headers === undefined) {
        data.fetchOptions.headers = { [key]: value };
        return data.fetchOptions.headers;
      }
      data.fetchOptions.headers = Object.assign({}, data.fetchOptions.headers, {
        [key]: value,
      });
      return data.fetchOptions.headers;
    },

    /**
     * 기존 헤더에 여러 헤더를 추가하는 함수
     * @param {object} headers - 추가할 헤더 객체
     * @returns {object} - 변경된 헤더 객체 반환
     */
    addHeaders: (headers) => {
      data.fetchOptions.headers = Object.assign(
        {},
        data.fetchOptions.headers,
        headers,
      );
      return data.fetchOptions.headers;
    },

    /**
     * 현재 설정된 헤더를 복사하여 반환하는 함수
     * @returns {object} - 현재 설정된 헤더 객체 복사본
     */
    getHeaders: () => {
      return Object.assign({}, data.fetchOptions.headers || {});
    },
  };
}

/**
 * API 호출 메소드 생성 함수
 * @param {object} customFetch - createCustomFetch로 생성된 객체
 * @param {string} method - HTTP 메소드 (GET, POST, PUT, DELETE, PATCH)
 * @returns {function(string, object=): Promise<any>} - JSON 응답을 반환하는 API 호출 함수
 */
export function makeApiMethod(customFetch, method) {
  /**
   * API 호출 함수
   * @param {string} endpoint - 호출할 API 엔드포인트 경로
   * @param {object} [fetchOptions] - fetch 옵션 (헤더, 바디 등)
   * @returns {Promise<any>} - JSON 파싱된 응답 데이터 반환 프로미스
   * @throws {HttpError|Error} - HTTP 에러 또는 기타 에러 발생 시 던짐
   */
  return function (endpoint, fetchOptions) {
    return customFetch
      .fetch(endpoint, Object.assign({}, fetchOptions, { method }))
      .then((res) => res.json()) // 성공 시 JSON 파싱
      .catch((error) => {
        // HttpError 인스턴스면 그대로 던지고, 아니면 일반 에러 던짐
        if (error instanceof HttpError) {
          throw error;
        }
        throw error;
      });
  };
}

/**
 * 모든 HTTP 메소드에 대한 fetch 함수들을 생성하는 함수
 * @param {object} customFetch - createCustomFetch로 생성된 객체
 * @returns {object} - get, post, put, deleteFetch, patch 메소드가 포함된 객체 반환
 */
export function makeFetchMethods(customFetch) {
  return {
    get: makeApiMethod(customFetch, METHOD.GET),
    post: makeApiMethod(customFetch, METHOD.POST),
    put: makeApiMethod(customFetch, METHOD.PUT),
    deleteFetch: makeApiMethod(customFetch, METHOD.DELETE),
    patch: makeApiMethod(customFetch, METHOD.PATCH),
  };
}

/**
 * 다양한 형태의 에러 객체에서 사용자 친화적인 에러 메시지를 추출하는 함수
 * @param {any} error - 에러 객체
 * @returns {string} - 추출된 에러 메시지 문자열
 */
export function toErrorMsg(error) {
  if (error && error.body && error.body.message) {
    return error.body.message;
  } else if (error && error.message) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  }
  return '알 수 없는 에러가 발생했습니다.';
}
