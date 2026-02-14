import React from "react";
import { Form, Button } from "react-bootstrap";
import './Login.css'
import { customFetch } from '../API/api';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Link } from "react-router-dom";



const Login = () => {
    const [credential, setCredential] = useState({ email: '', password: '' })
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response  = await customFetch('auth/login', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                 body: JSON.stringify(credential)
            })
              const data = await response.json();

            if (response.ok && data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/';
                navigate('/');
                alert('Login effettuato con successo!');
                
            } else {
                console.log('Login fallito: token non ricevuto', data);
            }
        } catch (error) {
            alert(error.message || 'Si e verificato un errore durante il login');

        }
    }
    return (
        <div className="login-page">
            <div className="login-card">
                <h2>BENTORNATO</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Inserisci email"
                            className="custom-input"
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="custom-input"
                            onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="custom-button w-100">
                        ACCEDI
                    </Button>
                    <div className="mt-3 text-center">
                        <span className="text-dark">Non hai un account? </span>
                        <Link to="/register">Registrati</Link>
                    </div>
                </Form>
                
            </div>
        </div>
    )
}
export default Login;