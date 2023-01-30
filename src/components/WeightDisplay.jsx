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
} from 'chart.js';

import { Line, getDatasetAtEvent } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function WeightDisplay() {
  const [weightInput, setWeightInput] = useState("")
  const [weightData, setWeightData] = useState([3,4,5])
  const [weightLabel, setWeightLabel] = useState(['Jun', 'Jul', 'Aug'])
  const chartRef = useRef();


  const addData = (data) => {
    setWeightLabel(prev => [...prev, "Oct"])
    setWeightData(prev =>[...prev, data]) 
    setWeightInput("")
  }
  return (
    <Box
      component="main"
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
      <Line
        ref={chartRef}
        datasetIdKey='id'
        data={{
          labels: weightLabel,
          datasets: [
            {
              id: 1,
              label: '',
              data: weightData,
            }
          ],
        }}
      />
    </Box>
  )
}