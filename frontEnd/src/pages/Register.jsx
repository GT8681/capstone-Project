import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import './Register.css'
import { customFetch } from '../API/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = await customFetch('auth/register', {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            alert('Registrazione completatacon successo! ora puoi fare il Login');
            navigate('/login');
        } catch (error) {
            alert('UTENTE GIA REGISTRATO O CREDENZIALI SBAGLIATE');
        }
    }
    return (
        <div className="register-page">
            <div className="register-card">
                <h2>Crea un Account</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>NAME</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci nome" name="name" onChange={handleChange} className="custom-input" />
                        <Form.Label>SURNAME</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci cognome" name="surname" onChange={handleChange} className="custom-input" />
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Inserisci email" name="email" onChange={handleChange} className="custom-input" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="inserisci la Password" name="password" onChange={handleChange} className="custom-input" />
                        </Form.Group>
                    </Form.Group>

                    <Button variant="success" type="submit" className="custom-button w-100">
                        REGISTRATI
                    </Button>
                </Form>
            </div>
        </div>
    )
}
export default Register;