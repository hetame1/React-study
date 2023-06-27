import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  
  // 주소창에서 검색어 읽어오기
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  // 검색어에서 q=값만 가져오기
  let query = useQuery();
  const searchTerm = query.get("q")

  useEffect(() => {
    if(searchTerm) {
      fetchSearchMoive(searchTerm);
    } else {
      console.log("검색어가 없습니다.");
    }
  }, [searchTerm])

  const fetchSearchMoive = async (searchTerm) => {
    try {
      const res = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`)
      setSearchResult(res.data.results)
      console.log(res);
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <div>{}</div>
  )
}

export default SearchPage