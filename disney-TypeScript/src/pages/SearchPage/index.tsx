import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { styled } from 'styled-components'
import styles from './SearchPage.module.scss'
import useDebounce from 'hooks/useDebounce';
import RowModal from 'components/Modal/RowModal';

type Movie = {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  name: string;
  first_air_date: string;
  poster_path: string;
  title: string;
  release_date: string;
}

const SearchPage = () => {
  const [searchMovie, setSearchMovie] = useState<Movie[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectMovie, setSelectMovie] = useState<Movie>({} as Movie);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  let query = useQuery();
  const searchTerm : string | null = query.get('query')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if(debouncedSearchTerm) {
      fetchSearch(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])

  const fetchSearch = async (debouncedSearchTerm : string | null) => {
    const res = await axios.get(`/search/multi?include_adult=false&query=${debouncedSearchTerm}`)
    setSearchMovie(res.data.results)
    console.log(res.data.results)
  }

  if(searchMovie.length > 0) {
    return (
      <Container>
        {searchMovie.map((movie : Movie) => {
          if(movie.backdrop_path !== null && movie.backdrop_path !== undefined) {
            const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
            return (
              <div className={styles.movie} key={movie.id}>
                <div className={styles.movie__img}>
                  <img 
                    src={imgUrl} 
                    alt={movie.title}
                    onClick={() => {
                      setModalOpen(true)
                      setSelectMovie(movie)
                    }}
                  />
                </div>
              </div>
            )
          }
          return null
        })}

        {
          modalOpen && (
            <RowModal
              selectMovie={selectMovie}
              setModalOpen={setModalOpen}
            />
          )
          
        }

      </Container>
    )
  }
  else {
    return (
      <div className={styles.not__search}>
        <div className='not__search__text'>
          <p>{searchTerm}을 찾지 못했습니다</p>
        </div>
      </div>
    )
  }
}

export default SearchPage

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #111;
`