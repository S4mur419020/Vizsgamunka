import React, { useEffect, useState } from 'react';
import { myAxios } from '../../services/api';
import '../../css/PublicCss/StoresPage.css';

export default function StoresPage() {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        myAxios.get('/api/szekhely')
            .then(res => {
                console.log("Adatok:", res.data); // Ellenőrzéshez a konzolon
                setStores(res.data);
            })
            .catch(err => console.error("Hiba a letöltésnél:", err));
    }, []);

    // 1. Részletes nézet (ha rákattyintottak egy boltra)
    if (selectedStore) {
        return (
            <div className="stores-wrapper">
                <div className="store-details-container">
                    <button className="back-button" onClick={() => setSelectedStore(null)}>
                        ← Vissza az összes üzlethez
                    </button>
                    
                    <h1 className="details-title">{selectedStore.varos}</h1>
                    <p className="details-address">
                        <strong>{selectedStore.nev}</strong><br />
                        {selectedStore.cim}<br />
                        {selectedStore.iranyitoszam} {selectedStore.varos}
                    </p>

                    <div className="contact-info">
                        <a href={`mailto:${selectedStore.email}`} className="contact-link">
                            {selectedStore.email}
                        </a>
                        <a href={`tel:${selectedStore.telefon}`} className="contact-link">
                            {selectedStore.telefon}
                        </a>
                    </div>

                    <div className="how-to-get-there">
                        <h3>Nyitvatartás</h3>
                        <p className="whitespace-pre-line">{selectedStore.nyitvatartas}</p>
                        
                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedStore.varos + ' ' + selectedStore.cim)}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="maps-button"
                        >
                            Megnyitás Google Maps-en
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // 2. Fő lista nézet (ez hiányzott a kódod végéről!)
    return (
        <div className="stores-wrapper">
            <h1 className="stores-title">Üzleteink</h1>
            <div className="stores-grid">
                {stores.length > 0 ? (
                    stores.map((store) => (
                        <div 
                            key={store.id} 
                            className="store-card" 
                            onClick={() => setSelectedStore(store)}
                        >
                            <img 
                                src={store.kep_url || "https://images.unsplash.com/photo-1441986300917-64674bd600d8"} 
                                alt={store.varos} 
                                className="store-image" 
                            />
                            <div className="store-overlay">
                                <h2 className="store-name">{store.varos}</h2>
                                <button className="store-button">Tudj meg többet</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{color: 'white', textAlign: 'center', width: '100%'}}>Üzletek betöltése...</p>
                )}
            </div>
        </div>
    );
}