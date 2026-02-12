import React, { useState } from 'react';

const LoginPage = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
      
        if (email !== '' && password !== '') {
            setIsLoggedIn(true); 
        } else {
            alert("Kérlek töltsd ki a mezőket!");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800 text-center">
                <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent uppercase">
                    Bejelentkezés
                </h2>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="text-left">
                        <label className="block text-sm font-medium text-gray-400 mb-1">E-mail cím</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                            required
                        />
                    </div>
                    <div className="text-left">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Jelszó</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none transition"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-full hover:opacity-90 transition transform active:scale-95 shadow-lg">
                        BELÉPÉS
                    </button>
                </form>
                
                <p className="mt-6 text-gray-500 text-sm">
                    Még nincs fiókod? <a href="/register" className="text-cyan-400 hover:underline">Regisztrálj itt</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;