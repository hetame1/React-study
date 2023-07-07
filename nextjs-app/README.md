# NEXT JS

## NEXT JS란?

- React의 SSR(Server Side Rendering)을 도와주는 프레임워크

### SSR(Server Side Rendering)이란?

- 서버에서 렌더링 해주는 것을 의미

- React는 CSR(Client Side Rendering)을 기본으로 하고 있음

- 사용자와 검색 엔진 크롤러에게 페이지를 보여줄 때 유용

- 검색 엔진 최적화(SEO)에 유리

## Data Fetching

### getStaticProps

- 빌드 시점에 데이터를 가져옴 (미리 만들어줌)

- 사용해야 할 때
1. 페이지를 렌더링하는 데 필요한 데이터는 사용자의 요청보다 먼저 build 시간에 필요한 데이터를 가져올 때
2. 데이터는 Headless CMS(콘텐츠 관리 시스템)에서 가져오는 경우
3. 데이터를 공개적으로 캐시할 수 있을 때(사용자별 아님)
4. 데이터는 미리 렌더링 되어야 하고(SEO의 경우) 매우 빨리해야 할때

### getStaticPaths

- 동적 라우팅이 필요할 때 사용

- 빌드 시점에 미리 만들어줌

**paths**

- 어떠한 경로가 pre-render 될지를 결정합니다

- 만약 pages/posts/[id].js 라는 이름의 동적 라우팅을 사용하는 페이지가 있다면

```js
return (
  paths: [
    { params: { id: '1' } },
    { params: { id: '2' } },
    { params: { id: '3' } },
  ],
  fallback: ...
  // false: paths에 없는 경로는 404 page로 이동
  // true: paths에 없는 경로는 404 page로 이동하지 않고, fallback 페이지를 보여줌
)
```

### getServerSideProps

- 매 요청마다 데이터를 가져옴

- 사용해야 할 때
1. 데이터가 항상 최신 상태여야 할 때
2. 요청이 들어올 때마다 데이터를 가져와야 할 때
3. 데이터를 캐시할 수 없을 때
4. 데이터를 사용자별로 캐시해야 할 때
5. SEO에 중요하지 않은 경우