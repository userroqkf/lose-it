import { useRef, useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);


export default function WeightChart(props) {
  const { weightData, value, fixedData, setWeightData } = props;
  const chartRef = useRef();
  //Setting chart min and max value
  const [xAxis, setXAxis] = useState(() => getFirstLastDayOfMonth(value));
  
  function getFirstLastDayOfMonth(props) {
    const month = props;
    const FirstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDayOfMonth = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      0
    );
    // setXAxis([FirstDayOfMonth, lastDayOfMonth])
    return [FirstDayOfMonth, lastDayOfMonth];
  }

  useEffect(() => {
    const range = getFirstLastDayOfMonth(value);
    setXAxis(range);
  }, [value]);


// useEffect on xAxis, When Axis range changes, Filter weightInput to the Axis range
useEffect(() => {
  setWeightData((prev) =>
    fixedData.filter((data) => {
      return xAxis[0] <= data.x && data.x <= xAxis[1];
    })
  );
}, [xAxis, fixedData, weightData, setWeightData]);


  const chartData = {
    datasets: [
      {
        data: weightData,
        borderColor: "rgb(255, 99, 132)",
      },
    ],
  };


const options = {
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
        tooltipFormat: "MMM DD",
      },
      min: xAxis[0],
      nax: xAxis[1],
    },
  },
  // animation: false,
  // ticks: {
  //   autoSkip: false,
  // },
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  animation: false
};


  return (
    <Box position={"relative"} margin={"auto"} height={"50vh"} width={"80vw"}>
      <Line
        ref={chartRef}
        data={chartData}
        options={options}
      />
    </Box>
  );
}