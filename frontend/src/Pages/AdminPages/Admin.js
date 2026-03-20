import { useState, useEffect } from "react";
import axios from "axios";
import AdminShoeCards from "../../Components/admin/AdminShoeCards";
import useAuthContext from "../../context/AuthContext";
import '../../css/AdminCss/AdminPage.css';

export default function Admin() {
    const { user } = useAuthContext();
    const [termekekLista, setTermekekLista] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTermekek() {
            try {
                const res = await axios.get("http://localhost:8000/api/termekek", {
                    withCredentials: true
                });
                setTermekekLista(res.data);
            } catch (err) {
                console.error("Hiba a termékek lekérésekor:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchTermekek();
    }, []);

    if (!user || user.role !== "admin") {
        return null;
    }

    function handleSzerkeszt(termek) {
        console.log("Szerkesztés:", termek);
    }

    async function handleTorol(termekId) {
        if (!window.confirm("Biztosan törlöd ezt a terméket?")) return;

        try {
            await axios.delete(`http://localhost:8000/api/termekek/${termekId}`, {
                withCredentials: true
            });
            setTermekekLista(prev => prev.filter(t => t.id !== termekId));
        } catch (err) {
            console.error("Hiba a termék törlésekor:", err);
        }
    }

    if (loading) return <p>Betöltés...</p>;
    if (!termekekLista.length) return <p>Nincs elérhető termék.</p>;

    return (
        <main className="admin-main">
            <h1>Admin Termékek</h1>
            <AdminShoeCards
                termekek={termekekLista}
                onSzerkeszt={handleSzerkeszt}
                onTorol={handleTorol}
            />
        </main>
    );
}