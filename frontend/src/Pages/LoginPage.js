import React, { useState, useContext } from 'react'; 
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import '../css/Login.css';

const LoginPage = () => {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email !== '' && password !== '') {
            
            const result = await login(email, password);

            if (result.success) {
                
                navigate("/"); 
            } else {
                
                alert(result.message || "Hiba a bejelentkezés során!");
            }
        } else {
            alert("Kérlek töltsd ki a mezőket!");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Bejelentkezés</h2>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label className="form-label">E-mail cím</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Jelszó</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        BELÉPÉS
                    </button>
                </form>

                <p className="register-text">
                    Még nincs fiókod?
                    <a href="/register" className="register-link"> Regisztrálj itt</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage