import { useEffect, useState } from "react";
import "../../css/PublicCss/Addresses.css";
import useTranslation from '../../i18n/useTranslation';
import { myAxios } from '../../services/api';

export default function AddressesPage() {
  const { t } = useTranslation();
  const [addresses, setAddresses] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "", zip: "", city: "", street: "", country: "Magyarország" });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await myAxios.get('/api/szallitasi_cimek');
      setAddresses(res.data);
    } catch (err) { console.error("Hiba a címek lekérésekor"); }
  };

  const addAddress = async (e) => {
    e.preventDefault();
    try {
      await myAxios.post('/api/addresses', formData);
      fetchAddresses(); 
      setOpenForm(false);
      setFormData({ fullName: "", phone: "", zip: "", city: "", street: "", country: "Magyarország" });
    } catch (err) { alert("Hiba a mentés során!"); }
  };

  const removeAddress = async (id) => {
    if (!window.confirm("Biztosan törlöd?")) return;
    try {
      await myAxios.delete(`/api/addresses/${id}`);
      setAddresses(addresses.filter(a => a.id !== id));
    } catch (err) { alert("Hiba a törlés során!"); }
  };

  return (
    <div className="addr-wrap">
      <h1 className="section-title">{t('addresses.title')}</h1>
      <div className="addr-header">
        <button className="addr-add-btn" onClick={() => setOpenForm(!openForm)}>
          {openForm ? t('settings.close') : t('addresses.add_new')}
        </button>
      </div>

      {openForm && (
        <form className="addr-form" onSubmit={addAddress}>
          <input placeholder="Név" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} required />
          <input placeholder="Város" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} required />
          <button type="submit" className="btn primary">{t('profile.save')}</button>
        </form>
      )}

      <div className="addr-grid">
        {addresses.map(a => (
          <div className="addr-card" key={a.id}>
            <p>{a.fullName}<br/>{a.zip} {a.city}, {a.street}</p>
            <button className="btn danger" onClick={() => removeAddress(a.id)}>Törlés</button>
          </div>
        ))}
      </div>
    </div>
  );
}