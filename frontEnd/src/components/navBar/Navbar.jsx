import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import './navbar.css'


const MyNavbar = ({ user }) => {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    let timeoutId = null;

    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
        setShowUserMenu(true);
    }

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setShowUserMenu(false);
        }, 150);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.clear();
        navigate("/");
        window.location.reload();

    };

    return (
       
        <Navbar collapseOnSelect expand='lg' sticky="top">
           
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src='./logo2.png'
                        alt="logo"
                        width='100'
                        height='100'
                        className='d-inline-block align-top'
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                    <Nav.Link className="btn-contact fw-bold" as={Link} to='/' >Home</Nav.Link>
                        <Nav.Link className="btn-contact fw-bold" as={Link} to='/contatti' >Contact us</Nav.Link>
                        {user ? (
                            <NavDropdown
                                title={
                                    <div className="d-inline-flex align-items-center p-2">
                                        <div className=" avatar-circle rounded-circle bg-success text-dark d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', fontSize: '0.8rem', border: '2px solid white' }}>
                                            {user?.name?.[0]}{user?.surname?.[0]}
                                        </div>
                                        <div className="btn-profilo  d-flex align-items-center fw-bold ">
                                            <span className="ms-2">{user?.name}</span>
                                            <span className="ms-2">{user?.surname}</span>
                                        </div>

                                    </div>
                                }
                                className="user-dropdown-container"
                                id="user-dropdown"
                                align='end'
                                show={showUserMenu}
                                onMouseEnter={() => setShowUserMenu(handleMouseEnter)}
                                onMouseLeave={() => setShowUserMenu(handleMouseLeave)}
                            >


                                <NavDropdown.Item as={Link} to="/profile"> Il mio Profilo</NavDropdown.Item>

                                <NavDropdown.Item as={Link} to="/MyReport">I miei Report</NavDropdown.Item>

                                <NavDropdown.Divider />

                                <NavDropdown.Item onClick={handleLogout} className="text-danger fw-bold ">Logout</NavDropdown.Item>
                            </NavDropdown>

                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">ACCEDI</Nav.Link>
                                
                            </>
                        )}
                         {user?.role === 'PatnerPro' && (
                                <Nav.Link as={Link} to="/Patner-dashboard" className="nav-link fw-bold text-black m-2 dashboard">
                                    Dashboard
                                </Nav.Link>
                            )}
                       
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default MyNavbar;