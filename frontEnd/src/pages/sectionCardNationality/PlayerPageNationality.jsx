import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customFetch } from "../../API/api";


const PlayerPageNationality = () => {
  const { nationality } = useParams(); // Prende "brasile" o "italiana" dall'URL
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        setLoading(true);
        const response = await customFetch(`players`, {
          method: 'GET'
        })
        const data = await response.json();
        if (response.ok) {
          const filtered = data.filter((p) => {
            const nazioneDB = (p.nationality || "").toLowerCase();
            const nazioneCercata = (nationality || "").toLowerCase();
            return nazioneDB.includes(nazioneCercata);
          });
          setPlayers(filtered);
        }
      } catch (err) {
        console.error("Errore nel caricamento:", err);
      } finally {
        setLoading(false);
      }
    };

    if (nationality) fetchAndFilter();
  }, [nationality]);

  if (loading) return <p>Caricamento campioni...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-primary fst-italic fs-1">PLAYERS : {nationality.toUpperCase()}</h2>
      <hr />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {players.length > 0 ? (
          players.map((p) => (
            <div className="text-center" key={p._id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px" }}>
              <img src={p.avatar} alt="foto" style={{ width: "120px", borderRadius: "50%" }} />
              <h3 className="text-success">{p.name} {p.surname}</h3>
              <p className="text-success" >NAZIONALITA': {p.nationality}</p>
              <p className="text-success" >AGE': {p.age}</p>
              <p className="text-success" >ROLE: {p.role}</p>
              <p className="text-success" >FOOT: {p.foot}</p>
            </div>
          ))
        ) : (
          <p className="text-dark fs-1">Nessun giocatore trovato con questa nazione.</p>
        )}
      </div>
    </div>
  );
};

export default PlayerPageNationality;
