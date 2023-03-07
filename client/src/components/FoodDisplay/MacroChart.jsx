import { useEffect, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";

import {Box} from "@mui/material"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


export default function MacroChart(props) {

// how to clean props {protien , , , } 
// if that is the case have state for both remaining and consumed

  const { macroName, macroData, setMacroData, foodMacroSum, setFoodMacroSum, remainingMacro, setRemainingMacro} = props;
  const chartRef = useRef();
  const remaininngCalc = Math.round(remainingMacro[0][macroName] - remainingMacro[1][macroName])
  const remaining = isNaN(remaininngCalc) ? 0 : remaininngCalc 
  const chartData = [remaining, foodMacroSum[macroName]]
  // console.log(foodMacroSum)  
  const data = {
      labels: ['Remaining','Consumed'],
      datasets: [{
        data: chartData,
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
        ],
        hoverOffset: 4
      }]
    };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: macroName
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: true,
    cutout: "65%",
    remaining
  }
  // const test = "300kcal"
  const plugins = [{
    afterDraw: function(chart) {
    const width = chart.width,height = chart.height,ctx = chart.ctx;
    ctx.save();
    const fontSize = (height/350);
    ctx.font = `bold ${fontSize}em Helvetica Neue`;
    // ctx.textBaseline = "top";
    const text = `Remaining:`;
    const text2 = chart.config.options.remaining
    const text3 = `kcal`
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textX2 = Math.round((width - ctx.measureText(text2).width) / 2);
    const textX3 = Math.round((width - ctx.measureText(text3).width) / 2);
    const textY = height / 2;
    ctx.fillText(text, textX, textY);
    ctx.fillText(text2, textX2, textY + 20);
    ctx.fillText(text3, textX3, textY + 40);
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