import { useRef } from "react";
import { Doughnut } from "react-chartjs-2";

import {Box} from "@mui/material"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


export default function MacroChart() {

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
    responsive: true,
    maintainAspectRatio: true,
  }

  return (
    <Box
    // key={index}
    flex={{ xs: "0 0 100%", md: "0 0 50%" }}
    flexBasis={{ lg: "0" }}
    flexGrow={{ lg: "1" }}
    maxWidth={{ xs: "100%", md: "50%", lg: "100%" }}
    boxSizing="border-box"
    // position={"relative"} margin={"auto"}
    >
      <Doughnut 
        ref={chartRef}
        data={data}
        options={options}
      />
    </Box>
  )
}