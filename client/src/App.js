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


const gridData = [
  {
    id : 1,
    brand: "no brand",
    food: "no food",
    carb: 30,
    protein: 20,
    fat: 12,
    calories: 200
  },
  {
    id : 2,
    brand: "no brand",
    food: "no food",
    carb: 10,
    protein:35,
    fat: 20,
    calories: 350
  },
  {
    id : 3,
    brand: "no brand",
    food: "no food",
    carb: 90,
    protein:50,
    fat: 18,
    calories: 800
  }
]

function App() {
  const drawerWidth = 240;
  const [showPage, setShowPage] = useState("FOOD");
  
  const [fixedData, setFixedData] = useState(values);
  const [weightData, setWeightData] = useState(values);
  //Setting Calandar date
  const [value, setValue] = useState(new Date());
  const [datePicker, setDatePicker] = useState(dayjs(new Date()));

  // Monthly date
  const [dateSelected, setDateSelected] = useState(dayjs(new Date()));

  //MacroChart Data (update whenever fixedData changes)
  const [macroData, setMacroData] = useState({
    protein: 160,
    carb: 120,
    fat: 90,
    calories: 1800
  })

  const [foodMacro, setFoodMacro] = useState(gridData)
  // macroData added 
  const [foodMacroSum, setFoodMacroSum] = useState({carb: 0, protein: 0, fat: 0, calories:0})
  const [remainingMacro, setRemainingMacro] = useState([macroData, foodMacroSum]);

  useEffect(() => {
    if  ( foodMacro.length !== 0 ) {
      const macroSum =  foodMacro.reduce((acc, curr) => (
                                        {
                                          carb: acc.carb + curr.carb, 
                                          protein: acc.protein + curr.protein, 
                                          fat: acc.fat + curr.fat, 
                                          calories: acc.calories + curr.calories
                                        }
                                      )
      )
      setFoodMacroSum(macroSum);
      console.log("remaining macro","macroData",remainingMacro[0], "macrosum",remainingMacro[1]);
    } else {
      setFoodMacroSum({carb: 0, protein: 0, fat: 0, calories:0})
    }
  }, [foodMacro, macroData])

  useEffect(() => {
    setRemainingMacro([macroData, foodMacroSum])
  }, [macroData, foodMacroSum])


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

          macroData={macroData}
          setMacroData={setMacroData}

          foodMacroSum={foodMacroSum}
          foodMacro={foodMacro}
          setFoodMacro={setFoodMacro}
          setFoodMacroSum={setFoodMacroSum}

          remainingMacro={remainingMacro}
          setRemainingMacro={setRemainingMacro}
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

          macroData={macroData}
          setMacroData={setMacroData}

          foodMacroSum={foodMacroSum}
          foodMacro={foodMacro}
          setFoodMacro={setFoodMacro}
          setFoodMacroSum={setFoodMacroSum}

          remainingMacro={remainingMacro}
          setRemainingMacro={setRemainingMacro}
        />
      }
    </Box>
  );
}

export default App;
