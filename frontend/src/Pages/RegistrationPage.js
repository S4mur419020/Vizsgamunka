import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import '../css/Registration.css';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { register } = useAuth();
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(formData);

        if (result.success) {
            alert('Sikeres regisztráció! Kérlek, jelentkezz be.');
            navigate('/login'); 
        } else {
            alert(result.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
    <div className="register-page">
        <div className="register-card">
            <h2 className="register-title">Regisztráció</h2>
            <form onSubmit={handleSubmit} className="register-form">
                
                <div className="register-group">
                    <label className="register-label">Teljes név</label>
                    <input 
                        type="text" 
                        name="name" 
                        className="register-input"
                        placeholder="Minta János" 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="register-group">
                    <label className="register-label">E-mail cím</label>
                    <input 
                        type="email" 
                        name="email" 
                        className="register-input"
                        placeholder="jani@gmail.com" 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="register-group">
                    <label className="register-label">Jelszó</label>
                    <input 
                        type="password" 
                        name="password" 
                        className="register-input"
                        placeholder="••••••••" 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <button type="submit" className="register-button">
                    Regisztrálok
                </button>
            </form>
        </div>
    </div>
);
};

export default RegistrationPage;