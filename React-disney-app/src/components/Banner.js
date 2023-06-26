import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import request from '../api/request'
import './Banner.css'
import { styled } from 'styled-components'

const Banner = () => {

  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

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

  // n 글자 이상이면 ...으로 표시
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  }

  if(isClicked) {
    return(
    <>
      <Container>
        <HomeContainer>
          <Iframe
            src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}
            ?controls=0&autoplay=1&mute=1&playlist=${movie?.videos?.results[0]?.key}`}
            width="640"
            height="360"
            frameborder="0"
            allow="autoplay; fullscreen"
          >
          </Iframe>
        </HomeContainer>
      </Container>
      <button onClick={() => {setIsClicked(false)}}></button>
    </>
    )
  } else {
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
            <button className="banner__button play"
              onClick={() => setIsClicked(true)}  
            >
              Play
            </button>
            }
          </div>
            
          <h1 className="banner__description">
            {truncate(movie?.overview, 100)}
          </h1>
  
        </div>
  
        <div className="banner--fadeBottom" />
  
      </header>
    )
  }

}

export default Banner

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`