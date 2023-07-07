import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import request from '../api/request'
import styles from './Banner.module.scss'
import styled from 'styled-components'

interface Movie {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
  videos?: {
    results: {
      key: string;
    }[];
  }
}

const Banner = () => {

  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [videoPlay, setVideoPlay] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const res = await axios.get(request.fetchNowPlaying);
    console.log(res.data);
    
    const movieId = res?.data.results[Math.floor(Math.random() * res?.data.results.length)].id;

    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' }
    })
    setMovie(movieDetail);
  }

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  if(videoPlay) {
    return (
      <div className={styles.banner}>
        <VideoContainer>
          <Iframe
            src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}
            ?controls=0&autoplay=1&mute=1&playlist=${movie?.videos?.results[0]?.key}`}
            width="1920"
            height="1080"
            allow="autoplay;"
          >
          </Iframe>
        </VideoContainer>
      </div>
    )
  } else {
    return (
      <header
        className={styles.banner}
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={styles.banner__contents}>
          <h1 className={styles.banner__title}>{movie?.title || movie?.original_title}</h1>
  
          <div className={styles.banner__buttons}>
            {
              movie?.videos?.results[0]?.key && (
                <button 
                  className={styles.banner__button}
                  onClick={() => setVideoPlay(true)}
                > Play
                </button>
              )
            }
          </div>
  
          <h1 className={styles.banner__description}>{truncate(movie?.overview, 100)}</h1>
        </div>
  
        <div className={styles.banner__fadeBottom} />
  
      </header>
    )
  }

  
}

export default Banner

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`