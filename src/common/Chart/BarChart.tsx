import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

type BarChartType = {
  datasets: any[];
  labels: any[];
  titleName: string;
};

export default function BarChart({ labels, datasets, titleName }: BarChartType) {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

  const data = {
    labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        bottom: 10,
        text: titleName,
        padding: {
          bottom: 24,
        },
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      datalabels: {
        align: 'end',
        anchor: 'end',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: function (context: any) {
          return context.dataset.backgroundColor;
        },
      },
    },
    scales: {
      y: {
        max: 100,
        min: 0,
        display: true,
        title: {
          display: true,
          text: 'Percents',
          color: '#9852f9',
          font: {
            family: 'Montserrat',
            size: 16,
            style: 'italic',
            lineHeight: 1.1,
          },
          padding: { top: 10, left: 0, right: 0, bottom: 0 },
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
      },
      point: {
        hoverRadius: 7,
        radius: 5,
      },
    },
  };

  return <Bar options={options} data={data} />;
}
