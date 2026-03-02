import React, { useState } from 'react';
import useAuthContext from '../context/AuthContext';
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
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await loginReg(formData, "/api/regisztracio");

        if (success) {
            navigate("/login");
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
                        <input type="text" name="name" className="register-input" onChange={handleChange} required />

                        {errors?.name && <span className="text-danger">{errors.name[0]}</span>}
                    </div>

                    <div className="register-group">
                        <label className="register-label">E-mail cím</label>
                        <input type="email" name="email" className="register-input" onChange={handleChange} required />
                        {errors?.email && <span className="text-danger">{errors.email[0]}</span>}
                    </div>

                    <div className="register-group">
                        <label className="register-label">Jelszó</label>
                        <input type="password" name="password" className="register-input" onChange={handleChange} required />
                        {errors?.password && <span className="text-danger">{errors.password[0]}</span>}
                    </div>


                    <div className="register-group">
                        <label className="register-label">Jelszó újra</label>
                        <input type="password" name="password_confirmation" className="register-input" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="register-button">Regisztrálok</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;