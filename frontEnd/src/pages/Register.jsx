import React, { useState } from "react";
import { Form, Button,Alert } from "react-bootstrap";
import './Register.css'
import { customFetch } from '../API/api';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [error1,setError1] = useState(''); 
    const [role,setRole] = useState('user'); 
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        role:""
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
        setError1('');
        try {
            const dataToSend ={
                ...formData,
                role:role
            };
            
          const data = await customFetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                body: JSON.stringify(dataToSend)
            })
            if(data.status ===409){
                setError1('Attenzione email gia associata ad un User');
                return;
            }
            
            alert('Registrazione completata con successo! ora puoi fare il Login');
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
                    {error1 && <Alert variant="danger">{error1}</Alert>}
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
                    <Form.Group className="mb-4">
                            <Form.Label>Tipo DI Utente</Form.Label>
                                <Form.Select
                                 value={role} 
                                 onChange={(e) => setRole(e.target.value)}
                                  className="custom-input bg-dark text-white border-secondary">
                                    <option value="user">user</option>
                                    <option value="PatnerPro">PatnerPro</option>
                                </Form.Select>
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