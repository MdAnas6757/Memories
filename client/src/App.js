import React from 'react';
import { BrowserRouter, Navigate, Route, Routes,} from 'react-router-dom';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import {GoogleOAuthProvider} from '@react-oauth/google'
import PostDetails from './components/PostDetails/PostDetails';
const App = () => {
  const user=JSON.parse(localStorage.getItem('profile'));
  return (
    <GoogleOAuthProvider clientId='157030834651-9vacr8doo6tcetjm8lb2sdr1cu2dm582.apps.googleusercontent.com'>
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts' element={<Home />} />
        
        <Route path='/posts/search' element={<Home />} />
        <Route
        path="/auth"
        element={user ? <Navigate to="/posts" replace /> : <Auth />}
      />
          <Route path='/posts/:id' element={<PostDetails />} />
          {/* Add more routes as needed */}
        </Routes>
      </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
