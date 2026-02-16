import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import './navbar.css'


const MyNavbar = ({user}) => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.clear();
        navigate("/");
        window.location.reload();

    };

    return (
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' className="shadow">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src='./logo2.png'
                        alt="logo"
                        width='70'
                        height='70'
                        className='d-inline-block align-top'
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {user ? (
                            <NavDropdown
                                title={
                                    <div className="d-inline-flex align-items-center">
                                        <div className=" avatar-circle rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', fontSize: '0.8rem', border: '2px solid white' }}>
                                            {user?.name?.[0]}{user?.surname?.[0]}
                                        </div>
                                        <span className="ms-2">{user?.name}</span>
                                        <span className="ms-2">{user?.surname}</span>
                                    </div>
                                }
                                id="user-dropdown"
                                align='end'>

                                <NavDropdown.Item as={Link} to="/profile"> Il mio Profilo</NavDropdown.Item>

                                <NavDropdown.Item as={Link} to="/MyReport">I miei Report</NavDropdown.Item>

                                <NavDropdown.Divider />

                                <NavDropdown.Item onClick={handleLogout} className="text-danger">Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">ACCEDI</Nav.Link>
                                <Nav.Link as={Link} to="/">HOME</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default MyNavbar;