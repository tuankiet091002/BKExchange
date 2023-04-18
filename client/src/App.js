import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Container } from '@mui/material'

import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import PostDetail from './components/PostDetail/PostDetail'
import Navbar from './components/Navbar/Navbar'

import { useAuthContext } from "./contexts/AuthContext";

const App = () => {
    const { user } = useAuthContext();

    return (
        <BrowserRouter>
            <Container maxWidth={false} disableGutters>
                <Navbar />
                {user ? <Routes>
                    <Route path="/" element={<Navigate to="/posts" />} />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                </Routes>
                    :
                    <Routes>
                        <Route path="/" element={() => <Navigate to="login" />} />
                        <Route path='login' element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Routes>
                }
            </Container>
        </BrowserRouter >
    );
};

export default App;
