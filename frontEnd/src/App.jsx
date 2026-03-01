import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import { useState, useEffect } from "react";
import { customFetch } from './API/api.js';
import MyNavbar from './components/navBar/Navbar.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import MyFooter from './components/Footer/Footer.jsx';
import PlayerDetails from './pages/PlayerDetails.jsx';
import Profile from './pages/profile.jsx';
import PromisingPlayers from './components/playerPromising/PlayersPromising.jsx';
import SectionSponsor from './components/Sponsor/SectionSponsor.jsx';
import Contactpage from './pages/Contactpage.jsx';
import Testimonials from './components/testimonials/Testimonials.jsx';
import PatnerDashboard from './components/sectionDashboard/PatnerDashboard.jsx';
import ProtectedRoute from './middleware/ProtectdRoute.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx'
import SectionNationality from './pages/sectionCardNationality/NationalityCard.jsx';
import PlayersPageNationality from './pages/sectionCardNationality/PlayerPageNationality.jsx';




export default function App() {

  const [players, setPlayers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await customFetch('players');
        if (!response.ok) {
          throw new Error('Errore nel recupero dei giocatori');
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Errore:', error);
      }
    };

    fetchPlayers();

  }, [])


  return (
    <>
      <BrowserRouter>
        <div className='d-flex flex-column min-vh-100 text-white'>
          <MyNavbar user={user} setUser={setUser} />
          
          <main className='flex-grow-1'>
            <Routes>
              
              <Route path='/' element={
                <>
                  <Home />
                  <PromisingPlayers players={players} />
                  <SectionSponsor />
                  <Testimonials />
                  <SectionNationality/>
                
                </>
                
              }
              />
             <Route path='/players/nationality/:nationality' element={<PlayersPageNationality/>}/>
              <Route path='/preferiti' element={<FavoritesPage />} />
              <Route path='/Patner-dashboard' element={<ProtectedRoute><PatnerDashboard /></ProtectedRoute>} />
              <Route path='/login' element={<Login setUser={setUser} />} />
              <Route path='/register' element={<Register />} />
              <Route path='player-details/:id' element={<PlayerDetails />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/contatti' element={<Contactpage />} />
            </Routes>
           
          </main>
         
            
            
              
          <MyFooter />
        </div>
      </BrowserRouter >
    </>
  );
}