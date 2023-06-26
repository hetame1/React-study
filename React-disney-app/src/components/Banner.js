import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import request from '../api/request'

const Banner = () => {

  const [movie, setMovie] = useState([])

  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    // 현재 상영중인 영화 목록 가져오기
    const res = await axios.get(request.fetchNowPlaying)
    // 랜덤으로 영화 아이디 하나 고르기
    const movieId = res.data.results[Math.floor(Math.random() * res.data.results.length)].id
    
    // 고른 영화 아이디로 영화 정보 가져오기
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      // 추가로 videos 정보도 가져오기
      params: { append_to_response: 'videos' }
    })
    setMovie(movieDetail)
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center'
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          {
          movie?.videos?.results[0]?.key && 
          <button className="banner__button play">
            Play
          </button>
          }
        </div>
          
        <h1 className="banner__description">
          {movie?.overview}
        </h1>

      </div>
      <div className="banner--fadeBottom" />
    </header>
  )
}

export default Banner