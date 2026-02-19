import { useEffect, useState } from "react";
import "../css/Addresses.css";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("Magyarország");

  useEffect(() => {
    const stored = localStorage.getItem("addresses");
    if (stored) {
      try { setAddresses(JSON.parse(stored)); } catch {}
    }
  }, []);

  const saveToStorage = (list) => {
    localStorage.setItem("addresses", JSON.stringify(list));
  };

  const addAddress = (e) => {
    e.preventDefault();
    const newAddr = {
      id: Date.now(),
      fullName, phone, zip, city, street, country
    };
    const list = [newAddr, ...addresses];
    setAddresses(list);
    saveToStorage(list);
    // reset form
    setFullName(""); setPhone(""); setZip(""); setCity(""); setStreet("");
    setCountry("Magyarország");
    setOpenForm(false);
  };

  const removeAddress = (id) => {
    const list = addresses.filter(a => a.id !== id);
    setAddresses(list);
    saveToStorage(list);
  };

  return (
    <div className="addr-wrap">
      <h1 className="section-title">Címeim</h1>
      <p className="section-sub">Itt tudod módosítani a szállítási és számlázási címeidet.</p>

      <div className="addr-header">
        <h3>Szállítási címek</h3>
        <button className="addr-add-btn" onClick={() => setOpenForm(s => !s)}>
          {openForm ? "Mégse" : "+ Új cím hozzáadása"}
        </button>
      </div>

      {openForm && (
        <form className="addr-form" onSubmit={addAddress}>
          <div className="row">
            <div className="col">
              <label>Név</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="col">
              <label>Telefon</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Irányítószám</label>
              <input value={zip} onChange={(e) => setZip(e.target.value)} required />
            </div>
            <div className="col">
              <label>Város</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Utca, házszám</label>
              <input value={street} onChange={(e) => setStreet(e.target.value)} required />
            </div>
            <div className="col">
              <label>Ország</label>
              <input value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
          </div>

          <div className="actions">
            <button type="button" className="btn ghost" onClick={() => setOpenForm(false)}>Mégse</button>
            <button type="submit" className="btn primary">Mentés</button>
          </div>
        </form>
      )}

      {addresses.length === 0 ? (
        <div className="addr-empty">
          <p><strong>Még nem adtál hozzá címeket.</strong></p>
          <p className="muted">Ne aggódj a kitöltés miatt, nem fogunk zaklatni.</p>
        </div>
      ) : (
        <div className="addr-grid">
          {addresses.map((a) => (
            <div className="addr-card" key={a.id}>
              <div className="addr-lines">
                <div className="line">{a.fullName}</div>
                <div className="line">{a.street}</div>
                <div className="line">{a.zip} {a.city}</div>
                <div className="line">{a.country}</div>
                <div className="line muted">{a.phone}</div>
              </div>

              <div className="addr-actions">
                {/* Később: szerkesztés is jöhet ide */}
                <button className="btn danger" onClick={() => removeAddress(a.id)}>Törlés</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}