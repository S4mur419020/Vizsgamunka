import { myAxios } from "../../services/api";
import useTranslation from '../../i18n/useTranslation';

export default function AddressCard({ address, onRemove }) {
    const { t } = useTranslation();

    const handleDelete = async () => {  
        if (window.confirm(t('confirm_delete'))) {
            try {
                await myAxios.delete(`/api/szallitasi_cimek/${address.szallitasi_cim_id}`);
                onRemove();
            } catch (err) {
                console.error("Hiba a törlés során:", err);
                alert(t('error.delete') || "Hiba történt a törlés során.");
            }
        }
    };

    return (
        <div className="address-card">
            <div className="card-info">
                <h3>{address.varos}, {address.utca_szam}</h3>
                <p>{address.iranyitoszam} {address.orszag}</p>
                {address.ceg && (
                    <p><strong>{t('company')}:</strong> {address.ceg}</p>
                )}
                {address.telefonszam && (
                    <p><strong>{t('phone')}:</strong> {address.telefonszam}</p>
                )}
                {address.megjegyzes && (
                    <p className="card-note">
                        <strong>{t('comment')}:</strong> "{address.megjegyzes}"
                    </p>
                )}
            </div>
            <div className="card-btns">
                <button className="delete-btn" onClick={handleDelete}>
                    {t('delete')}
                </button>
            </div>
        </div>
    );
}