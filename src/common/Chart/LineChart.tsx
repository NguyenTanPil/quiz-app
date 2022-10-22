import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

type LineChartProps = {
  labels: string[];
  datasets: any[];
  titleName: string;
};

export default function LineChart({ labels, datasets, titleName }: LineChartProps) {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartDataLabels);

  const data = {
    labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: 'top' as const,
        padding: {
          bottom: 8,
          top: 4,
        },
      },
      title: {
        display: true,
        text: titleName,
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      datalabels: {
        display: true,
        borderRadius: 4,
        padding: 6,
        color: 'white',
        backgroundColor: function (context: any) {
          return context.dataset.backgroundColor;
        },
      },
    },
    scales: {
      y: {
        max: labels.length + 1,
        min: 0,
        display: true,
        title: {
          display: true,
          text: 'Students',
          color: '#9852f9',
          font: {
            family: 'Montserrat',
            size: 16,
            style: 'italic',
            lineHeight: 1.1,
          },
        },
      },
    },
    aspectRatio: 5 / 3,
    layout: {
      padding: {
        top: 24,
        right: 16,
        bottom: 0,
        left: 8,
      },
    },
    elements: {
      line: {
        fill: false,
        tension: 0.4,
      },
    },
  };

  return <Line options={options} data={data} />;
}
