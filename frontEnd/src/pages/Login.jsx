import React from "react";
import { Form, Button} from "react-bootstrap";
import { toast } from 'react-toastify'
import './Login.css'
import { customFetch } from '../API/api';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setUser }) => {
    const [credential, setCredential] = useState({ email: '', password: '' })
    const [error1, setError1] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email,password} = credential;
        setError1('');
        setErrorMessage('');

        if(!email && !password){
            setErrorMessage('Per favore inserisci le credenziali, grazie!!!');
            return;
        }
        if (localStorage.getItem('token')) {
            alert('Sei gia loggato');
            navigate('/');
            return;

        }
        try {

            const response = await customFetch('auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credential)
            })
        
            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                toast.success('Accesso eseguito!!!');
                navigate('/');
            } else {
                setError1(data.message || 'Perfavore inserisci le credenziali');
                return;
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Email o password errate. RIPROVA!!')

        }
    }
    return (
        <div className="login-page">
            <div className="login-card">
                <h2>LOGIN</h2>
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
                    {error1 && (
                        <div className="alert alert-danger py-2 shadow-sm" role="alert" >
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            {error1}

                        </div>
                    )}
                    {
                        errorMessage && (
                            <p style={{color:'red', fontWeight:'bold',textAlign:'center'}}>
                                {errorMessage}
                            </p>
                        )
                    }

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