import React, { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import '../../css/AdminCss/Statistic.css';
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
  const [data, setData] = useState({
    termekek: [],
    valtozatok: [],
    markak: [],
    loading: true
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [termekRes, valtozatRes, markakRes] = await Promise.all([
          axios.get("/api/termekek"),
          axios.get("/api/termek_valtozatok"),
          axios.get("/api/markak")
        ]);

        setData({
          termekek: termekRes.data,
          valtozatok: valtozatRes.data,
          markak: markakRes.data,
          loading: false
        });
      } catch (error) {
        console.error("Hiba a statisztikai adatok lekérésekor:", error);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchAllData();
  }, []);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#ffffff", font: { size: 12 } } }
    },
    scales: {
      x: { ticks: { color: "#a0a0b0" }, grid: { color: "rgba(255,255,255,0.05)" } },
      y: { ticks: { color: "#a0a0b0" }, grid: { color: "rgba(255,255,255,0.05)" } }
    }
  };

  const lineData = {
    labels: data.termekek.slice(0, 10).map(t => t.nev),
    datasets: [{
      label: "Variációk száma",
      data: data.termekek.slice(0, 10).map(t => 
        data.valtozatok.filter(v => v.termek_id === t.id).length
      ),
      borderColor: "#5bc0de",
      backgroundColor: "rgba(91, 192, 222, 0.2)",
      fill: true,
      tension: 0.4
    }]
  };

  const brandStats = data.markak.map(m => ({
    nev: m.nev,
    count: data.termekek.filter(t => t.marka_id === m.id).length
  })).filter(b => b.count > 0);

  const doughnutData = {
    labels: brandStats.map(b => b.nev),
    datasets: [{
      data: brandStats.map(b => b.count),
      backgroundColor: ["#5bc0de", "#4e73df", "#1cc88a", "#f6c23e", "#e74a3b", "#858796"],
      borderWidth: 0
    }]
  };

  if (data.loading) return <div className="loading-msg">Adatok szinkronizálása...</div>;

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>STATISZTIKÁK</h1>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Összes termék</h3>
          <p className="stat-value">{data.termekek.length}</p>
        </div>
        <div className="stat-card">
          <h3>Összes variáció</h3>
          <p className="stat-value">{data.valtozatok.length}</p>
        </div>
        <div className="stat-card">
          <h3>Aktív márkák</h3>
          <p className="stat-value">{data.markak.length}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card main-chart">
          <h3>Variációk eloszlása (Top 10 termék)</h3>
          <div className="chart-wrapper">
            <Line data={lineData} options={commonOptions} />
          </div>
        </div>

        <div className="chart-card side-chart">
          <h3>Termék/Márka arány</h3>
          <div className="chart-wrapper">
            <Doughnut data={doughnutData} options={{ ...commonOptions, scales: {} }} />
          </div>
        </div>
      </div>
    </div>
  );
}