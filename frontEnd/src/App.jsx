import React from 'react';
import MyNavbar from './components/navBar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Register from './pages/Register';
import Home from './pages/Home';

export default function App() {
    return (

        <Router>
            <MyNavbar />
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}