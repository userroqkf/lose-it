import React, {useState, useRef, useEffect} from "react";
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

  // const addDays = function(days) {
  //   var date = new Date();
  //   date.setDate(date.getDate() + days);
  //   return date;
  // }


  // const values = new Array(100).fill(0).map(
  //   (int, index) => {
  //     return {x: addDays(index), y: int}
  //   }
  // )

  // const [weightInput, setWeightInput] = useState("")
  // const [weightData, setWeightData] = useState(values)
  // // const [weightLabel, setWeightLabel] = useState(['2016-12-25', '2016-12-26', '2016-12-27'])


  // function getFirstLastDayOfMonth(props) {
  //   const month = props
  //   const FirstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  //   const lastDayOfMonth = new Date(month.getFullYear(), month.getMonth()+1, 0);
  //   setXAxis([FirstDayOfMonth, lastDayOfMonth])
  // }

  // //Setting Calandar date
  // const [value, setValue] = useState(new Date());

  // //Setting chart min and max value
  // const [xAxis, setXAxis] = useState(() => {
  //   console.log("xAxis value", value)
  //   return [new Date(value.getFullYear(), value.getMonth(), 1), new Date(value.getFullYear(), value.getMonth()+1, 0)]
  // }
  // )



  const addDays = function(days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }


  const values = new Array(100).fill(0).map(
    (int, index) => {
      return {x: addDays(index), y: int}
    }
  )


  const [fixedData, setFixedData] = useState(values);
  
  //Need to filter data to match the Date value, for both the <Line> and <DataGrid>

  const [weightInput, setWeightInput] = useState("")
  const [weightData, setWeightData] = useState(values)
  // const [weightLabel, setWeightLabel] = useState(['2016-12-25', '2016-12-26', '2016-12-27'])
  
    //Setting Calandar date
    const [value, setValue] = useState(new Date());
  
  //Setting chart min and max value
  const [xAxis, setXAxis] = useState(() => getFirstLastDayOfMonth(value))

  // GridData Data
  //Need to fix initial value for gridData
  const [gridData, setGridData] = useState( weightData.map((data, index) => {
    return ({id: index , date: data.x.toLocaleDateString(), weight: data.y})
  }))
  
  function getFirstLastDayOfMonth(props) {
    const month = props
    const FirstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDayOfMonth = new Date(month.getFullYear(), month.getMonth()+1, 0);
    // setXAxis([FirstDayOfMonth, lastDayOfMonth])
    return [FirstDayOfMonth, lastDayOfMonth]
  }
  
  
  useEffect(() => {
    const range= getFirstLastDayOfMonth(value)
    setXAxis(range)
    
  },[value])
  
  // useEffect on xAxis, When Axis range changes, Filter weightInput to the Axis range
  useEffect(() => {
    // console.log("Outside SetweightData", weightData)
    // const filteredData = weightData.filter(data => xAxis[0]<=data.x<=xAxis[1])
    setWeightData(prev =>
      fixedData.filter(data => {
        console.log("useEffect weightData bool", xAxis[0]<=data.x && data.x<=xAxis[1])
        return xAxis[0]<=data.x && data.x<=xAxis[1]
      }))
    
    // console.log("after setWeight", weightData)
    }, [xAxis, fixedData])

    useEffect(() => {
      // console.log("useeffect girdData",gridData)
      setGridData(prev => 
        weightData.map((data, index) => {
          return ({id: index , date: data.x.toLocaleDateString(), weight: data.y})
        })
        )
    }, [weightData])

    const chartRef = useRef();
    
    //Check MUI Material-UI DatePicker formatting and setting default value issue
    // https://stackoverflow.com/questions/69725215/mui-material-ui-datepicker-formatting-and-setting-default-value-issue 
    console.log(xAxis);
    
    const addData = (data) => {
      // setWeightLabel(prev => [...prev, "Oct"])
      setWeightData(prev =>[...prev, {x:new Date(), y:data}]) 
      setFixedData(prev =>[...prev, {x:new Date(), y:data}]) 
      setWeightInput("")
  }

  const options = {
    scales:{
      x: {
        type: 'time',
        time: {
          unit: 'day'
        },
        min: xAxis[0],
        nax: xAxis[1]
      }
    },
    ticks: {
      autoSkip: false,
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
  
  // const rows = 
  //   weightData.map((data, index) => {
  //     return ({id: index , date: data.x.toLocaleDateString(), weight: data.y})
  //   })
  // ;
  
    // console.log("rows weight data show ",rows);

  return (
    <Box
      component="main"
      width={"100%"}
    >
      <Toolbar />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            openTo="month"
            views={['year', 'month']}
            label="Year and Month"
            minDate={new Date('2012-03-01')}
            maxDate={new Date('2023-06-01')}
            value={value}
            onChange={(newValue) => {
              console.log("show new value", newValue["$d"])
              setValue(newValue["$d"]);
              // setXAxis(getFirstLastDayOfMonth(value))
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
          rows={gridData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          sx={{
            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
              display: "none"
            },
            "& .MuiDataGrid-cellCheckbox": {
              visibility: "hidden"
            }
          }}
        />
      </Box>
    </Box>
  )
}

// header:
// MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root

// row:
// MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root


