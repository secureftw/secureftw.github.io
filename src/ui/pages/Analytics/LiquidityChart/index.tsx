import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    y: {
      grid: {
        color: "white",
      },
    },
    x: {
      grid: {
        color: "white",
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      // label: undefined,
      data: [1, 2, 3, 4, 5, 6, 7],
      borderColor: "rgba(255, 255, 255, 0.0)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
const LiquidityChart = (props) => {
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default LiquidityChart;
