import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../../css/PublicCss/Password.css";
import useTranslation from '../../i18n/useTranslation';
import { myAxios } from "../../services/api";
import useAuthContext from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom"; 

export default function PasswordPage() {
  const { t } = useTranslation();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const [oldPass, setOldPass] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  
  const [showOld, setShowOld] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const save = async () => {
    if (pw.length < 6) return alert(t('auth.invalid_password_length') || "Minimum 6 karakter!");
    if (pw !== confirm) return alert(t('password.no_match') || "A jelszavak nem egyeznek.");

    try {
      await myAxios.put(`/api/password-update`, {
        current_password: oldPass,
        password: pw,
        password_confirmation: confirm
      });

      alert(t('profile.save_success') || "Sikeres jelszómódosítás! Kérjük jelentkezzen be újra.");
      await logout();
      navigate("/login");

    } catch (error) {
      console.error("Hiba:", error.response?.data);
      const message = error.response?.data?.message || "Hiba történt a mentés során.";
      alert(message);
    }
  };

  return (
    <div className="pw-wrap">
      <h1 className="section-title">{t('password.title')}</h1>
      <p className="section-sub">{t('password.subtitle')}</p>

      <div className="pw-field">
        <label>{t('password.old')}</label>
        <div className="pw-input">
          <input
            type={showOld ? "text" : "password"}
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
          <button type="button" onClick={() => setShowOld(s => !s)}>
            {showOld ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      <div className="pw-field">
        <label>{t('password.new')}</label>
        <div className="pw-input">
          <input
            type={showPw ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <button type="button" onClick={() => setShowPw(s => !s)}>
            {showPw ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      <div className="pw-field">
        <label>{t('password.confirm')}</label>
        <div className="pw-input">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button type="button" onClick={() => setShowConfirm(s => !s)}>
            {showConfirm ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      <button className="pw-save" onClick={save}>{t('password.save')}</button>
    </div>
  );
}