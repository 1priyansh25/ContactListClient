import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';
import CreatePost from './components/CreatePost';
import UpdatePost from './pages/UpdatePost';

export const AuthContext = createContext();

export default function App() {

  const [auth, setAuth] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <AuthContext.Provider value={{auth, setAuth, refresh, setRefresh}}>
      <BrowserRouter>
      <Navbar />

        <Container sx={{p: 1, mt:10}}>
          <Routes>
            <Route path = '/' element={auth?<Home />:<Login />} />
            <Route path = '/login' element = {<Login />} />
            <Route path = '/register' element = {<Register />} />
            <Route path = '/create' element = {<CreatePost />} />
            <Route path='/update/:id' element = {<UpdatePost />} />
          </Routes>
        </Container>
      </BrowserRouter>
      </AuthContext.Provider>
    </div>
  )
}
