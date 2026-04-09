import React, { useState, useEffect } from 'react';

const FiltriAvanzati = ({ onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        search: "",
        role: [],
        nationality: "",
        age: 0,
        foot: [],
        rating: 1
    });

    const rolesOptions = ["POR", "DIF", "CEN", "ATT"];
    const footOptions = ["DESTRO", "SINISTRO", "AMBIDESTRO"];

    // Gestore universale per input, select e range
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
       
    };


    // Gestore specifico per i bottoni dei ruoli (Toggle)
    const toggleRole = (role) => {
        const newRoles = filters.role.includes(role)
            ? filters.role.filter(r => r !== role)
            : [...filters.role, role];

        const newFilters = { ...filters, role: newRoles };
        setFilters(newFilters);

    };


    const toggleFoot = (foot) => {
        const newFoot = filters.foot.includes(foot)
            ? filters.foot.filter(r => r !== foot)
            : [...filters.foot, foot];

        const newFilters = { ...filters, foot: newFoot };
        setFilters(newFilters);

    };

    const reset = () => {
        const cleared = { search: "", role: [], nationality: "", age: 0, foot: "", rating: 1 };
        setFilters(cleared);

    };

    return (
        <div className="container mb-4">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                {/* BARRA DI RICERCA PRINCIPALE */}
                <div className="p-3 bg-white">
                    <div className="input-group input-group-lg">
                        <span className="input-group-text bg-transparent border-0">
                            <i className="bi bi-search text-success"></i>
                        </span>
                        <input
                            type="text"
                            name="search"
                            className="form-control border-0 shadow-none"
                            placeholder="Cerca il nome del talento..."
                            value={filters.search}
                            onFocus={() => setIsOpen(true)}
                            onChange={handleChange}
                        />
                        <button
                            className={`btn rounded-pill px-4 ${isOpen ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <i className={`bi ${isOpen ? 'bi-chevron-up' : 'bi-sliders'} me-2`}></i>
                            {isOpen ? 'Chiudi' : 'Filtri'}
                        </button>
                    </div>
                </div>

                {/* PANNELLO FILTRI (COLLAPSE) */}
                <div className={`collapse ${isOpen ? 'show' : ''} bg-light border-top`}>
                    <div className="card-body p-4">
                        <div className="row g-4">

                            {/* SELEZIONE RUOLI (Bottoni) */}
                            <div className="col-12">
                                <label className="form-label small fw-bold text-muted text-uppercase">Ruoli occupati</label>
                                <div className="d-flex flex-wrap gap-2">
                                    {rolesOptions.map(r => (
                                        <button
                                            key={r}
                                            type="button"
                                            className={`btn btn-sm rounded-pill px-3 ${filters.role.includes(r) ? 'btn-success shadow-sm' : 'btn-outline-secondary bg-white'}`}
                                            onClick={() => toggleRole(r)}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* NAZIONALITÀ */}
                            <div className="col-md-4">
                                <label className="form-label small fw-bold text-muted text-uppercase">Nazionalità</label>
                                <input type="text" name="nationality" className="form-control shadow-sm" placeholder="Es: Italia" value={filters.nationality} onChange={handleChange} />
                            </div>

                            {/* ETÀ */}
                            <div className="col-md-4">
                                <label className="form-label small fw-bold text-muted text-uppercase">Età Massima ({filters.age || 'Nessuna'})</label>
                                <input type="number" name="age" className="form-control shadow-sm" placeholder="Es: 22" value={filters.age} onChange={handleChange} />
                            </div>

                            <div className="col-12">
                                <label className="form-label small fw-bold text-muted text-uppercase">Ruoli occupati</label>
                                <div className="d-flex flex-wrap gap-2">
                                    {footOptions.map(r => (
                                        <button
                                            key={r}
                                            type="button"
                                            className={`btn btn-sm rounded-pill px-3 ${filters.foot.includes(r) ? 'btn-success shadow-sm' : 'btn-outline-secondary bg-white'}`}
                                            onClick={() => toggleFoot(r)}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* VALUTAZIONE */}
                            <div className="col-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <label className="form-label small fw-bold text-muted text-uppercase mb-0">Valutazione Player</label>
                                    <span className="badge bg-success">{filters.rating} ⭐</span>
                                </div>
                               
                                <input type="number" name="rating" className="form-control shadow-sm" placeholder="es:5" value={filters.rating} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <button className="btn btn-link text-danger text-decoration-none btn-sm" onClick={reset}>
                                <i className="bi bi-trash me-1"></i> Reset Filtri
                            </button>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                          

                            {/* Questo tasto manda finalmente i dati al padre */}
                            <button
                                 
                                className="btn btn-success px-4 rounded-pill shadow-sm"
                                type='button'
                                onClick={() => onFilterChange(filters)}
                            >
                                CERCA ⚽
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default FiltriAvanzati;
