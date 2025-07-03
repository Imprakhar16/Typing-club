import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("typingSessions")) || [];
    setSessions(data);
  }, []);

  if (!sessions.length) return <p>No sessions yet—take a test first!</p>;

  const chartData = {
    labels: sessions.map(s => new Date(s.date).toLocaleDateString()),
    datasets: [
      {
        label: "WPM",
        data: sessions.map(s => s.wpm),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
      {
        label: "Accuracy",
        data: sessions.map(s => s.accuracy),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: {
      y: {
        beginAtZero: true,
        max: 120,
      },
    },
  };

  return (
    <div className="dashboard">
      <h2>Performance Graph</h2>
      <Line data={chartData} options={options} />

      <h3>Recent Sessions</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>WPM</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s, i) => (
            <tr key={i}>
              <td>{new Date(s.date).toLocaleString()}</td>
              <td>{s.wpm}</td>
              <td>{s.accuracy}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
