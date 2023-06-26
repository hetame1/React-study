## 1. The Movie DB API Key 생성하기

## 2. Axios 생성 및 요청 보내기

### Axios 란 무엇인가

- 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리

- 백엔드랑 프론트엔드랑 통신을 쉽게하기 위해 Ajax와 더불어 사용

## 3. 메인 페이지 구조 만들기

- Nav, Banner, Row, Footer 컴포넌트 생성

- React에 styled-components라는게 있는데 이걸 이용해서 스타일이 적용된 태그를 만들어서 사용하여 파일의 가독성을 높임

- const 변수명 = styled.태그명`스타일` 로 사용

## 4. Nav 만들기

- styled-components를 이용하여 Nav 컴포넌트 생성

- 스크롤시 NavBar 색상 변경 (window.scrollY)

- styled-components에 props를 전달하여 props에 따라 스타일 변경

## 5.Container 만들기

## 6. 영화 데이터 가져오고 Banner 만들기

- 비동기를 통해 async await을 이용해 데이터를 가져옴

- useEffect를 이용해 컴포넌트가 마운트 되었을 때 데이터를 가져옴

- 미리 만들어놓은 axios, request를 이용해 데이터를 가져옴

- 그 가져온 데이터에서 랜덤으로 id 값을 가져오고 그 id값을 이용해 더 상세한 데이터를 가져옴

- 버튼 클릭을 하면 리턴하는 값을 바꾸고 iframe을 이용해 영상 재생

- iframe은 다른 HTML 페이지를 현재 페이지에 포함시키는 중첩된 브라우저로 해당 웹 페이지 안에 어떠한 제한 없이 다른 페이지를 불러와서 삽입 할 수 있음

## 7. 카테고리 만들기

- grid를 이용해 카테고리를 만들고 각 카테고리에 마우스를 올리면 영상 재생

## 8. row 만들기

- row를 4개 만드는데 만들때 props 를 전달하여 생성

- background-clip : 배경을 얼마나 채울지 결정
  - content-box : 테두리 안쪽에 배경을 채움
  - padding-box : 테두리와 안쪽 여백 안쪽에 배경을 채움
  - border-box : 테두리 안쪽에 배경을 채움 (default)
