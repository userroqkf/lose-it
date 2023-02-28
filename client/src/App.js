import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import "./App.css";

import WeightDisplay from "./components/WeightDisplay/WeightDisplay";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay";
import dayjs from "dayjs";
//Functions needed to created dummy data

const max = 90;
const min = 60;


const testingWeightValue = Array.from({ length: 100 }, () =>
Math.floor(Math.random() * (max - min) + min)
);
const addDays = function (days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(0, 0, 0);
  return date;
};

const values = testingWeightValue.map((int, index) => {
  return { x: addDays(index), y: int };
});

function App() {
  const drawerWidth = 240;
  const [showPage, setShowPage] = useState("DASHBOARD");
  
  const [fixedData, setFixedData] = useState(values);
  const [weightData, setWeightData] = useState(values);
  //Setting Calandar date
  const [value, setValue] = useState(new Date());
  const [datePicker, setDatePicker] = useState(dayjs(new Date()));

  // Monthly date
  const [dateSelected, setDateSelected] = useState(dayjs(new Date()));

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar 
        name={"John Kim"} 
        drawerWidth={drawerWidth} 
        setShowPage={setShowPage}
      />
      {showPage === "DASHBOARD" &&
        <Dashboard 
          drawerWidth={drawerWidth}
          value={value}
          weightData={weightData}
          setWeightData={setWeightData}
          fixedData={fixedData}
          datePicker={datePicker}
          setValue={setValue}
          setDatePicker={setDatePicker}
          dateSelected={dateSelected}
          setDateSelected={setDateSelected}
          setShowPage={setShowPage}
        />
      }
      {showPage === "WEIGHT" && 
        <WeightDisplay 
          drawerWidth={drawerWidth}
          fixedData={fixedData}
          setFixedData={setFixedData}
          weightData={weightData}
          setWeightData={setWeightData}
          value={value}
          setValue={setValue}
          dateSelected={dateSelected}
          setDateSelected={setDateSelected}
        />
      }
      {showPage === "FOOD" && 
        <FoodDisplay 
          drawerWidth={drawerWidth} 
          setWeightData={setWeightData}
          value={value}
          setValue={setValue}
          datePicker={datePicker}
          setDatePicker={setDatePicker}
        />
      }
    </Box>
  );
}

export default App;
