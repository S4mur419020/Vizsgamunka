import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { myAxios } from '../../services/api'; 
import useTranslation from '../../i18n/useTranslation';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null); 
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const response = await myAxios.post('/api/forgot-password', { email });
            if (response.data.status || response.data.message) {
                setStatus('success');
            }
        } catch (error) {
            setStatus('error');
            console.error("Hiba a jelszó visszaállításnál:", error.response);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="login-card" style={{ width: '400px', textAlign: 'center' }}>
                <h2 className="login-title">{t('auth.forgot_password')}</h2>
                
                {status === 'success' && (
                    <div className="alert alert-success text-center" style={{ marginBottom: '20px', color: '#155724' }}>
                        {t('auth.reset_link_sent')}
                    </div>
                )}
                
                {status === 'error' && (
                    <div className="alert alert-danger text-center" style={{ marginBottom: '20px', color: '#721c24' }}>
                        {t('auth.reset_link_error')}
                    </div>
                )}

                <p style={{ color: 'white', marginBottom: '20px' }}>
                    Adj meg egy e-mail címet a visszaállításhoz.
                </p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder={t('auth.email_placeholder')}
                            required
                            style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="login-button" 
                        disabled={loading}
                        style={{ width: '100%', background: loading ? '#666' : '#007bff' }}
                    >
                        {loading ? t('loading') : t('auth.send_reset_link')}
                    </button>
                </form>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
                        {t('auth.back_to_login')}
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ForgotPassword;