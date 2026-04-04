import React, { useEffect, useState } from 'react';
import { myAxios } from "../../services/api";
import "../../css/AdminCss/Statistic.css";

export default function AdminDiscountsPage() {
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Form állapotok - szazalek-ra javítva a mertek helyett
    const [editForm, setEditForm] = useState({ kod: '', szazalek: '', lejarat: '' });
    const [newForm, setNewForm] = useState({ kod: '', szazalek: '', lejarat: '' });

    const fetchDiscounts = async () => {
        try {
            const res = await myAxios.get("/api/learazasok");
            setDiscounts(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Hiba a letöltéskor:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            // A newForm már szazalek-ot tartalmaz
            await myAxios.post("/api/learazasok", newForm);
            setIsModalOpen(false);
            setNewForm({ kod: '', szazalek: '', lejarat: '' });
            fetchDiscounts();
        } catch (error) {
            alert("Hiba a mentés során! (Valószínűleg már létezik ez a kód)");
        }
    };

    const startEdit = (discount) => {
        setEditingId(discount.id);
        setEditForm({
            kod: discount.kod,
            szazalek: discount.szazalek,
            lejarat: discount.lejarat || ''
        });
    };

    const handleSaveUpdate = async (id) => {
        try {
            await myAxios.put(`/api/learazasok/${id}`, editForm);
            setEditingId(null);
            fetchDiscounts();
        } catch (error) {
            alert("Hiba a frissítés során!");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Biztosan törölni szeretnéd ezt a kedvezményt?")) {
            try {
                await myAxios.delete(`/api/learazasok/${id}`);
                setDiscounts(discounts.filter(d => d.id !== id));
            } catch (error) {
                alert("Hiba a törlésnél.");
            }
        }
    };

    if (loading) return <div className="admin-container">Betöltés...</div>;

    return (
        <div className="admin-container">
            <header className="admin-header">
                <div className="header-left">
                    <h1 className="dashboard-title">Kedvezménykódok</h1>
                    <button className="btn-add-discount" onClick={() => setIsModalOpen(true)}>
                        + Új hozzáadása
                    </button>
                </div>
            </header>

            <div className="discounts-grid-admin">
                {discounts.map((discount) => (
                    <div className="discount-card-admin" key={discount.id}>
                        {editingId === discount.id ? (
                            <div className="edit-mode-layout">
                                <input 
                                    type="text" 
                                    value={editForm.kod} 
                                    onChange={(e) => setEditForm({...editForm, kod: e.target.value})}
                                    placeholder="Kód"
                                />
                                <input 
                                    type="number" 
                                    value={editForm.szazalek} 
                                    onChange={(e) => setEditForm({...editForm, szazalek: e.target.value})}
                                    placeholder="%"
                                />
                                <input 
                                    type="text" 
                                    value={editForm.lejarat} 
                                    onChange={(e) => setEditForm({...editForm, lejarat: e.target.value})}
                                    placeholder="Lejárat"
                                />
                                <div className="admin-card-buttons">
                                    <button className="btn-edit-action" onClick={() => handleSaveUpdate(discount.id)}>Mentés</button>
                                    <button className="btn-delete-action" onClick={() => setEditingId(null)}>Mégse</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="discount-info">
                                    <h2 className="discount-percent">{discount.szazalek}% kedvezmény</h2>
                                    <div className="coupon-code-box">
                                        <div className="dashed-border-code">
                                            {discount.kod}
                                        </div>
                                    </div>
                                    <p className="validity-text">
                                        KÓD ÉRVÉNYESSÉG: {discount.lejarat ? discount.lejarat.toUpperCase() : 'NINCS MEGADVA'}
                                    </p>
                                </div>

                                <div className="admin-card-buttons">
                                    <button className="btn-edit-action" onClick={() => startEdit(discount)}>Szerkesztés</button>
                                    <button className="btn-delete-action" onClick={() => handleDelete(discount.id)}>Törlés</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Új kedvezménykód rögzítése</h3>
                        <form onSubmit={handleCreate}>
                            <input
                                type="text" placeholder="Kuponkód (pl: KUPON20)" required
                                value={newForm.kod} onChange={(e) => setNewForm({ ...newForm, kod: e.target.value })}
                            />
                            <input
                                type="number" placeholder="Kedvezmény %" required
                                value={newForm.szazalek} onChange={(e) => setNewForm({ ...newForm, szazalek: e.target.value })}
                            />
                            <input
                                type="text" placeholder="Lejárat (pl: 2024.12.31)"
                                value={newForm.lejarat} onChange={(e) => setNewForm({ ...newForm, lejarat: e.target.value })}
                            />
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