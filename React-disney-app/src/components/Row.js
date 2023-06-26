import React, { useCallback, useEffect, useState } from 'react'
import axios from '../api/axios'
import './Row.css'

const Row = ({title, id, fetchUrl}) => {
  const [movies, setMovies] = useState([]);

  // 컴포넌트가 리렌더링 될때 함수가 새로 생성되는 것을 방지하기 위해 useCallback을 사용한다.
  const fetchMovieData = useCallback( async () => {
    const res = await axios.get(fetchUrl);
    setMovies(res.data.results);
  }, [fetchUrl]) // fetchUrl 이 바뀔때마다 함수를 새로 생성
  

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData])
  
  return (
    <div>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span className='arrow'>
            {"<"}
          </span>
        </div>
        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className='row__poster'
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.name}
            />
          ))}
        </div>
        <div className='slider__arrow-right'>
          <span className='arrow'>
            {">"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Row