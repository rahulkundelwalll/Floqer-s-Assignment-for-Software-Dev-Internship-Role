import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const JobCountLineGraph = ({ data }) => {
  // Counting the number of jobs for each year
  const jobCounts = data.reduce((counts, item) => {
    const year = item.work_year;
    counts[year] = (counts[year] || 0) + 1;
    return counts;
  }, {});

  // Extracting years and corresponding job counts
  const years = Object.keys(jobCounts);
  const jobNumbers = Object.values(jobCounts);

  // Constructing dataset for the line graph
  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Number of Jobs',
        data: jobNumbers,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Jobs'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year'
        }
      }
    }
  };

  return (
    <div>
      <h2>Number of Jobs Trend (2020-2024)</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default JobCountLineGraph;
