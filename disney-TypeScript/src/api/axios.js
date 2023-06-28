import axios from 'axios'

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "cb10142e2ccbc510ae72235ba02c9e5e",
    language: "ko-KR"
  }
})

export default instance