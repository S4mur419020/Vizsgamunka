import { useState } from "react";

export default function AddressForm({ onSave, onCancel, t, initialCountries }) {
  const [formData, setFormData] = useState({
    country: initialCountries.length > 0 ? initialCountries[0].szabvany : "HU",
    zip: "",
    city: "",
    street: "",
    comment: "",
    company: "",
    phone: ""
  });

  return (
    <form className="addr-form" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
      <div className="form-grid">
        <select
          className="full-width"
          value={formData.country}
          onChange={e => setFormData({ ...formData, country: e.target.value })}
        >
          {initialCountries.length === 0 ? (
            <option value="">{t('loading') || 'Betöltés...'}</option>
          ) : (
            initialCountries.map(c => (
              <option key={c.szabvany} value={c.szabvany}>{c.nev}</option>
            ))
          )}
        </select>

        <input placeholder={t('zip_code')} value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} required />
        <input placeholder={t('city')} value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} required />
        <input className="full-width" placeholder={t('street')} value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} required />
        <input placeholder={t('company')} value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
        <input placeholder={t('phone')} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
        <textarea className="full-width" placeholder={t('comment')} value={formData.comment} onChange={e => setFormData({ ...formData, comment: e.target.value })} />      
        <div className="form-buttons full-width">
          <button type="submit" className="btn-save">{t('save')}</button>
          <button type="button" className="btn-close" onClick={onCancel}>{t('cancel')}</button>
        </div>
      </div>
    </form>
  );
}