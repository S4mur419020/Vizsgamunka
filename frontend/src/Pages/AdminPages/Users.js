import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/felhasznalok")
      .then((res) => {
        if (!res.ok) throw new Error("Hiba a felhasználók betöltésekor");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  const handleDelete = async (id) => {
    if (!window.confirm("Biztosan törlöd a felhasználót?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/felhasznalok/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Törlés sikertelen");

      setUsers(users.filter((user) => user.felhasznalo_id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-page">
      <h1>Felhasználók</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Regisztráció</th>
            <th>Aktív</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.felhasznalo_id}>
              <td>{user.felhasznalo_id}</td>
              <td>{user.nev}</td>
              <td>{user.email}</td>
              <td>{user.telefonszam}</td>
              <td>{new Date(user.regisztracio_datuma).toLocaleDateString()}</td>
              <td>{user.aktiv ? "Igen" : "Nem"}</td>
              <td>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(user.felhasznalo_id)}
                >
                  Törlés
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;