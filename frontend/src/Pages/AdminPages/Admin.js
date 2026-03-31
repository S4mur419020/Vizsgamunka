import { useState, useEffect } from "react";
import { myAxios } from "../../services/api";
import AdminShoeCards from "../../Components/admin/AdminShoeCards";
import useAuthContext from "../../context/AuthContext";
import '../../css/AdminCss/AdminPage.css';

export default function Admin() {
    const { user } = useAuthContext();
    const [termekekLista, setTermekekLista] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("admin"); 

    useEffect(() => {
        async function fetchTermekek() {
            try {
                const res = await myAxios.get("api/termekek");
                setTermekekLista(res.data);
            } catch (err) {
                console.error("Hiba a termékek lekérésekor:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchTermekek();
    }, []);

    if (!user || user.role !== "admin") return null;

    async function handleTorol(termekId) {
        if (!window.confirm("Biztosan törlöd ezt a terméket?")) return;
        try {
            await myAxios.delete(`api/termekek/${termekId}`);
            setTermekekLista(prev => prev.filter(t => t.id !== termekId));
        } catch (err) { console.error("Hiba a törléskor:", err); }
    }

    if (loading) return <p>Betöltés...</p>;

    return (
        <div className="admin-main-full"> 
            <nav className="view-switcher">
                <button 
                    className={`view-btn ${view === "user" ? "active" : ""}`} 
                    onClick={() => setView("user")}
                >
                    FELHASZNÁLÓ
                </button>
                <button 
                    className={`view-btn ${view === "admin" ? "active" : ""}`} 
                    onClick={() => setView("admin")}
                >
                    ADMIN
                </button>
            </nav>

            <h1 className="main-title">{view === "admin" ? "Admin Termékek" : "Vásárlói Nézet"}</h1>
            <div className={`cards-wrapper ${view === "user" ? "hide-all-buttons" : ""}`}>
                <AdminShoeCards
                    termekek={termekekLista}
                    onSzerkeszt={view === "admin" ? (t) => console.log(t) : null}
                    onTorol={view === "admin" ? handleTorol : null}
                />
            </div>
        </div>
    );
}