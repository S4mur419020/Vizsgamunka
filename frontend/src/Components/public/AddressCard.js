import { myAxios } from "../../services/api";

export default function AddressCard({ address, onRemove, t }) {

    const handleDelete = async () => {
        // Megerősítés kérése a felhasználótól
        if (window.confirm(t('confirm_delete') || "Biztosan törlöd ezt a címet?")) {
            try {
                // A szallitasi_cim_id alapján törlünk
                await myAxios.delete(`/api/szallitasi_cimek/${address.szallitasi_cim_id}`);

                // Ha sikeres, meghívjuk a szülő fetchAddresses függvényét
                onRemove();
            } catch (err) {
                console.error("Hiba a törlés során:", err);
                alert("Sajnos nem sikerült törölni a címet.");
            }
        }
    };

    return (
        <div className="address-card">
            <div className="card-info">
                <h3>{address.varos}, {address.utca_szam}</h3>
                <p>{address.iranyitoszam} {address.orszag}</p>

                {/* Csak akkor jelenítjük meg, ha van benne adat */}
                {address.ceg && <p><strong>{t('company')}:</strong> {address.ceg}</p>}
                {address.telefonszam && <p><strong>{t('phone')}:</strong> {address.telefonszam}</p>}
                {address.megjegyzes && <p className="card-note">"{address.megjegyzes}"</p>}
            </div>

            <div className="card-btns">
                {/* Törlés gomb */}
                <button className="delete-btn" onClick={handleDelete}>
                    {t('delete') || "Törlés"}
                </button>
            </div>
        </div>
    );
}