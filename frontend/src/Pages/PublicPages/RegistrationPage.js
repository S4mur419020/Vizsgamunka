import React, { useState } from 'react';
import useAuthContext from '../../context/AuthContext';
import useTranslation from '../../i18n/useTranslation';
import { useNavigate, Link } from 'react-router-dom';
import '../../css/PublicCss/Registration.css';

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
                    <div style={{ marginTop: '20px', textAlign: 'center', color: 'white' }}>
                        <span>{t('auth.already_have_account')}</span>
                        <Link to="/login" style={{ color: '#007bff', marginLeft: '5px', fontWeight: 'bold', textDecoration: 'none' }}>
                            {t('auth.back_to_login')}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;