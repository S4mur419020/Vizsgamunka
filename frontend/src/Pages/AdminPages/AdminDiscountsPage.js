import React, { useEffect, useState } from 'react';
import { myAxios } from "../../services/api";
import "../../css/AdminCss/Statistic.css";

export default function AdminDiscountsPage() {
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editForm, setEditForm] = useState({
        marka: '',
        tipus: '',
        akcio_szazalek: '',
        kezdo_datum: '',
        zaro_datum: ''
    });

    const [newForm, setNewForm] = useState({
        marka: '',
        tipus: '',
        akcio_szazalek: '',
        kezdo_datum: '',
        zaro_datum: ''
    });

    const fetchDiscounts = async () => {
        try {
            const res = await myAxios.get("/api/learazasok");
            setDiscounts(res.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await myAxios.post("/api/learazasok", newForm);
            setIsModalOpen(false);
            setNewForm({ marka: '', tipus: '', akcio_szazalek: '', kezdo_datum: '', zaro_datum: '' });
            fetchDiscounts();
        } catch (error) {
            alert("Hiba a mentés során! Ellenőrizd az adatokat és a kategóriákat.");
        }
    };

    const handleSaveUpdate = async (akcioId) => {
        try {
            await myAxios.put(`/api/learazasok/${akcioId}`, editForm);
            setEditingId(null);
            fetchDiscounts();
        } catch (error) {
            console.error(error.response?.data);
            alert("Hiba a frissítés során!");
        }
    };

    const handleDelete = async (akcioId) => {
        if (window.confirm("Biztosan törölni szeretnéd ezt az akciót?")) {
            try {
                await myAxios.delete(`/api/learazasok/${akcioId}`);
                setDiscounts(discounts.filter(d => d.akcio !== akcioId));
            } catch (error) {
                alert("Hiba a törlésnél.");
            }
        }
    };

    if (loading) return <div className="admin-container">Betöltés...</div>;

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1 className="dashboard-title">Akciók kezelése</h1>
                <button className="btn-add-discount" onClick={() => setIsModalOpen(true)}>
                    + Új akció hozzáadása
                </button>
            </header>

            <div className="discounts-grid-admin">
                {discounts.map((discount) => (
                    <div className="discount-card-admin" key={discount.akcio}>
                        {editingId === discount.akcio ? (
                            <div className="edit-mode-layout">
                                <label>Márka:</label>
                                <input type="text" value={editForm.marka} onChange={(e) => setEditForm({ ...editForm, marka: e.target.value })} />
                                <label>Típus:</label>
                                <input type="text" value={editForm.tipus} onChange={(e) => setEditForm({ ...editForm, tipus: e.target.value })} />
                                <label>Százalék:</label>
                                <input type="number" value={editForm.akcio_szazalek} onChange={(e) => setEditForm({ ...editForm, akcio_szazalek: e.target.value })} />
                                <label>Kezdet:</label>
                                <input type="date" value={editForm.kezdo_datum} onChange={(e) => setEditForm({ ...editForm, kezdo_datum: e.target.value })} />
                                <label>Vége:</label>
                                <input type="date" value={editForm.zaro_datum} onChange={(e) => setEditForm({ ...editForm, zaro_datum: e.target.value })} />

                                <div className="admin-card-buttons">
                                    <button className="btn-edit-action" onClick={() => handleSaveUpdate(discount.akcio)}>Mentés</button>
                                    <button className="btn-delete-action" onClick={() => setEditingId(null)}>Mégse</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="discount-info">
                                    <h2 className="discount-percent-text">{discount.marka} {discount.tipus}</h2>
                                    <div className="coupon-code-container">
                                        <div className="dashed-coupon-box">{discount.akcio_szazalek}% kedvezmény</div>
                                    </div>
                                    <p className="validity-period-text">
                                        Időszak: {discount.kezdo_datum} - {discount.zaro_datum || 'Visszavonásig'}
                                    </p>
                                </div>
                                <div className="admin-card-buttons">
                                    <button className="btn-edit-action" onClick={() => {
                                        setEditingId(discount.akcio);
                                        setEditForm({
                                            marka: discount.marka,
                                            tipus: discount.tipus,
                                            akcio_szazalek: discount.akcio_szazalek,
                                            kezdo_datum: discount.kezdo_datum || '',
                                            zaro_datum: discount.zaro_datum || ''
                                        });
                                    }}>Szerkesztés</button>
                                    <button className="btn-delete-action" onClick={() => handleDelete(discount.akcio)}>Törlés</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Új akció rögzítése</h3>
                        <form onSubmit={handleCreate}>
                            <input type="text" placeholder="Márka" required value={newForm.marka} onChange={(e) => setNewForm({ ...newForm, marka: e.target.value })} />
                            <input type="text" placeholder="Típus" required value={newForm.tipus} onChange={(e) => setNewForm({ ...newForm, tipus: e.target.value })} />
                            <input type="number" placeholder="Akció százalék" required value={newForm.akcio_szazalek} onChange={(e) => setNewForm({ ...newForm, akcio_szazalek: e.target.value })} />
                            <label>Kezdő dátum:</label>
                            <input type="date" required value={newForm.kezdo_datum} onChange={(e) => setNewForm({ ...newForm, kezdo_datum: e.target.value })} />
                            <label>Záró dátum:</label>
                            <input type="date" required value={newForm.zaro_datum} onChange={(e) => setNewForm({ ...newForm, zaro_datum: e.target.value })} />
                            <div className="modal-buttons">
                                <button type="submit" className="btn-save">Mentés</button>
                                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Bezárás</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}