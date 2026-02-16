import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState,useEffect } from "react";
import MyNavbar from './components/navBar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MyFooter from './components/Footer/Footer';
import PlayerDetails from './pages/PlayerDetails';
import Profile from './pages/profile';




export default function App() {

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  
const [user, setUser] = useState(null);
  return (
    
    <BrowserRouter>
      <div className='d-flex flex-column min-vh-100 bg-black text-white'>
        <MyNavbar user={user} setUser={setUser}/>
        <main className='flex-grow-1'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login setUser={setUser} />} />
            <Route path='/register' element={<Register />} />
            <Route path='player-details/:id' element={<PlayerDetails />} />
            <Route path='/profile' element={<Profile />} />

          </Routes>
        </main>
        <MyFooter />
      </div>
    </BrowserRouter >
  );
}