import { useEffect, useState } from "react";
import "../css/Profile.css";

export default function ProfilePage() {
  const userName = localStorage.getItem("userName") || "Felhasználó";

  const [salutation, setSalutation] = useState("ur");
  const [firstName, setFirstName] = useState(userName);
  const [lastName, setLastName] = useState("");
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState(`${userName}@example.com`);
  const [birthDay, setBirthDay] = useState(1);
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthYear, setBirthYear] = useState(2000);
  const [image, setImage] = useState(null);          
  const [imageFile, setImageFile] = useState(null);   
  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      try {
        const p = JSON.parse(stored);
        setSalutation(p.salutation ?? "ur");
        setFirstName(p.firstName ?? firstName);
        setLastName(p.lastName ?? "");
        setAlias(p.alias ?? "");
        setEmail(p.email ?? email);
        setBirthDay(p.birthDay ?? 1);
        setBirthMonth(p.birthMonth ?? 1);
        setBirthYear(p.birthYear ?? 2000);
        if (p.imageDataUrl) setImage(p.imageDataUrl);
      } catch {}
    }
  }, [email,firstName]);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    const data = {
      salutation,
      firstName,
      lastName,
      alias,
      email,
      birthDay,
      birthMonth,
      birthYear,
      imageDataUrl: image || null,
    };
    localStorage.setItem("profile", JSON.stringify(data));
    if (firstName) localStorage.setItem("userName", firstName);
    alert("Adataid elmentve.");
  };

  return (
    <div className="profile-container">
      <h1 className="section-title">Személyes adatok</h1>
      <p className="section-sub">Itt tudod szerkeszteni a személyes adataidat.</p>

      <div className="profile-layout">
        <div className="profile-left">
          <div className="field">
            <label>Megszólítás (választható)</label>
            <div className="radio-row">
              <label className={`radio ${salutation === "ur" ? "checked" : ""}`}>
                <input
                  type="radio"
                  name="salutation"
                  value="ur"
                  checked={salutation === "ur"}
                  onChange={() => setSalutation("ur")}
                />
                Úr
              </label>
              <label className={`radio ${salutation === "holgy" ? "checked" : ""}`}>
                <input
                  type="radio"
                  name="salutation"
                  value="holgy"
                  checked={salutation === "holgy"}
                  onChange={() => setSalutation("holgy")}
                />
                Hölgy
              </label>
            </div>
          </div>

          <div className="field">
            <label>Keresztnév</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>

          <div className="field">
            <label>Vezetéknév</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          <div className="field">
            <label>Alias</label>
            <input value={alias} onChange={(e) => setAlias(e.target.value)} />
          </div>

          <div className="field">
            <label>E-mail</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="field">
            <label>Születési dátum</label>
            <div className="birth-row">
              <select value={birthDay} onChange={(e) => setBirthDay(Number(e.target.value))}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select value={birthMonth} onChange={(e) => setBirthMonth(Number(e.target.value))}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select value={birthYear} onChange={(e) => setBirthYear(Number(e.target.value))}>
                {Array.from({ length: 70 }, (_, i) => 2024 - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <button className="save-btn" onClick={saveProfile}>Adatok mentése</button>
        </div>
        <div className="profile-right">
          <div className="photo-box">
            {image ? (
              <img src={image} alt="Profil" />
            ) : (
              <div className="photo-placeholder">
                <div className="avatar-circle">👤</div>
                <p>Húzd ide a képet vagy töltsd fel</p>
              </div>
            )}
          </div>

          <label className="upload-btn">
            Töltsd fel
            <input type="file" accept="image/*" onChange={handleImage} />
          </label>
        </div>
      </div>
    </div>
  );
}