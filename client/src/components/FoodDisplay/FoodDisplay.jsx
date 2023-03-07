import { useState, useRef, useEffect } from "react";
import "chartjs-adapter-moment";

import { Box, Toolbar, FormControl, InputLabel, Input, InputAdornment, TextField, Snackbar } from "@mui/material";

import MacroChart from "./MacroChart";
import DateSelector from "./DateSelector";
import FoodTable from "./FoodTable";
import QueryTable from "./QueryTable";


// const searchFoodData = (food) => {
//   fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=${food}`)
//   .then(res => res.json())
//   .then(res => console.log(res.foods))
// }
function useDebounceValue(value, time=1000) {
  const [debounceValue, setDebounceValue] = useState(value);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time)

    return () => {
      clearTimeout(timeout);
    }
  }, [value, time]);

  return debounceValue;
} 

export default function FoodDisplay(props) {

  const { drawerWidth, value, setValue, datePicker, setDatePicker, macroData, setMacroData, foodMacroSum, foodMacro, setFoodMacro, setFoodMacroSu, remainingMacro, setRemainingMacro, setFoodMacroSum } = props;

  const [ queryFood, setQueryFood ] = useState("");
  const [queryFoodData, setQueryFoodData] = useState({})
  const [showQueryData, setShowQueryData] = useState(false);

  //alert (snackbar) to show that user has either deleted or added new item
  const [showAlert, setShowAlert] = useState({message:"", open: false});

  //later want to get data from db and pass as props
  // const [tempTestingData, setTempTestingData] = useState(gridData)

  // const [queryData, setQueryData] = useState({})
  const debounceQuery = useDebounceValue(queryFood);

  function fetchFoodData (query) {
    return fetch(`http://localhost:8000/api_key?food=${query}`)
    .then(res => res.json())
    .then(data => data.foods)
  }

  //fetching data from server
  useEffect(() => {
    let ignore = false;
    (async () => {
      if (debounceQuery.length > 0) {
        const data = await fetchFoodData(debounceQuery);
        console.log(data)
        if (!ignore) {
          console.log(data);
          setQueryFoodData(data);
          setShowQueryData(true);
        }
      }
    })();
    return () => {
      ignore= true;
      setShowQueryData(false);
    }
  }, [debounceQuery])


  //handle open and close for alerts
  const handleClose = () => {
    setShowAlert({ ...showAlert, open: false });
  };


  return(
    <Box
      component="main"
      // display={"flex"}
      // flexDirection={"column"}
      // alignContent={"center"}
      // justifyContent={"center"}
      // alignItems={"center"}
      height={"100%"}
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    > 
      <Toolbar/>

      <Snackbar
        anchorOrigin={{vertical:"bottom", horizontal: "left"}}
        open={showAlert.open}
        onClose={handleClose}
        autoHideDuration={500}
        message={showAlert.message}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignContent={"center"}
        // justifyContent={"center"}
        // alignItems={"center"}
      >
        <DateSelector 
          value={value}
          setValue={setValue}
          datePicker={datePicker}
          setDatePicker={setDatePicker}
        />
        <Box
          display="flex"
          // flexWrap={"wrap"}
          // flex="1 1 auto"
          flexDirection={{xs:"column", sm:"row"}}
          alignContent={"center"}
          justifyContent={{xs:"center",sm:"space-around"}}
          alignItems={"center"}
          boxSizing="border-box"
          width={"100%"}
          overflow={"hidden"}
          // flex={"0 0 1"}
          // minWidth={"0"}
          // height={`calc((100% - ${drawerWidth}px)/2)`}
          // width={`calc(100% - ${drawerWidth}px)`}
          // padding-top={"100%"}
        >
          {["Protein", "Fat", "Carb", "Calories"].map((value, index) => {
              return (
                  <MacroChart 
                    key={index} 
                    macroName={value.toLowerCase()} 
                    macroData={macroData} 
                    setMacroData={setMacroData} 
                    foodMacroSum={foodMacroSum} 
                    remainingMacro={remainingMacro}  
                  />
              )
          })}
        </Box>
        <Box
          width={"100%"} 
        >
          <TextField 
            label={queryFood === "" ? "Search Food" : "Press Enter To Search"} 
            fullWidth
            margin="dense"
            value={queryFood}
            onChange={(e) => {
              e.preventDefault();
              setQueryFood(e.target.value)
            }}
          />
        </Box>
        <Box 
          // position={"relative"} 
          // height temp
          height={"50vh"} 
          width={"100%"} 
          margin={"auto"}
        >
          {showQueryData ? 
            <QueryTable 
            queryFoodData={showQueryData ? queryFoodData : {}}
            tempTestingData={foodMacro}
            setFoodMacro={setFoodMacro}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            setFoodMacroSum={setFoodMacroSum}
            foodMacro={foodMacro}
            /> : 
            <FoodTable
              tempTestingData={foodMacro}
              setFoodMacro={setFoodMacro}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
              foodMacroSum={foodMacroSum}
              setFoodMacroSum={setFoodMacroSum}
              foodMacro={foodMacro}
            />
          }
        </Box>
      </Box>
    </Box>
  )
}