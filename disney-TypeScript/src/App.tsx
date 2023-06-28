import React from 'react';
import './App.css';
import { styled } from 'styled-components';
import Nav from 'components/Nav';
import Banner from 'components/Banner';

function App() {
  return (
    <div>
      <Nav />
      <Container>
        <Banner />
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