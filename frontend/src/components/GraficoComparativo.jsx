import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraficoComparativo({ PF, PJ }) {
  const data = {
    labels: ["Imposto", "Renda Líquida"],
    datasets: [
      {
        label: "Pessoa Física",
        data: [PF.imposto, PF.liquido],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Pessoa Jurídica",
        data: [PJ.totalImpostos, PJ.liquido],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Comparativo PF × PJ" },
    },
  };

  return <Bar data={data} options={options} />;
}