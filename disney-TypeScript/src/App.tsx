import React from 'react';
import './App.css';
import { styled } from 'styled-components';
import Nav from 'components/Nav';
import Banner from 'components/Banner';
import Category from 'components/Category';
import Row from 'components/Row';
import request from 'api/request';

function App() {
  return (
    <div>
      <Nav />
      <Container>
        <Banner />
        <Category />
        <Row  title="Trending Now" id="TN" fetchUrl={request.fetchTrending} />
        <Row  title="Top Rated" id="TR" fetchUrl={request.fetchTopRated} />
        <Row  title="Action Movie" id="AM" fetchUrl={request.fetchActionMovies} />
        <Row  title="Comedy Movie" id="CM" fetchUrl={request.fetchComedyMovies} />
      </Container>
    </div>
  );
}

export default App;

const Container = styled.main`
  position: relative;
  background-color: #111;
  min-height: calc(100vh - 70px);
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`