import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../css/Password.css";

export default function PasswordPage() {
  const [oldPass, setOldPass] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const save = () => {
    if (pw.length < 6) return alert("Az új jelszó minimum 6 karakter legyen.");
    if (pw !== confirm) return alert("A jelszavak nem egyeznek.");
    // itt jöhetne API hívás
    setOldPass(""); setPw(""); setConfirm("");
    alert("Jelszó sikeresen frissítve.");
  };

  return (
    <div className="pw-wrap">
      <h1 className="section-title">Jelszó megváltoztatása</h1>
      <p className="section-sub">Valaki megleshette a jelszavad? Itt meg tudod változtatni a régit egy újra.</p>

      <div className="pw-field">
        <label>Régi jelszó</label>
        <div className="pw-input">
          <input
            type={showOld ? "text" : "password"}
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
          <button type="button" onClick={() => setShowOld(s => !s)} aria-label="Jelszó mutatása">
            {showOld ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      <div className="pw-field">
        <label>Új jelszó</label>
        <div className="pw-input">
          <input
            type={showPw ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <button type="button" onClick={() => setShowPw(s => !s)} aria-label="Jelszó mutatása">
            {showPw ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      <div className="pw-field">
        <label>Megerősítés</label>
        <div className="pw-input">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button type="button" onClick={() => setShowConfirm(s => !s)} aria-label="Jelszó mutatása">
            {showConfirm ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      <button className="pw-save" onClick={save}>Jelszó mentése</button>
    </div>
  );
}