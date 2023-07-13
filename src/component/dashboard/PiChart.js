import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PiChart({tableData}) {
    const doneOnTime1 = tableData.length > 0 ? tableData[tableData.length-1].doneOnTime : 0
    const doneWithTime1 = tableData.length > 0 ? tableData[tableData.length-1].doneWithDelay : 0
    const pending1 = tableData.length > 0 ? tableData[tableData.length-1].pending : 0
    const data = {
    
        labels: ['Done on time', 'Done with delay', 'Pending',],
        datasets: [
          {
            label: 'Tasks',
            data: [doneOnTime1, doneWithTime1, pending1],
            backgroundColor: ["green", 'orange', '#800000'],
            borderColor: [
                'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      const options = {
        // responsive: true,
        maintainAspectRatio : false,
        plugins: {
        legend: {
                position: 'bottom',
                labels: {
                    padding: 40 // set the padding between legend and chart
                  }
              },
              title: {
                display: true,
                text: 'Current Month Performence',
                font: {
                    size: 20
                },
                padding: {
                    top: 10,
                    bottom: 20
                  }
              },
          tooltip: {
            callbacks: {
              label: function(context) {
                var label = context.label || '';
                var value = context.parsed || 0;
                var sum = context.dataset.data.reduce((a, b) => a + b, 0);
                var percentage = value > 0 ? Math.round((value / sum) * 100) : 0;
                
                return `  ${value} out of ${sum} overall ${percentage}%    `;
              },
            },
            padding:15,
          },
        },
        layout: {
            padding: 30
          }
      };

  return (
      <Pie data={data} options={options} style={{boxSizing: 'content-box', height: 'inherit'}}/>
  );
}

// style={{width: "90%", height: "90%", margin: "auto"}}
