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
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutout: "65%"
  }

  const test = "300kcal"
  const plugins = [{
    afterDraw: function(chart) {
    const width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
        ctx.save();
        const fontSize = (height/350);
        ctx.font = `bold ${fontSize}em Helvetica Neue`;
        // ctx.textBaseline = "top";
        const text = `Remaining:`;
        const text2 = ` ${test}`
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.fillText(text2, textX, textY + 20);
        ctx.restore();
    } 
  }]

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
        plugins={plugins}
      />
    </Box>
  )
}