import React, { useState } from 'react'; 
import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import useTranslation from "../i18n/useTranslation"; 
import '../css/Login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginReg, errors } = useAuthContext();
    const { t } = useTranslation()
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
       
        const success = await loginReg({ email, password }, "/api/login");
    
    if (success) {
        navigate("/"); 
    }
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
               
            </div>
        </div>
    );
};

export default LoginPage;