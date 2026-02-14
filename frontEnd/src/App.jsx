import React from 'react';
import MyNavbar from './components/navBar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Register from './pages/Register';
import Home from './pages/Home';
import MyFooter from './components/Footer/Footer';
import PlayerDetails from './pages/PlayerDetails';
import Profile from './pages/profile';

export default function App() {
    return (
        <BrowserRouter>
            <div className='d-flex flex-column min-vh-100 bg-black text-white'>
                <MyNavbar />
                <main className='flex-grow-1'>
                    
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/Login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='player-details/:id' element={<PlayerDetails/>} />
                            <Route path='/profile' element={<Profile  />} />
                        </Routes>
                </main>
                <MyFooter />
            </div>
        </BrowserRouter >
    );
}