import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import "./App.css";

import WeightDisplay from "./components/WeightDisplay/WeightDisplay";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay";
import dayjs from "dayjs";
//Functions needed to created dummy data

function App() {
  const drawerWidth = 240;
  const [showPage, setShowPage] = useState("DASHBOARD");
  
  const [fixedData, setFixedData] = useState([]);
  const [weightData, setWeightData] = useState([]);

  //Setting Calandar date
  const [value, setValue] = useState(new Date());
  const [datePicker, setDatePicker] = useState(dayjs(new Date()));
  const [datePickerString, setDatePickerString] = useState(
    () => {
      const datePicked = datePicker['$d']
      const dateToString = `${datePicked.getFullYear()}-${datePicked.getMonth() + 1}-${datePicked.getDate()}`
    return dateToString}
    )

  // Monthly date
  const [dateSelected, setDateSelected] = useState(dayjs(new Date()));

  //MacroChart Data (update whenever fixedData changes)
  const [macroData, setMacroData] = useState({
    protein: 160,
    carb: 120,
    fat: 90,
    calories: 1800
  })

  const [fixedFoodData, setFixedFoodData] = useState({});
  const [foodMacro, setFoodMacro] = useState([])

  // macroData added dropdb
  const [foodMacroSum, setFoodMacroSum] = useState({carb: 0, protein: 0, fat: 0, calories:0})
  const [remainingMacro, setRemainingMacro] = useState([macroData, foodMacroSum]);

  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL

  //fetching food data for user
  useEffect(() => {
    fetch(`${apiServerUrl}/api/users/${1}/food`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setFixedFoodData(data);
      })
  }, [apiServerUrl])

  //fetching weight data for user
  useEffect(() => {
    fetch(`${apiServerUrl}/api/users/${1}/weight`)
      .then(res => res.json())
      .then(data => {
        console.log("data",data)
        const weights = data.map(row => ({
          x: new Date(row.x),
          y: row.y
        }));
        const sortedWeights = weights.sort((a, b) => {
          return new Date(b.x) - new Date(a.x);
        });
        setFixedData(sortedWeights)})
  }, [apiServerUrl]);

  useEffect(() => {
    const datePicked = datePicker['$d']
    const [day, month, year] = new Date(datePicked).toLocaleDateString().split("/");
    const dateToString = `${year}-${month}-${day}`
    setDatePickerString( dateToString)
  }, [datePicker])

  useEffect(() => {
    console.log("loop1");
    console.log("date picker string",datePickerString)
    if  ( fixedFoodData.hasOwnProperty(datePickerString) ) {
      setFoodMacro(fixedFoodData[datePickerString])
    } else {
      setFoodMacro([])
    }
  },[datePicker,fixedFoodData, datePickerString])

  useEffect(() => {
    console.log("loop2");
    if  ( Object.keys(foodMacro).length !== 0 ) {
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
    } else {
      setFoodMacroSum({carb: 0, protein: 0, fat: 0, calories:0})
    }
  }, [foodMacro])

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

          apiServerUrl={apiServerUrl}
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

          apiServerUrl={apiServerUrl}
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

          fixedFoodData={fixedFoodData}
          setFixedFoodData={setFixedFoodData}
          datePickerString={datePickerString}

          apiServerUrl={apiServerUrl}
        />
      }
    </Box>
  );
}

export default App;
