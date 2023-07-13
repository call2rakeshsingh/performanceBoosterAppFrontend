import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
    // responsive: true,
    maintainAspectRatio : false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      layout: {
        padding: 20
    },
      title: {
        display: true,
        text: 'Last 3 Months Performance',
        font: {
          size: 20,
        },
        padding: {
                    top: 10,
                    bottom: 20
                  }
      },
      tooltips: {
        callbacks: {
          label: function(context) {
            var label = context.dataset.label || '';
            var value = context.parsed || 0;
            var sum = context.dataset.data.reduce((a, b) => a + b, 0);
            var percentage = value > 0 ? Math.round((value / sum) * 100) : 0;
            return `  ${value} out of ${sum} (${percentage}%)   `;
          },
        },
        padding: 20,
      },
    },
    layout: {
        padding: 30
      }
  };

const BarChart = ({ tableData }) => {
  const label1 = tableData.length > 1 ? tableData[tableData.length - 2].monthName : 0;
  const label2 = tableData.length > 2 ? tableData[tableData.length - 3].monthName : 0;
  const label3 = tableData.length > 3 ? tableData[tableData.length - 4].monthName : 0;
  const doneOnTime1 = tableData.length > 1 ? tableData[tableData.length - 2].doneOnTime : 0;
  const doneOnTime2 = tableData.length > 2 ? tableData[tableData.length - 3].doneOnTime : 0;
  const doneOnTime3 = tableData.length > 3 ? tableData[tableData.length - 4].doneOnTime : 0;
  const doneWithTime1 = tableData.length > 1 ? tableData[tableData.length - 2].doneWithDelay : 0;
  const doneWithTime2 = tableData.length > 2 ? tableData[tableData.length - 3].doneWithDelay : 0;
  const doneWithTime3 = tableData.length > 3 ? tableData[tableData.length - 4].doneWithDelay : 0;
  const pending1 = tableData.length > 1 ? tableData[tableData.length - 2].pending : 0;
  const pending2 = tableData.length > 2 ? tableData[tableData.length - 3].pending : 0;
  const pending3 = tableData.length > 3 ? tableData[tableData.length - 4].pending : 0;

  const labels = [label1, label2, label3];
  const data = {
    labels,
    
    datasets: [
      {
        label: 'Done on time',
        data: [doneOnTime1, doneOnTime2, doneOnTime3],
        backgroundColor: 'green',
      },
      {
        label: 'Done with delay',
        data: [doneWithTime1, doneWithTime2, doneWithTime3],
        backgroundColor: 'orange',
      },
      {
        label: 'Pending',
        data: [pending1, pending2, pending3],
        backgroundColor: '#800000',
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} style={{boxSizing: 'border-box', height: 'inherit'}} />

    </>
    )
}

export default BarChart
// style={{width: "90%", height: "100%", margin: "auto"  }}