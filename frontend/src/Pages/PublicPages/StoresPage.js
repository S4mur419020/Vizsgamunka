import React, { useEffect, useState } from 'react';

import { myAxios } from '../../services/api';
import '../../css/PublicCss/StoresPage.css';

export default function StoresPage() {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {

        myAxios.get('/api/szekhely').then(res => setStores(res.data));
    }, []);


    if (selectedStore) {
        const store = selectedStore;
        return (
            <div className="bg-white text-black p-12 min-h-screen font-sans">
                <button
                    onClick={() => setSelectedStore(null)}
                    className="mb-8 flex items-center gap-2 font-bold uppercase text-sm hover:text-gray-500 transition-colors"
                >
                    ← Vissza az összes üzlethez
                </button>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <section>
                        <h3 className="font-bold text-xl mb-4 uppercase tracking-wider">Cím</h3>
                        <p className="italic text-gray-700">{store.varos}</p>
                        <p className="italic text-gray-700">{store.cim}</p>
                        <p className="text-gray-700 mb-4">{store.iranyitoszam} {store.varos}</p>
                        <a href={`mailto:${store.email}`} className="block underline font-semibold">{store.email}</a>
                        <p className="font-semibold">{store.telefon}</p>

                        <h3 className="font-bold text-xl mt-12 mb-4 uppercase tracking-wider">Hogyan juthatsz el hozzánk</h3>
                        <p className="text-sm text-gray-600 mb-4">{store.leiras || "Központi elhelyezkedés, könnyű megközelíthetőség."}</p>
                        <button className="underline font-bold text-sm">Megnyitás Google Maps-en</button>
                    </section>

                    <section>
                        <h3 className="font-bold text-xl mb-4 uppercase tracking-wider">Nyitvatartás</h3>
                        <div className="space-y-2 text-gray-700">

                            <p className="whitespace-pre-line">{store.nyitvatartas}</p>
                        </div>
                    </section>

                    <section className="flex flex-col gap-4">
                        <button className="border-2 border-black py-4 font-bold hover:bg-black hover:text-white transition-all uppercase tracking-widest">
                            Útvonaltervezés
                        </button>
                        <button className="border-2 border-black py-4 font-bold hover:bg-black hover:text-white transition-all uppercase tracking-widest">
                            Hívd a {store.telefon} számot
                        </button>
                    </section>
                </div>
            </div>
        );
    }

if (selectedStore) {
    return (
        <div className="stores-wrapper">
            <div className="store-details-container">
                <button className="back-button" onClick={() => setSelectedStore(null)}>
                    ← Vissza az összes üzlethez
                </button>
                
                <h1 className="details-title">{selectedStore.varos}</h1>
                <p className="details-address">
                    {selectedStore.nev}<br />
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
                    <h3>Hogyan juthatsz el hozzánk</h3>
                    <p>{selectedStore.nyitvatartas || "Központi elhelyezkedés, könnyű megközelíthetőség."}</p>
                    
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

}