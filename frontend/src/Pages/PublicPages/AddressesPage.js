import { useEffect, useState, useContext } from "react";
import "../../css/PublicCss/Addresses.css";
import useTranslation from '../../i18n/useTranslation';
import { myAxios } from '../../services/api';
import AddressForm from "../../Components/public/AddressForm";
import AddressCard from "../../Components/public/AddressCard";
import { ShoeContext } from "../../context/ShoeContext";

export default function AddressesPage() {
  const { t } = useTranslation();
  const [addresses, setAddresses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const { user } = useContext(ShoeContext);

  useEffect(() => {
    fetchAddresses();
    myAxios.get('/api/regiok')
      .then(res => setCountries(res.data))
      .catch(err => console.error("Hiba a régiók betöltésekor:", err));
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await myAxios.get('/api/szallitasi_cimek');
      setAddresses(res.data);
    } catch (err) {
      console.error("Címek betöltése sikertelen", err);
    }
  };

  const handleSave = async (formData) => {
    try {
      const payload = {
        felhasznalo_id: user?.id || user?.felhasznalo_id,
        firstName: user?.keresztnev || "Vezetéknév",
        lastName: user?.vezeteknev || "Keresztnév",
        orszag: formData.country,
        iranyitoszam: formData.zip,
        varos: formData.city,
        street: formData.street, 
        megjegyzes: formData.comment || "",
        ceg: formData.company || "",
        telefonszam: formData.phone || ""
      };

      const res = await myAxios.post('/api/szallitasi_cimek', payload);

      if (res.status === 200 || res.status === 201) {
        await fetchAddresses(); 
        setOpenForm(false);
      }
    } catch (err) {
      console.error("Mentési hiba (nézd a Response fület!):", err.response?.data);
      alert(t('save_error') || "Hiba történt a mentés során!");
    }
  };

  return (
    <div className="addr-wrap">
      <h1 className="section-title">{t('addresses') || 'Címeim'}</h1>
      <p className="addr-description">{t('adress.article')}</p>

      {!openForm ? (
        <>
          <button className="btn-add" onClick={() => setOpenForm(true)}>
            {t('add_new_address') || 'Új cím hozzáadása'}
          </button>

          <div className="addr-grid">
            {addresses.length > 0 ? (
              addresses.map(a => (
                <AddressCard
                  key={a.szallitasi_cim_id}
                  address={a}
                  onRemove={fetchAddresses}
                  t={t}
                />
              ))
            ) : (
              <p className="no-addr-msg">ⓘ {t('no_addresses') || 'Még nem adtál hozzá címeket'}</p>
            )}
          </div>
        </>
      ) : (
        <AddressForm
          onSave={handleSave}
          onCancel={() => setOpenForm(false)}
          t={t}
          initialCountries={countries}
        />
      )}
    </div>
  );
}