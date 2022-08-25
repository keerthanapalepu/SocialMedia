import React  from 'react';
import { Container } from '@material-ui/core';

import { BrowserRouter, Routes, Route,  Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar/Navbar'


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
    return (
      <BrowserRouter>
        <Container maxidth="lg">
        <Navbar/>
        <Routes>
        <Route path="/posts" exact element={<Home/>} />
        <Route path="/" element={<Navigate  to="/posts" replace={true} />} />
        <Route path="/posts/search" exact element={<Home/>} />
        <Route path="/auth" exact element={(!user ? <Auth /> : <Navigate to="/posts" replace={true} />)} />
        </Routes>
        </Container>
      </BrowserRouter>
    );
}

export default App;
