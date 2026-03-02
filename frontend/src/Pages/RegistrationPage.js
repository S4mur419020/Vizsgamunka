import React, { useState } from 'react';
import useAuthContext from '../context/AuthContext';
import useTranslation from "../i18n/useTranslation"; 
import { useNavigate } from 'react-router-dom';
import '../css/Registration.css';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const { loginReg, errors } = useAuthContext();
    const { t } = useTranslation(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await loginReg(formData, "/api/regisztracio");
        if (success) { navigate("/login"); }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <h2 className="register-title">{t('nav.register')}</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="register-group">
                        <label className="register-label">{t('auth.full_name')}</label>
                        <input type="text" name="name" className="register-input" onChange={handleChange} required />
                        {errors?.name && <span className="text-danger">{errors.name[0]}</span>}
                    </div>

                    <div className="register-group">
                        <label className="register-label">{t('auth.email')}</label>
                        <input type="email" name="email" className="register-input" onChange={handleChange} required />
                        {errors?.email && <span className="text-danger">{errors.email[0]}</span>}
                    </div>

                    <div className="register-group">
                        <label className="register-label">{t('auth.password')}</label>
                        <input type="password" name="password" className="register-input" onChange={handleChange} required />
                        {errors?.password && <span className="text-danger">{errors.password[0]}</span>}
                    </div>

                    <div className="register-group">
                        <label className="register-label">{t('auth.password_confirm')}</label>
                        <input type="password" name="password_confirmation" className="register-input" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="register-button">{t('auth.register_btn')}</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;