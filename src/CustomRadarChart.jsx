import React, {useEffect, useState} from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import CustomRadarController from "./CustomRadarController";
import CustomRadialLinearScale from "./CustomRadialLinearScale";
import axios from "axios";

// Regiser the basics
ChartJS.register(LineElement, PointElement, Filler, Tooltip, Legend);

// Register custom controller and scale
ChartJS.register(CustomRadarController, CustomRadialLinearScale);

const options = {
  scales: {
    r: {
      type: "derivedRadialLinearScale",
      grid: {
        color: 'grey',
        lineWidth: 1.5
      },

      ticks: {
        display: false,
        stepSize: 10
      },
      angleLines: {
        display: true,
        color: "#41505e",
        borderDashOffset: 5,
        lineWidth: 2,
      },

      angle: 115,
      suggestedMin: 0,
      suggestedMax: 50,
      pointLabels: {
        font: {
          family: "Open Sans",
          size: 30,
          weight: "300"
        },
        color: "rgba(46,36,41,0.55)",
        borderRadius: 4
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    },

  }
};

const CustomRadarChart = () => {
  const [dataChart, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/v1/chart'); // Replace with your API endpoint

        setChartData({
          labels: response.data.map((element) => element.label),
          datasets: response.data
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const shadowEffect = {
    id: 'shadowEffect',
    beforeDatasetsDraw: function(chart, options) {
        chart.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        chart.ctx.shadowBlur = 30;
    },
  };
  return (
      dataChart && <Chart type="derivedRadar" data={dataChart} options={options} plugins={[shadowEffect]}/>
  );
}

export default CustomRadarChart;
