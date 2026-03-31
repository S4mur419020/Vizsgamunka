import { useEffect, useState } from "react";
import { myAxios } from "../../services/api"; 
import "../../css/AdminCss/Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await myAxios.get("/api/felhasznalok");
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setError("Hiba a felhasználók betöltésekor");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Biztosan törlöd a felhasználót?")) return;
    try {
      await myAxios.delete(`/api/felhasznalok/${id}`);
      setUsers(users.filter((user) => user.felhasznalo_id !== id));
    } catch (err) {
      alert("Törlés sikertelen");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await myAxios.put(`/api/felhasznalok/${id}/role`, { 
        jogosultsag: newRole 
      });
      
      setUsers(users.map(u => u.felhasznalo_id === id ? { ...u, jogosultsag: newRole } : u));
    } catch (err) {
      alert("Módosítás sikertelen");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loader">Betöltés...</div>;
  if (error) return <div className="error-msg">{error}</div>;

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Users <span className="user-count">({filteredUsers.length})</span></h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="table-wrapper">
        <table className="modern-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Created</th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.felhasznalo_id}>
                <td className="user-info">
                  <div className="avatar">{user.nev ? user.nev.charAt(0) : "?"}</div>
                  <div>
                    <div className="user-name">{user.nev}</div>
                    <div className="user-id">ID: {user.felhasznalo_id}</div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.regisztracio_datuma ? new Date(user.regisztracio_datuma).toLocaleDateString() : "-"}</td>
                <td>
                  <span className={`badge ${user.aktiv ? "active" : "inactive"}`}>
                    {user.aktiv ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                    <select 
                        className="role-select"
                        value={user.jogosultsag || "user"} 
                        onChange={(e) => handleRoleChange(user.felhasznalo_id, e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </td>
                <td>
                  <button className="btn-icon delete" onClick={() => handleDelete(user.felhasznalo_id)} title="Törlés">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;