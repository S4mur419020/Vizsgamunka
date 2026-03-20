import React, { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/PublicCss/Resetpassword.css";

const ResetPasswordPage = () => {
    const { token } = useParams();  
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");

    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        if (password !== passwordConfirmation) {
            setError("A két jelszó nem egyezik!");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("A jelszónak legalább 6 karakter hosszúnak kell lennie!");
            setLoading(false);
            return;
        }

        try {
            await axios.post("http://localhost:8000/api/reset-password", {
                token,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            setMessage("Sikeres jelszómódosítás! Most már bejelentkezhetsz.");
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setError(Object.values(error.response.data.errors)[0][0]);
            } else {
                setError("Hiba történt. Lejárt token vagy hibás adatok.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-page">
            <div className="login-container">
                <h2>Új jelszó megadása</h2>
                <p className="description-text">Adj meg egy új jelszót (legalább 6 karakter).</p>
                
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit} className="login-form">
                    <input 
                        type="password" 
                        placeholder="Új jelszó" 
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Jelszó megerősítése" 
                        value={passwordConfirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? "Mentés..." : "Jelszó mentése"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;