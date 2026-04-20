import React, { useState, useEffect } from 'react';
import { myAxios } from "../../services/api"; 
import '../../css/AdminCss/AdminFeedbackPage.css'; 

const AdminFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await myAxios.get('/api/blog');
        setFeedbacks(response.data);
      } catch (err) {
        console.error("Hiba az adatok lekérésekor:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  if (loading) return <div className="admin-feedback-container">Betöltés...</div>;

  return (
    <div className="admin-feedback-container">
      <h2 className="admin-title">Felhasználói Visszajelzések</h2>
      
      <div className="feedback-table-wrapper">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Felhasználó</th>
              <th>Email</th>
              <th>Vélemény</th>
              <th>Dátum</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((fb) => (
                <tr key={fb.id || fb._id}>
                  <td className="user-name">Felhasználó #{fb.szerzo_id}</td>
                  <td>{fb.userEmail}</td>
                  <td className="feedback-comment">"{fb.tartalom}"</td>
                  <td>{new Date(fb.publikacio_datuma).toLocaleDateString('hu-HU')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">Nincs még érkezett vélemény.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFeedbackPage;