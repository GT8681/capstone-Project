import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import MyNavbar from './components/navBar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MyFooter from './components/Footer/Footer';
import PlayerDetails from './pages/PlayerDetails';
import Profile from './pages/profile';
import PromisingPlayers from './components/playerPromising/PlayersPromising';
import SectionSponsor from './components/sectionSponsor/sectionSponsor';
import Contactpage from './pages/Contactpage';
import Testimonials from './components/testimonials/Testimonials.jsx';




export default function App() {

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
        const response = await fetch('http://localhost:4545/players');
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

  const [players, setPlayers] = useState([]);
  const [user, setUser] = useState(null);
  return (

    <BrowserRouter>
      <div className='d-flex flex-column min-vh-100 text-white'>
        <MyNavbar user={user} setUser={setUser} />
        <main className='flex-grow-1'>
          <Routes>
         
            <Route path='/' element={
              <>
                 
                <Home />
                <PromisingPlayers players={players} />
                <SectionSponsor/>
                <Testimonials/>
               
              </>
            }
            />
            <Route path='/login' element={<Login setUser={setUser} />} />
            <Route path='/register' element={<Register />} />
            <Route path='player-details/:id' element={<PlayerDetails />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/contatti' element={<Contactpage/>} />
          </Routes>
      
        </main>
        <MyFooter />
      </div>
    </BrowserRouter >
  );
}