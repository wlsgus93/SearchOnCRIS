export class SessionStorageManager {
  // 생성자 함수
  constructor() {}

  // 세션 스토리지에 값을 저장하는 메서드
  setItem(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // 세션 스토리지에서 값을 가져오는 메서드
  getItem(key) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // 세션 스토리지에서 특정 키의 값을 삭제하는 메서드
  removeItem(key) {
    sessionStorage.removeItem(key);
  }

  // 세션 스토리지를 비우는 메서드
  clear() {
    sessionStorage.clear();
  }
}


//key1 :recently => value: [암]
//key2:검색어=> value2: { expiretime: '2023-12-31', recommend: [30, 31, 32] };


