import React, {useState, useRef} from "react";
import { TextField, InputAdornment, Box, Toolbar, Button } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';

import { Line, getDatasetAtEvent } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function WeightDisplay() {
  const [weightInput, setWeightInput] = useState("")
  const [weightData, setWeightData] = useState([{x: '2016-12-25', y: 20}, {x: '2016-12-26', y: 10}])
  const [weightLabel, setWeightLabel] = useState(['Jun', 'Jul', 'Aug'])
  const chartRef = useRef();


  const addData = (data) => {
    setWeightLabel(prev => [...prev, "Oct"])
    setWeightData(prev =>[...prev, {x:'2016-01-12', y:data}]) 
    setWeightInput("")
  }
  return (
    <Box
      component="main"
      width={"100%"}
    >
      <Toolbar />
      <TextField
        label="Weight"
        id="outlined-start-adornment"
        sx={{ m: 1, width: '25ch' }}
        InputProps={{
          startAdornment: <InputAdornment position="start">kg</InputAdornment>,
        }}
        value={weightInput}
        onChange={e => {
          e.preventDefault()
          setWeightInput(e.target.value)
          }
        }
      />
      <Button
        type="submit"
        variant="contained" 
        onClick={(e) => {
          e.preventDefault();
          if (Number(weightInput)){
            addData(Number(weightInput))
          };
        }
      }
      >
        Add Weight
      </Button>
      <Box
        position={"relative"}
        margin={"auto"}
        height={"80vh"}
        width={"80vw"}
      >
      <Line
        ref={chartRef}
        datasetIdKey='id'
        data={{
          // labels: weightLabel,
          datasets: [
            {
              id: 1,
              label: '',
              data: weightData,
              borderColor: 'rgb(255, 99, 132)',
            }
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
        />
        </Box>
    </Box>
  )
}