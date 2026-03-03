import React, { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import "../AdminCss/Statistic.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Statistics() {
  const [termekek, setTermekek] = useState([]);
  const [valtozatok, setValtozatok] = useState([]);
  const [brandsMap, setBrandsMap] = useState({}); // márka_id -> név

  useEffect(() => {
    const fetchData = async () => {
      try {
        const termekRes = await axios.get("/api/termekek");
        const valtozatRes = await axios.get("/api/termek_valtozatok");
        const brandsRes = await axios.get("/api/markak"); // feltételezzük, hogy van endpoint a márkákhoz

        // Márkák map ID -> név
        const map = {};
        brandsRes.data.forEach(b => (map[b.id] = b.nev));
        setBrandsMap(map);

        setTermekek(termekRes.data);
        setValtozatok(valtozatRes.data);
      } catch (error) {
        console.error("Hiba az adatok lekérésekor:", error);
      }
    };

    fetchData();
  }, []);

  // Line chart: elérhető variációk darabszáma termék név szerint
  const lineData = {
    labels: termekek.map(t => t.nev),
    datasets: [
      {
        label: "Elérhető variációk",
        data: termekek.map(t =>
          valtozatok.filter(v => v.termek_id === t.id && v.elerheto).length
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.4)",
        tension: 0.3,
      },
    ],
  };

  // Doughnut chart: márkák aránya
  const brandCounts = termekek.reduce((acc, t) => {
    const brandName = brandsMap[t.marka_id] || "Ismeretlen";
    acc[brandName] = (acc[brandName] || 0) + 1;
    return acc;
  }, {});

  const doughnutData = {
    labels: Object.keys(brandCounts),
    datasets: [
      {
        data: Object.values(brandCounts),
        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#36b9cc",
          "#f6c23e",
          "#e74a3b",
          "#858796",
          "#fd7e14",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Összes termék</h3>
          <p>{termekek.length}</p>
        </div>
        <div className="stat-card">
          <h3>Összes variáció</h3>
          <p>{valtozatok.length}</p>
        </div>
        <div className="stat-card">
          <h3>Elérhető márkák</h3>
          <p>{Object.keys(brandCounts).length}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-card">
          <Line data={lineData} />
        </div>
        <div className="chart-card">
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
}