import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


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
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800">
                <h2 className="text-3xl font-black mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    FIÓK LÉTREHOZÁSA
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Teljes név</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                            placeholder="Minta János"
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">E-mail cím</label>
                        <input 
                            type="email" 
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                            placeholder="mail@pelda.hu"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Jelszó</label>
                        <input 
                            type="password" 
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Jelszó megerősítése</label>
                        <input 
                            type="password" 
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg mt-4 hover:opacity-90 transition transform active:scale-95">
                        REGISZTRÁCIÓ
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;