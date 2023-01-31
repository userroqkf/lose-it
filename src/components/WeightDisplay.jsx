import React, {useState, useRef} from "react";
import { TextField, InputAdornment, Box, Toolbar, Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import {
  Chart as ChartJS,
  // CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import { Chart } from "react-chartjs-2";
import "chart.js/auto";

import { Line, getDatasetAtEvent } from 'react-chartjs-2'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'chartjs-adapter-moment';
import { CommentsDisabledOutlined } from "@mui/icons-material";

ChartJS.register(
  // CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function WeightDisplay() {

  const values = [
    {
      x: new Date("2020-01-01"),
      y: 100
    },
    {
      x: new Date("2020-01-02"),
      y: 102
    },
    {
      x: new Date("2020-01-03"),
      y: 105
    },
    {
      x: new Date("2020-01-11"),
      y: 104
    }
  ];

  const [weightInput, setWeightInput] = useState("")
  const [weightData, setWeightData] = useState(values)
  // const [weightLabel, setWeightLabel] = useState(['2016-12-25', '2016-12-26', '2016-12-27'])

  const [value, setValue] = useState(new Date());

  const chartRef = useRef();


  const addData = (data) => {
    // setWeightLabel(prev => [...prev, "Oct"])
    setWeightData(prev =>[...prev, {x:new Date(), y:data}]) 
    setWeightInput("")
    console.log(weightData)
  }

  const options = {
    scales:{
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  const data = {
    // labels: weightLabel,
    datasets: [
      {
        data: weightData,
        borderColor: 'rgb(255, 99, 132)',
      }
    ],
  }

  const columns = [
    { field: 'date', 
      headerName: 'Date',
      flex: 1,
    },
    { field: 'weight', 
      headerName: 'Weight',
      editable: true,
      flex: 1,
    }
  ];
  
  const rows = 
    weightData.map((data, index) => {
      return ({id: index , date: data.x.toLocaleDateString(), weight: data.y})
    })
  ;
  

  return (
    <Box
      component="main"
      width={"100%"}
    >
      <Toolbar />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            views={['year', 'month']}
            label="Year and Month"
            minDate={new Date('2012-03-01')}
            maxDate={new Date('2023-06-01')}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
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
        height={"50vh"}
        width={"80vw"}
      >
        <Line
          ref={chartRef}
          // datasetIdKey='id'
          data={data}
          options={options}
          />
      </Box>
      <Box
        position={"relative"}
        height={'50%'}
        width={"80vw"}
        margin={"auto"}
      >

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Box>
  )
}