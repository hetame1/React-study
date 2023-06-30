import React from 'react';
import './App.css';
import Nav from 'components/Nav';
import { Route, Routes, Outlet } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import SearchPage from 'pages/SearchPage';
import LoginPage from 'pages/LoginPage';

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />
    </div>
  )
}

function App() : JSX.Element {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<MainPage />} />
          <Route path='search' element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
