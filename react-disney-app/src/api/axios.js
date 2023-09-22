import axios from "axios";

const instance = axios.create({
  // 공통 요청 경로
  baseURL: "https://api.themoviedb.org/3",
  // 공통 요청 파라미터
  params: {
    api_key: "cb10142e2ccbc510ae72235ba02c9e5e",
    language: "ko-KR"
  }
})

export default instance;