import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchPage.css'
import { useDebounce } from '../../hooks/useDebounce';

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState([]);

  // 주소창에서 검색어 읽어오기
  const useQuery = () => {
    console.log(useLocation().search);
    return new URLSearchParams(useLocation().search);
  }
  
  // 검색어에서 query=값만 가져오기
  let query = useQuery();
  const searchTerm = query.get("query")
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();

  useEffect(() => {
    if(debouncedSearchTerm) {
      fetchSearchMoive(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm])

  const fetchSearchMoive = async (debouncedSearchTerm) => {
    try {
      const res = await axios.get(`/search/multi?include_adult=false&query=${debouncedSearchTerm}`)
      setSearchResult(res.data.results)
    }
    catch(error) {
      console.log(error);
    }
  }

  if(searchResult.length > 0) {
    return (
      <section className='search-container'>
        {searchResult.map((movie) => {
          if(movie.backdrop_path != null && movie.media_type !== "person") {
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className='movie' key={movie.id}>
                <div className='movie__column-poster' onClick={() => navigate(`/${movie.id}`)}>
                  <img src={movieImageUrl} alt='movie' className='movie__poster' />
                </div>
              </div>
            )
          }
          return null;
        })} 
      </section>
    )
  } else {
    return (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>
            찾고자하는 검색어 "{searchTerm}"에 대한 검색결과가 없습니다.
          </p>
        </div>
      </section>
    )
  }
}

export default SearchPage