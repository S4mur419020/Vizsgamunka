import { useEffect, useState } from "react";
import "../css/Profile.css";
import useTranslation from "../i18n/useTranslation";
import useAuthContext from "../context/AuthContext";
import { myAxios } from "../services/api";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuthContext(); 

  const [salutation, setSalutation] = useState("ur");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [birthDay, setBirthDay] = useState(1);
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthYear, setBirthYear] = useState(2000);
  const [image, setImage] = useState(null);

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await myAxios.get("/api/profile");
        setSalutation(data.salutation || "ur");
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setAlias(data.alias || "");
        setEmail(data.email || "");
        setBirthDay(data.birth_day || 1);
        setBirthMonth(data.birth_month || 1);
        setBirthYear(data.birth_year || 2000);
        if (data.profile_image) setImage(data.profile_image);
      } catch (err) {
        console.error("Profil betöltési hiba:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert(t('auth.invalid_email'));
      return;
    }

    const data = {
      salutation,
      first_name: firstName,
      last_name: lastName,
      alias,
      email,
      birth_day: birthDay,
      birth_month: birthMonth,
      birth_year: birthYear,
      profile_image: image,
    };

    try {
      const userId = user?.id; 
      if (userId) {
        await myAxios.put(`/api/profile/${userId}`, data);
        alert(t('profile.save_success'));
      } else {
        alert("Nincs bejelentkezett felhasználó ID!");
      }
    } catch (err) {
      alert(t('profile.save_error') || "Hiba történt a mentéskor.");
    }
  };

  return (
    <div className="profile-container">
      <h1 className="section-title">{t('profile.title')}</h1>
      <p className="section-sub">{t('profile.subtitle')}</p>

      <div className="profile-layout">
        <div className="profile-left">
          <div className="field">
            <label>{t('profile.gender')}</label>
            <div className="radio-row">
              <label className={`radio ${salutation === "ur" ? "checked" : ""}`}>
                <input type="radio" checked={salutation === "ur"} onChange={() => setSalutation("ur")} />
                {t('profile.mr')}
              </label>
              <label className={`radio ${salutation === "holgy" ? "checked" : ""}`}>
                <input type="radio" checked={salutation === "holgy"} onChange={() => setSalutation("holgy")} />
                {t('profile.ms')}
              </label>
            </div>
          </div>

          <div className="field">
            <label>{t('profile.firstname')}</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>

          <div className="field">
            <label>{t('profile.lastname')}</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>

          <div className="field">
            <label>{t('profile.alias')}</label>
            <input value={alias} onChange={(e) => setAlias(e.target.value)} />
          </div>

          <div className="field">
            <label>{t('auth.email')}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="field">
            <label>{t('profile.birthdate')}</label>
            <div className="birth-row">
              <select value={birthDay} onChange={(e) => setBirthDay(Number(e.target.value))}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select value={birthMonth} onChange={(e) => setBirthMonth(Number(e.target.value))}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <select value={birthYear} onChange={(e) => setBirthYear(Number(e.target.value))}>
                {Array.from({ length: 80 }, (_, i) => 2026 - i).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <button className="save-btn" onClick={saveProfile}>{t('profile.save')}</button>
        </div>

        <div className="profile-right">
          <div className="photo-box">
            {image ? <img src={image} alt="Profil" /> : (
              <div className="photo-placeholder">
                <div className="avatar-circle">👤</div>
                <p>{t('profile.upload_img')}</p>
              </div>
            )}
          </div>
          <label className="upload-btn">
            {t('profile.upload_btn')}
            <input type="file" accept="image/*" onChange={handleImage} />
          </label>
        </div>
      </div>
    </div>
  );
}