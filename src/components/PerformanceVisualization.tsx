import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import type { Result } from "../pages/RaceDetails";
import "../styles.css";

ChartJS.register(LinearScale, CategoryScale, BarElement, Tooltip, Legend, Title);

type Props = {
  results: Result[];
};


export default function PerformanceVisualization({ results }: Props) {
    
    const winner = results.find((r) => r.position === "1")?.Time?.millis;
  // Keep only finishers with a numeric total time in ms
  const finishers = results.filter((r) => r.Time?.millis);

  const labels = finishers.map(
    (r) => `${r.Driver.givenName} ${r.Driver.familyName}`
  );

  // Convert ms → hours (float)
  const values = finishers.map((r) => Number(r.Time!.millis) / 3_600_000);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Time (hours)",
        data: values,
        backgroundColor: "rgba(225, 6, 0, 0.7)", // F1 red with alpha
        borderColor: "#E10600",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const axisText = "#FFFFFF";
  const grid = "rgba(255,255,255,0.12)";

  const options = {
    indexAxis: "y" as const, // <-- horizontal
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: { labels: { color: axisText } },
      title: { display: false, text: "Race Times", color: axisText },
     
    },
    scales: {
      x: {
        min: winner ? (Number(winner) / 3_600_000) -0.005 : undefined,
        type: "linear" as const,
        title: { display: true, text: "Hours", color: axisText },
        ticks: { color: axisText

         },
        grid: { color: grid },
      },
      y: {
        type: "category" as const,
        title: { display: true, text: "Driver", color: axisText },
        ticks: { color: axisText },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="visualization-graph" style={{ height: 360 }}>
      <Bar data={data} options={options} />
    </div>
  );
}
