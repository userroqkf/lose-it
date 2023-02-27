import { useRef } from "react";
import { Doughnut } from "react-chartjs-2";

import {Box} from "@mui/material"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


export default function MacroChart(props) {
  const chartRef = useRef();

  const dummyData = [700, 300]
  const data = {
      labels: ['Consumed', 'Remaining'],
      datasets: [{
        data: dummyData,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 4
      }]
    };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "testing"
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutout: "60%"
  }

  return (
    <Box
    width={{xs: "100%", sm:"calc(100%/5)"}}
    minHeight={"20em"}
    >
      <Doughnut 
        ref={chartRef}
        data={data}
        options={options}
        height={"100%"}
      />
    </Box>
  )
}