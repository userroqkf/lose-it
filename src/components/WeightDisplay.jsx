import { useState, useRef, useEffect } from "react";
import "chartjs-adapter-moment";

import DeleteCheckBox from "./DeleteCheckBox";

import { DataGrid } from "@mui/x-data-grid";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Line } from "react-chartjs-2";

import {
  TextField,
  InputAdornment,
  Box,
  Toolbar,
  Button,
  IconButton,
} from "@mui/material";


import {
  Chart as ChartJS,
  // CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import dayjs from "dayjs";

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
  const addDays = function (days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  const max = 90;
  const min = 60;

  const testingWeightValue = Array.from({ length: 100 }, () =>
    Math.floor(Math.random() * (max - min) + min)
  );
  const values = testingWeightValue.map((int, index) => {
    return { x: addDays(index), y: int };
  });

  const [fixedData, setFixedData] = useState(values);

  //Need to filter data to match the Date value, for both the <Line> and <DataGrid>

  const [weightInput, setWeightInput] = useState("");
  const [weightData, setWeightData] = useState(values);
  // const [weightLabel, setWeightLabel] = useState(['2016-12-25', '2016-12-26', '2016-12-27'])

  //Setting Calandar date
  const [value, setValue] = useState(new Date());

  const [dateSelected, setDateSelected] = useState(dayjs(new Date()));

  //Setting chart min and max value
  const [xAxis, setXAxis] = useState(() => getFirstLastDayOfMonth(value));

  // new weight input date
  const [weightInputDate, setWeightInputDate] = useState(new Date());

  // GridData Data
  //Need to fix initial value for gridData
  const [gridData, setGridData] = useState(
    weightData.map((data, index) => {
      return { id: index, date: data.x.toLocaleDateString(), weight: data.y };
    })
  );

  // Keep track of data grid row selection
  const [selectionModel, setSelectionModel] = useState([]);

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

  function getRowById(rowId) {
    return gridData.filter((data) => data.id === rowId);
  }

  // When Delete Icon is pressed in DataGrid, filter data from fixed Data => trigger rerender for chart as well
  function deleteData(rowId) {
    const rowData = getRowById(rowId);
    const [day, month, year] = rowData[0].date.split("/");
    const rowDataDate = new Date(year, month - 1, day);
    setFixedData((prev) => {
      return prev.filter((data) => {
        return data.x.toDateString() !== rowDataDate.toDateString();
      });
    });
    setSelectionModel([]);
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

    // console.log("after setWeight", weightData)
  }, [xAxis, fixedData, weightData]);

  useEffect(() => {
    // console.log("useeffect girdData",gridData)
    setGridData(() =>
      weightData.map((data, index) => {
        return { id: index, date: data.x.toLocaleDateString(), weight: data.y };
      })
    );
  }, [weightData]);

  useEffect(() => {
    setValue(dateSelected["$d"])
  }, [dateSelected])

  const chartRef = useRef();

  const addData = (data) => {
    const [day, month, year] = weightInputDate.toLocaleDateString().split("/");
    const selectedInputDate = new Date(year, month - 1, day);
    setWeightData((prev) =>
      [...prev, { x: selectedInputDate, y: data }].sort((a, b) => {
        return new Date(b.x) - new Date(a.x);
      })
    );
    setFixedData((prev) =>
      [...prev, { x: selectedInputDate, y: data }].sort((a, b) => {
        return new Date(b.x) - new Date(a.x);
      })
    );
    setWeightInput("");
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
    ticks: {
      autoSkip: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const chartData = {
    datasets: [
      {
        data: weightData,
        borderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "weight", headerName: "Weight", editable: true, flex: 1 },
  ];

  const changeDate = (e) => {
    if (e.target.id === "add") {
      setDateSelected((date) => {
        console.log(date)
        const updatedDate = date.add(1, "month")
        // setValue(updatedDate["$d"])
        return updatedDate;
      });
    } else if (e.target.id === "sub") {
      setDateSelected((date) => {
        console.log(date);
        const updatedDate =  date.add(-1, "month")
        // setValue(updatedDate["$d"])
        return updatedDate;
      });
    }
  };

  return (
    <Box component="main" width={"100%"}>
      <Toolbar />
      <Box
        display={"flex"}
        flexDirection={"columns"}
        alignContent={"center"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <IconButton>
          <NavigateBeforeIcon
            id="sub"
            onClick={(e) => {
              changeDate(e)
            }}
          />
        </IconButton>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            openTo="month"
            views={["year", "month"]}
            label="Year and Month"
            minDate={new Date("2012-03-01")}
            maxDate={new Date()}
            value={dateSelected}
            selected={dateSelected}
            onChange={(newValue) => {
              // setValue(newValue["$d"]);
              console.log("new value on change", newValue)
              setDateSelected(newValue)
              // setValue(newValue["$d"])
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <IconButton>
          <NavigateNextIcon 
            id="add"
            onClick={(e) => {
              changeDate(e)
            }}
          />
        </IconButton>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"columns"}
        alignContent={"center"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            openTo="day"
            views={["year", "month", "day"]}
            label="Date"
            value={weightInputDate}
            onChange={(newValue) => {
              console.log(newValue);
              setWeightInputDate(newValue["$d"]);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <TextField
          label="Weight"
          id="outlined-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">kg</InputAdornment>
            ),
          }}
          value={weightInput}
          onChange={(e) => {
            e.preventDefault();
            setWeightInput(e.target.value);
          }}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            if (Number(weightInput)) {
              addData(Number(weightInput));
            }
          }}
        >
          Add Weight
        </Button>
      </Box>
      <Box position={"relative"} margin={"auto"} height={"50vh"} width={"80vw"}>
        <Line
          ref={chartRef}
          data={chartData}
          options={options}
        />
      </Box>
      <Box position={"relative"} height={"50%"} width={"80vw"} margin={"auto"}>
        <DataGrid
          rows={gridData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          experimentalFeatures={{ newEditingApi: true }}
          components={{
            BaseCheckbox: DeleteCheckBox,
          }}
          onSelectionModelChange={(data) => {
            console.log("selected row id", data);
            deleteData(data[0]);
          }}
          selectionModel={selectionModel}
          sx={{
            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
              {
                display: "none",
              },
          }}
        />
      </Box>
    </Box>
  );
}
