import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '../css/Registration.css';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Sikeresen regisztráltál! Most jelentkezz be.");
        navigate('/login');
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <h2 className="register-title">
                    FIÓK LÉTREHOZÁSA
                </h2>

                <form onSubmit={handleSubmit} className="register-form">

                    <div className="register-group">
                        <label className="register-label">Teljes név</label>
                        <input
                            type="text"
                            className="register-input"
                            placeholder="Minta János"
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>

                    <div className="register-group">
                        <label className="register-label">E-mail cím</label>
                        <input
                            type="email"
                            className="register-input"
                            placeholder="mail@pelda.hu"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>

                    <div className="register-group">
                        <label className="register-label">Jelszó</label>
                        <input
                            type="password"
                            className="register-input"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>

                    <div className="register-group">
                        <label className="register-label">Jelszó megerősítése</label>
                        <input
                            type="password"
                            className="register-input"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                            required
                        />
                    </div>

                    <button type="submit" className="register-button">
                        REGISZTRÁCIÓ
                    </button>

                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
