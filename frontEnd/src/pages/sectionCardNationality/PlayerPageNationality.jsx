import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { customFetch } from '../../API/api';


const PlayersPage = () => {
  // 1. Prende la nazionalità dall'URL (es: "italy")

  const [players, setPlayers] = useState([]);
  const { nationality } = useParams();
  console.log('nazione arrivata',nationality)
  useEffect(() => {
    // 2. Chiamata al database filtrata per nazionalità
    const getPlayers = async () => {
      
      const token = localStorage.getItem('token');
      if(!token) return;
      try {
        const response = await customFetch(`players/nationality/${nationality}`,{
          method: 'GET',
          headers: {'Authorization':`Bearer ${token}`}
        });
        const data = await response.json();
        console.log(data)
        if(data.ok){
          setPlayers(data.players);

        }
       
      } catch (error) {
        console.error("Errore nel caricamento", error);
      }

    };

    getPlayers();
  }, [nationality]); // Se cambi card, lui ricarica i dati

  return (
    <div className="container mt-4">
      <h2 className="text-uppercase fw-bold mb-4">Giocatori: {nationality}</h2>
      <div className="row">

        {players && players.length > 0 ? (
          players.map(player => (
            <div key={player._id} className="col-md-3 mb-4">


              <div className="card shadow-sm border-0 position-relative">
                <img src={player.avatar} className="card-img-top" alt={player.name} />

                {/* Il Voto (Badge) che non sparisce più */}
                <span className="position-absolute top-0 end-0 m-2 badge rounded-pill bg-warning text-dark shadow">
                  {player.rating} ★
                </span>

                <div className="card-body">
                  <h5 className="card-title fw-bold m-0">{player.name}</h5>
                  <p className="card-text small text-muted">{player.vote}</p>
                </div>
              </div>

            </div>

          ))
        ) : (
          <p>Nessun Giocatore trovato</p>
        )}
      </div>
    </div>
  );
};

export default PlayersPage;
