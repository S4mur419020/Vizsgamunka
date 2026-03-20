import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/AdminCss/AdminShoeEditPage.css';

const AdminShoeEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [shoe, setShoe] = useState({ nev: '', ar: '', kategoria_id: '' });
    const [categories, setCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // A beküldött PHP kód alapján az útvonalak: 'termekek' és 'kategoriak'
                const [shoeRes, catRes] = await Promise.all([
                    axios.get(`http://localhost:8000/api/termekek/${id}`),
                    axios.get(`http://localhost:8000/api/kategoriak`)
                ]);

                setShoe({
                    nev: shoeRes.data.nev,
                    ar: shoeRes.data.ar,
                    kategoria_id: shoeRes.data.kategoria_id || ''
                });
                setCategories(catRes.data);

                setPreviewUrl(`http://localhost:8000/storage/${shoeRes.data.kepUrl}`);
            } catch (err) {
                console.error("Hiba az adatok lekérésekor:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nev', shoe.nev);
        formData.append('ar', shoe.ar);
        formData.append('kategoria_id', shoe.kategoria_id);

        if (selectedFile) {
            formData.append('kep', selectedFile);
        }

        try {
            await axios.put(`http://localhost:3000/api/products/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Sikeres mentés!");
            navigate('/admin/products');
        } catch (err) {
            alert("Hiba történt a mentés során!");
        }
    };

    if (loading) return <div className="admin-edit-container">Betöltés...</div>;

    return (
        <div className="admin-edit-container">
            <div className="edit-form-card">
                <h2 className="edit-title">Termék Szerkesztése</h2>
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>Cipő neve:</label>
                        <input
                            type="text"
                            value={shoe.nev}
                            onChange={(e) => setShoe({ ...shoe, nev: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Ár (Ft):</label>
                        <input
                            type="number"
                            value={shoe.ar}
                            onChange={(e) => setShoe({ ...shoe, ar: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Kategória:</label>
                        <select
                            value={shoe.kategoria_id}
                            onChange={(e) => setShoe({ ...shoe, kategoria_id: e.target.value })}
                            required
                        >
                            <option value="">Válassz kategóriát...</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nev}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group image-section">
                        <label>Termék képe:</label>
                        <div className="image-preview-container">
                            {previewUrl && <img src={previewUrl} alt="Cipő fotó" className="large-preview" />}
                            <div className="file-input-wrapper">
                                <span>Új kép választása (opcionális):</span>
                                <input type="file" accept="image/*" onChange={handleFileChange} />
                            </div>
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="save-btn">Mentés</button>
                        <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Mégse</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminShoeEditPage;