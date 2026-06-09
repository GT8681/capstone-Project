import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import './navbar.css';

const MyNavbar = ({ user }) => {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    let timeoutId = null;

    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
        setShowUserMenu(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setShowUserMenu(false);
        }, 150);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };

    return (
        // Sfondo dark premium, con SFUMATURA per profondità
        <Navbar collapseOnSelect expand='lg' sticky="top" className="py-2 px-3 navbar-custom" style={{ background: 'linear-gradient(180deg, #0f1117 0%, #161922 100%)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Container>
                {/* LOGO */}
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-4">
                    <img
                        src='./logo2.png'
                        alt="logo"
                        width='50'
                        height='50'
                        className='d-inline-block img-logo-custom'
                    />
                    {/* Brand Name con stile moderno */}
                    <span className="ms-2 fw-black text-white text-uppercase d-none d-sm-inline" style={{ letterSpacing: '1px', fontSize: '1.2rem', fontFamily: 'Montserrat, sans-serif' }}>
                        SOCCER<span className="text-danger">SCOUT</span>
                    </span>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls='responsive-navbar-nav' className="border-secondary bg-light bg-opacity-10" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* ALLINEAMENTO CENTRALE DELLE VOCI */}
                    <Nav className="ms-auto align-items-center gap-3 mt-3 mt-lg-0">
                        {/* Link Standard: FORZIAMO COLORE E PESO */}
                        <Nav.Link className="fw-semibold text-uppercase px-3 py-2 rounded-3 nav-link-custom" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }} as={Link} to='/' >
                            Home
                        </Nav.Link>
                        <Nav.Link className="fw-semibold text-uppercase px-3 py-2 rounded-3 nav-link-custom" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }} as={Link} to='/contatti' >
                            Contact us
                        </Nav.Link>
                        
                        {/* Se l'utente è Partner Pro, mostriamo la Dashboard: FORZIAMO PADDING E COLORI */}
                        {user?.role === 'PatnerPro' && (
                            <Nav.Link as={Link} to="/Patner-dashboard" className="fw-bold text-uppercase px-3 py-2 rounded-pill dashboard-link shadow-sm" style={{ backgroundColor: 'rgba(220, 53, 69, 0.15)', color: '#dc3545', fontSize: '0.85rem', border: '1px solid rgba(220, 53, 69, 0.25)', transition: 'all 0.2s ease' }}>
                                Dashboard
                            </Nav.Link>
                        )}

                        {user ? (
                            <div 
                                className="nav-item-dropdown-wrapper"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <NavDropdown
                                    title={
                                        // PULEGGIA DEL PROFILO: FORZIAMO L'ALLINEAMENTO ORIZZONTALE E VERTICALE
                                        <div className="profile-pill d-flex align-items-center px-3 py-2 rounded-pill shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#ffffff', transition: 'all 0.2s ease' }}>
                                            {/* Avatar Tondo Iniziali */}
                                            <div className="avatar-circle rounded-circle bg-danger text-white d-flex align-items-center justify-content-center fw-bold shadow" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                                                {user?.name?.[0]}{user?.surname?.[0]}
                                            </div>
                                            {/* Nome Utente */}
                                            <div className="ms-2 d-flex align-items-center small fw-semibold text-white">
                                                <span>{user?.name} {user?.surname}</span>
                                            </div>
                                        </div>
                                    }
                                    className="user-dropdown-container border-0"
                                    id="user-dropdown"
                                    align='end'
                                    show={showUserMenu}
                                >
                                    {/* Intestazione Mini Carta Account interna (Sfondo più scuro) */}
                                    <div className="px-3 py-2 mb-3 rounded-3 mx-2 text-start info-box-dropdown shadow-inner" style={{ backgroundColor: 'rgba(0,0,0,0.4)', color: '#ffffff' }}>
                                        <span className="d-block text-secondary text-uppercase font-monospace" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>Account Scouting</span>
                                        <span className="d-block text-white small fw-bold text-truncate" style={{ maxWidth: '180px' }}>{user?.email || "utente@soccer.com"}</span>
                                    </div>

                                    <NavDropdown.Item as={Link} to="/profile" className="dropdown-item-custom small">
                                        👤 Il mio Profilo
                                    </NavDropdown.Item>

                                    <NavDropdown.Item as={Link} to="/preferiti" className="dropdown-item-custom small">
                                        ⭐ Player Preferiti
                                    </NavDropdown.Item>

                                    <NavDropdown.Divider className="border-secondary border-opacity-25" />

                                    <NavDropdown.Item onClick={handleLogout} className="dropdown-item-custom-logout text-danger fw-bold small">
                                        🚪 Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        ) : (
                            <Nav.Link as={Link} to="/login" className="fw-bold px-3 py-2 rounded-pill text-uppercase font-monospace text-white bg-danger border-0 shadow small ms-lg-2 btn-accedi-custom">
                                ACCEDI
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;
