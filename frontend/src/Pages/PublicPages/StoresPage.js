import React, { useEffect, useState } from 'react';
import { myAxios } from '../../services/api';
import '../../css/PublicCss/StoresPage.css';
import useTranslation from '../../i18n/useTranslation';

export default function StoresPage() {
    const { t } = useTranslation();
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        myAxios.get('/api/szekhely')
            .then(res => setStores(res.data))
            .catch(err => console.error("Hiba a letöltésnél:", err));
    }, []);

    if (selectedStore) {
        return (
            <div className="stores-wrapper">
                <div className="store-details-container">
                    <button className="back-button" onClick={() => setSelectedStore(null)}>
                        {t('stores.back')}
                    </button>

                    <h1 className="details-title">{selectedStore.varos}</h1>
                    <p className="details-address">
                        <strong>{selectedStore.nev
                            ? selectedStore.nev.replace(/Központ/g, t('address.center'))
                            : ""}</strong><br />
                        {selectedStore.cim
                            .replace(/Fő/g, t('address.main'))
                            .replace(/utca/g, t('address.street_label').toLowerCase())
                            .replace(/Utca/g, t('address.street_label'))
                            .replace(/út/g, t('address.road_label').toLowerCase())
                            .replace(/tér/g, t('address.square_label').toLowerCase())
                        }<br />

                        {selectedStore.iranyitoszam} {selectedStore.varos}
                    </p>

                    <div className="contact-info">
                        <a href={`mailto:${selectedStore.email}`} className="contact-link">{selectedStore.email}</a>
                        <a href={`tel:${selectedStore.telefon}`} className="contact-link">{selectedStore.telefon}</a>
                    </div>

                    <div className="how-to-get-there">
                        <h3>{t('stores.opening')}</h3>
                        <p className="whitespace-pre-line">
                            {selectedStore.nyitvatartas
                                ? selectedStore.nyitvatartas
                                    .replace(/Hétfő/g, t('days.monday'))
                                    .replace(/Kedd/g, t('days.tuesday'))
                                    .replace(/Szerda/g, t('days.wednesday'))
                                    .replace(/Csütörtök/g, t('days.thursday'))
                                    .replace(/Péntek/g, t('days.friday'))
                                    .replace(/Szombat/g, t('days.saturday'))
                                    .replace(/Vasárnap/g, t('days.sunday'))
                                : ""}
                        </p>

                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedStore.varos + ' ' + selectedStore.cim)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="maps-button"
                        >
                            {t('stores.maps')}
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="stores-wrapper">
            <h1 className="stores-title">{t('stores.title')}</h1>
            <div className="stores-grid">
                {stores.length > 0 ? (
                    stores.map((store) => (
                        <div key={store.id} className="store-card" onClick={() => setSelectedStore(store)}>
                            <img
                                src={store.kep_url || "https://images.unsplash.com/photo-1441986300917-64674bd600d8"}
                                alt={store.varos}
                                className="store-image"
                            />
                            <div className="store-overlay">
                                <h2 className="store-name">{store.varos}</h2>
                                <button className="store-button">{t('stores.more')}</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'white', textAlign: 'center', width: '100%' }}>{t('stores.loading')}</p>
                )}
            </div>
        </div>
    );
}