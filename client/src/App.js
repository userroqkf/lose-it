import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";

import WeightDisplay from "./components/WeightDisplay/WeightDisplay";
import Dashboard from "./components/Dashboard";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay";


// import { StartPage } from "./components/StartPage";
import HomePage from "./components/HomePage/HomePage";

import { PageLoader } from "./components/PageLoader";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import MacroPage from "./components/MacroPage/MacroPage";


function App() {
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL
  const { getAccessTokenSilently, isLoading, isAuthenticated, user} = useAuth0();
  
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
    protein: 150,
    carb: 320,
    fat: 70,
    calories: 2425
  })

  const [fixedFoodData, setFixedFoodData] = useState({});
  const [foodMacro, setFoodMacro] = useState([])

  // macroData added dropdb
  const [foodMacroSum, setFoodMacroSum] = useState({carb: 0, protein: 0, fat: 0, calories:0})
  const [remainingMacro, setRemainingMacro] = useState([macroData, foodMacroSum]);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setUserData({...user, sub: user.sub.split('|')[1]})
    }
  }, [isLoading,user, isAuthenticated])

  useEffect(() => {
    const getFoodData = async () => {
      const accessToken = await getAccessTokenSilently()
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
    if (Object.keys(userData).length !== 0) {
      getFoodData();  
    }
  }, [apiServerUrl, getAccessTokenSilently, isLoading, userData])

  //fetching weight data for user
  useEffect(() => {
    const getWeightData = async () => {
      const accessToken = await getAccessTokenSilently()
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
    if (Object.keys(userData).length !== 0) {
      getWeightData();  
    }

  }, [apiServerUrl, getAccessTokenSilently, userData]);

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

  useEffect(() => {
    const getMacroData = async() => {
      const accessToken = await getAccessTokenSilently()
      fetch(`${apiServerUrl}/api/users/${userData.sub}/macro`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${accessToken}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.length) {
            setMacroData(data[0])
          }
        })
    }
    if (Object.keys(userData).length !== 0) {
      getMacroData();  
    }
  }, [apiServerUrl, userData, getAccessTokenSilently])


  const drawerWidth = 240;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <PageLoader />
      </Box>
    );
  }


  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" />:<HomePage/>}/>
      <Route path="/*" element={isAuthenticated ? <Navigate to="/dashboard" />: <Navigate to="/" />}/>
      <Route path="/macro" element={
        <MacroPage 
          macroData={macroData} 
          setMacroData={setMacroData}
          apiServerUrl={apiServerUrl}
          getAccessTokenSilently={getAccessTokenSilently}
          user={userData}

        />
      }/>
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
          getAccessTokenSilently={getAccessTokenSilently}
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
          getAccessTokenSilently={getAccessTokenSilently}
      />
        } />
    </Routes>
  );
}

export default App;
