import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import useAuthContext from '../../context/AuthContext';
import useTranslation from '../../i18n/useTranslation';
import '../../css/PublicCss/Login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginReg, errors } = useAuthContext();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        await loginReg({ email, password }, "/api/login", navigate);
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">{t('nav.login')}</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label className="form-label">{t('auth.email')}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            required
                        />
                        {errors?.email && <span className="text-danger">{errors.email[0]}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">{t('auth.password')}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            required
                        />
                        {errors?.password && <span className="text-danger">{errors.password[0]}</span>}
                    </div>

                    <button type="submit" className="login-button">{t('auth.login_btn')}</button>
                </form>
                <div className="auth-links" style={{ marginTop: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Link to="/forgot-password" style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>
                        {t('auth.forgot_password')}
                    </Link>

                    <p style={{ color: 'white', fontSize: '14px' }}>
                        {t('auth.no_account')}
                        <Link to="/register" style={{ color: '#007bff', marginLeft: '5px', fontWeight: 'bold' }}>
                            {t('nav.register')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;