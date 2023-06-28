import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import request from '../api/request'
import styles from './Banner.module.scss'

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

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const res = await axios.get(request.fetchTrending);
    const movieId = res?.data.results[Math.floor(Math.random() * res?.data.results.length)].id;

    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' }
    })
    setMovie(movieDetail);
  }

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header
      className={styles.banner}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className={styles.banner__contents}>
        <h1 className={styles.banner__title}>{movie?.title || movie?.original_title}</h1>

        <div className={styles.banner__buttons}>
          {
            movie?.videos?.results[0]?.key && (
              <button className={styles.banner__button}>Play</button>
            )
          }
        </div>

        <h1 className={styles.banner__description}>{truncate(movie?.overview, 100)}</h1>
      </div>

      <div className="banner--fadeBottom" />

    </header>
  )
}

export default Banner