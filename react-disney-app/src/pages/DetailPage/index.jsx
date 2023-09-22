import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const DetailPage = () => {

  let { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `/movie/${movieId}`
      )
      console.log(res.data);
      setMovie(res.data);
    }
    fetchData();
  }, [movieId])

  if(!movie) return null;

  return (
    <section>
      <img 
        className='modal__poster-img'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt='poster'
      />
    </section>
  )
}

export default DetailPage