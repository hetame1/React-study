import React, { useRef } from 'react'
import styled from 'styled-components'
import useOnclickOutside from '../../hooks/useOnclickOutside';

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

interface RowModalProps {
  selectMovie: Movie;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RowModal = ({selectMovie, setModalOpen}: RowModalProps) => {

  const ref = useRef<HTMLDivElement>(null);
  useOnclickOutside({ divRef: ref, handler: () => setModalOpen(false) });

  return (
    <Container>
      <Wrapper>
        <Modal ref={ref}>
          <button 
            onClick={() => setModalOpen(false)}
            style={{
              position: 'absolute', top: '10px', right: '10px', 
              outline: 'none', border: 'none', background: 'none', 
              color: 'white', fontSize: '20px', cursor: 'pointer'
            }}
          >
            X
          </button>

          <img 
            src={`https://image.tmdb.org/t/p/original/${selectMovie.backdrop_path}`}
            alt={selectMovie.title}
          />

          <TextBox>
            <h2>개봉일 : {selectMovie.release_date || selectMovie.first_air_date}</h2>
            <h1>{selectMovie.title || selectMovie.original_title || selectMovie.name}</h1>

            <p>{selectMovie.overview}</p>
          </TextBox>

        </Modal>
      </Wrapper>
    </Container>
  )
}

export default RowModal

const Container = styled.div`
  position: absolute;
  z-index: 100;
`
const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 71%);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Modal = styled.div`
  position: relative;
  position: relative;
  max-width: 800px;
  background: #111;
  overflow: hidden;
  border-radius: 8px;
  transition: all 400ms ease-in-out 2s;
  animation: fadeIn 400ms;
  max-height: 800px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  animation: fadeIn 400ms;

  @keyframes fadeIn {
    from {
      scale: 0.5;
    }
    to {
      scale: 1;
    }
  }
`

const TextBox = styled.div`
  padding: 0 32px;
`