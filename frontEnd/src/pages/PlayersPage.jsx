import React, { useState, useEffect } from 'react';
import FiltriAvanzati from './FiltriAvanzati';
import { customFetch } from '../API/api';

 const PlayersPage = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeFilters, setActiveFilters] = useState({});

    useEffect(() => {
        const fetchPlayers = async () => {
            setLoading(true);
            try {
                // Trasforma l'oggetto filtri in stringa per l'URL (query string)
                const query = new URLSearchParams();
                if (activeFilters.search) query.append('search', activeFilters.search);
                if (activeFilters.role?.length > 0) query.append('role', activeFilters.role.join(','));
                if (activeFilters.nationality) query.append('nationality', activeFilters.nationality);
                if (activeFilters.age) query.append('age', activeFilters.age);
                if (activeFilters.foot) query.append('foot', activeFilters.foot);
                if (activeFilters.rating > 1) query.append('rating', activeFilters.rating);

                const response = await customFetch(`players?${query.toString()}`);
                const data = await response.json();
             
                setPlayers(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
    }, [activeFilters]); // Si riattiva ogni volta che cambi un filtro!

    return (
        <div className="bg-light min-vh-100 py-5">
            {/* COMPONENTE FILTRI A PARTE */}
            <FiltriAvanzati onFilterChange={(data) => setActiveFilters(data)} />

            <div className="container">
                {loading ? (
                    <div className="text-center mt-5"><div className="spinner-border text-success"></div></div>
                ) : (
                    <div className="row g-3">
                        {players.map(p => (
                            <div className="col-md-4" key={p._id}>
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-body">
                                        <h5>{p.name} {p.surname}</h5>
                                        <span className="badge bg-soft-success text-success">{p.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default PlayersPage;
