import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import axios from '../api/axios'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import RowModal from './Modal/RowModal';
interface RowProps {
  title: string;
  id: string;
  fetchUrl: string;
}

type Movie = {
  backdrop_path: string;
  id: number;
  name: string;
  first_air_date: string;
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  release_date: string;
}

const Row = ({title, id, fetchUrl}: RowProps) => {

  const [movie, setMovie] = useState<Movie[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectMovie, setSelectMovie] = useState<Movie>({} as Movie);

  const fetchMovie = useCallback(async () => {
    const res = await axios.get(fetchUrl);
    setMovie(res.data.results);
  }, [fetchUrl])

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie])

  return (
    <Container>
      <h2>{title}</h2>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop = {true}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          1378: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          998: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          625: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          0: {
            slidesPerView: 2,
            slidesPerGroup: 2, 
          }
        }}
      >
        <Content id={id}>
          {movie.map((item: Movie) => (
            <SwiperSlide key={item.id}>
              <Wrap>
                <img
                  key={item.id}
                  src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} 
                  alt={item.original_title}
                  onClick={() => {
                    setModalOpen(true);
                    setSelectMovie(item);
                  }}
                />
              </Wrap>
            </SwiperSlide>
          ))}
        </Content>

      </Swiper>

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

export default Row

const Container = styled.div`
  padding: 20px;
`
const Content = styled.div`
`

const Wrap = styled.div`
  width: 95%;
  height: 95%;
  padding-top: 56.25%;
  border-radius: 10px;
  transition: transform 450ms;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    width: 100%;
    height: 100%;
    inset: 0;
    display: block;
    position: absolute;
    object-fit: cover;
  }

  &:hover {
    transform: scale(0.98);
    border-color: rgba(249, 249, 249, 0.8);
  }
`