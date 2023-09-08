
### 1. 프로젝트의 실행 방법
1. git clone
2. 해당 프로젝트 경로에서
   1. ```npm install```
   ```npm run start```
   2. 터미널 하나 더 열고 같은 경로에서
   ```npm run server```
   => fake로 json-server를 사용하기 위함 
### 2.데모영상

![test1](https://github.com/wlsgus93/SerchonCRIS/assets/35252854/ccd8ed12-b36d-44f4-aeb9-1f4198d2f77d)


### 3. 기능 구현 설명
  - API 호출별로 로컬 캐싱 구현
    - 검색어를 입력하고 해당 검색어가 session storage에 캐싱 되어 있을 경우 그 해당 값을 추천 목록으로 리스팅
    - 해당 검색어가 없다면 검색어 요청(api)
    - 검색어 입력시마다 해당 검색어를 session에 저장된 만료시간과 비교하여 만료시간이 지나면 해당 검색어 storage에서 삭제 
    
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
    - Debounce(trailing edge)를 이용하여 검색 입력이 끝났을때에만 api 호출하도록 설정
    - api호출 횟수를 줄이도록 의미없는 검색어(EX:"ㅓ","ㄹ","ㅇㄲ",'asdf')등은 필터링하여 api 호출 안되도록 사전에 필터링
    
- 키보드만으로 추천 검색어들로 이동 가능하도록 구현
    - 각 추천목록의 사항에 대하여 index를 부여하고 해당 index를 방향키(위,아래)로 접근할 수 있도록 함
    - 포커싱된 index와 각 추천검색어에 대한 index가 일치할시 박스 처리 

- 검색어를 대한 추천 목록에서 볼드처리( 추천검색어를 검색어로 split한뒤 검색어를 ```<strong> ```태그로 감싸서 export 하는 함수)

