import React from 'react'
import styled from 'styled-components'

const Category = () => {
  return (
    <Wrapper>
      <Item>
        <img src='/images/viewers-disney.png' alt='disney' />
        <video autoPlay muted loop>
          <source src="/videos/disney.mp4" type="video/mp4" />
        </video>
      </Item>
      <Item>
        <img src='/images/viewers-marvel.png' alt='marvel' />
        <video autoPlay muted loop>
          <source src="/videos/marvel.mp4" type="video/mp4" />
        </video>
      </Item>
      <Item>
        <img src='/images/viewers-national.png' alt='national' />
        <video autoPlay muted loop>
          <source src="/videos/national-geographic.mp4" type="video/mp4" />
        </video>
      </Item>
      <Item>
        <img src='/images/viewers-pixar.png' alt='pixar' />
        <video autoPlay muted loop>
          <source src="/videos/pixar.mp4" type="video/mp4" />
        </video>
      </Item>
      <Item>
        <img src='/images/viewers-starwars.png' alt='starwars' />
        <video autoPlay muted loop>
          <source src="/videos/star-wars.mp4" type="video/mp4" />
        </video>
      </Item>
    </Wrapper>
  )
}

export default Category

const Wrapper = styled.div`
  margin-top: 30px;
  padding: 30px 0 26px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(5, 1fr);
`

const Item = styled.div`
  margin: 5px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: all .3s ease-out;

  img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
  }

  video {
    height: 100%;
    width: 100%;
    top: 0;
    opacity: 0;
    z-index: -1;
  }

  &:hover {
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8); 
    video {
      opacity: 1;
    }
  }
`