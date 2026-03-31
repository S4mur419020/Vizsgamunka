import React, { useEffect, useState } from 'react';
import { myAxios } from "../../services/api";
import "../../css/AdminCss/Statistic.css";

export default function AdminDiscountsPage() {
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({ kod: '', mertek: '', lejarat: '' });
    const [newForm, setNewForm] = useState({ kod: '', mertek: '', lejarat: '' });

    const fetchDiscounts = async () => {
        try {
            const res = await myAxios.get("/api/learazasok");
            setDiscounts(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Hiba:", error);
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
            setNewForm({ kod: '', mertek: '', lejarat: '' });
            fetchDiscounts();
        } catch (error) {
            alert("Hiba a létrehozás során!");
        }
    };

    const startEdit = (discount) => {
        setEditingId(discount.id);
        setEditForm({
            kod: discount.kod,
            mertek: discount.mertek,
            lejarat: discount.lejarat || ''
        });
    };

    const handleSave = async (id) => {
        try {
            await myAxios.put(`/api/learazasok/${id}`, editForm);
            setEditingId(null);
            fetchDiscounts();
        } catch (error) {
            alert("Hiba a mentés során!");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Biztosan törölni szeretnéd?")) {
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
                            <div className="edit-mode">
                                <input
                                    type="text"
                                    value={editForm.kod}
                                    onChange={(e) => setEditForm({ ...editForm, kod: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editForm.mertek}
                                    onChange={(e) => setEditForm({ ...editForm, mertek: e.target.value })}
                                />
                                <div className="admin-actions">
                                    <button className="btn-save" onClick={() => handleSave(discount.id)}>Mentés</button>
                                    <button className="btn-cancel" onClick={() => setEditingId(null)}>Mégse</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="discount-info">
                                    <h2 className="discount-percent">{discount.mertek}% kedvezmény</h2>
                                    <div className="coupon-code-box">
                                        <code>{discount.kod}</code>
                                    </div>
                                    <p className="validity-text">KÓD ÉRVÉNYESSÉG: {discount.lejarat || 'Nincs megadva'}</p>
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
                        <h3>Új kedvezménykód</h3>
                        <form onSubmit={handleCreate}>
                            <input
                                type="text" placeholder="Kuponkód (pl: NYAR2024)" required
                                value={newForm.kod} onChange={(e) => setNewForm({ ...newForm, kod: e.target.value })}
                            />
                            <input
                                type="number" placeholder="Százalék (pl: 15)" required
                                value={newForm.mertek} onChange={(e) => setNewForm({ ...newForm, mertek: e.target.value })}
                            />
                            <input
                                type="text" placeholder="Érvényesség (pl: 5 nap)"
                                value={newForm.lejarat} onChange={(e) => setNewForm({ ...newForm, lejarat: e.target.value })}
                            />
                            <div className="modal-buttons">
                                <button type="submit" className="btn-save">Létrehozás</button>
                                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Bezárás</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}