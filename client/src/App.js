import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";

import WeightDisplay from "./components/WeightDisplay/WeightDisplay";
import Dashboard from "./components/Dashboard";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay";
import { StartPage } from "./components/StartPage";
import { PageLoader } from "./components/PageLoader";
import dayjs from "dayjs";


function App() {
  
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
  console.log("api url", apiServerUrl);
  const { getAccessTokenSilently, isLoading, isAuthenticated, user} = useAuth0();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!isLoading) setUserData(user)
  }, [isLoading,user])

  useEffect(() => {
    const getFoodData = async () => {
      const accessToken = await getAccessTokenSilently();
      console.log("access tokeb", accessToken);
      fetch(`${apiServerUrl}/api/users/${userData.sub}/food`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${accessToken}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setFixedFoodData(data);
        })
    }
    // if (!isLoading) getFoodData()

    // fetch(`${apiServerUrl}/api/users/${1}/food`)
    // .then(res => res.json())
    // .then(data => {
    // setFixedFoodData(data);
    // })
    getFoodData()
  }, [apiServerUrl, getAccessTokenSilently, isLoading, userData])

  //fetching weight data for user
  useEffect(() => {
    const getWeightData = async () => {
      const accessToken = await getAccessTokenSilently();
      console.log(accessToken);
      fetch(`${apiServerUrl}/api/users/${userData.sub}/weight`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${accessToken}`,
        },
      })
      .then(res => res.json())
      .then(data => {
        const weights = data.map(row => ({
          x: new Date(row.x),
          y: row.y
        }));
        const sortedWeights = weights.sort((a, b) => {
          return new Date(b.x) - new Date(a.x);
        });
        setFixedData(sortedWeights)})
    }
    getWeightData();

    // fetch(`${apiServerUrl}/api/users/${1}/weight`)
    // .then(res => res.json())
    // .then(data => {
    // const weights = data.map(row => ({
    // x: new Date(row.x),
    // y: row.y
    // }));
    // const sortedWeights = weights.sort((a, b) => {
    // return new Date(b.x) - new Date(a.x);
    // });
    // setFixedData(sortedWeights)})

  }, [apiServerUrl, getAccessTokenSilently, userData, isLoading]);

  useEffect(() => {
    const datePicked = datePicker['$d']
    const [day, month, year] = new Date(datePicked).toLocaleDateString().split("/");
    const dateToString = `${year}-${month}-${day}`
    setDatePickerString( dateToString)
  }, [datePicker])

  useEffect(() => {
    if  ( fixedFoodData.hasOwnProperty(datePickerString) ) {
      setFoodMacro(fixedFoodData[datePickerString])
    } else {
      setFoodMacro([])
    }
  },[datePicker,fixedFoodData, datePickerString])

  useEffect(() => {
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

  const drawerWidth = 240;

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }


  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" />:<StartPage/>}/>
      <Route path="/*" element={isAuthenticated ? <Navigate to="/dashboard" />: <Navigate to="/" />}/>
      <Route path="/dashboard" element={
        <Dashboard
          value={value}
          drawerWidth={drawerWidth}
          weightData={weightData}
          setWeightData={setWeightData}
          fixedData={fixedData}
          datePicker={datePicker}
          setDatePicker={setDatePicker}
          setValue={setValue}
          dateSelected={dateSelected}
          setDateSelected={setDateSelected}
          foodMacroSum={foodMacroSum}
          remainingMacro={remainingMacro}
        />
      }
      />
      <Route path="/weight" element={
        <WeightDisplay 
          value={value}
          setValue={setValue}
          weightData={weightData}
          setWeightData={setWeightData}
          fixedData={fixedData}
          setFixedData={setFixedData}
          dateSelected={dateSelected}
          setDateSelected={setDateSelected}
          user={userData}
          apiServerUrl={apiServerUrl}
      />
    } />
      <Route path="/food" element={
        <FoodDisplay 
          drawerWidth={drawerWidth} 
          datePicker={datePicker} 
          setDatePicker={setDatePicker}
          foodMacroSum={foodMacroSum} 
          foodMacro={foodMacro} 
          setFoodMacro={setFoodMacro} 
          remainingMacro={remainingMacro}
          setFixedFoodData={setFixedFoodData} 
          fixedFoodData={fixedFoodData} 
          datePickerString={datePickerString}
          apiServerUrl={apiServerUrl}
          user={userData}
      />
        } />
    </Routes>
  );
}

export default App;
