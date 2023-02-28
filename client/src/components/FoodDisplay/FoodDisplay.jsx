import { useState, useRef, useEffect } from "react";
import "chartjs-adapter-moment";

import { Box, Toolbar, FormControl, InputLabel, Input, InputAdornment, TextField } from "@mui/material";

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

function fetchFoodData (query) {
  //not good practice to store api key
  // const API_KEY = fetch("/api_key").then(res => console.log(res.body));
  return fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${query}`)
    .then(res =>{
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong');
    })
    .then(res => res.foods)
    .catch(error => console.log(error));
}

export default function FoodDisplay(props) {

  const { drawerWidth, value, setValue, datePicker, setDatePicker } = props;

  const [ queryFood, setQueryFood ] = useState("");
  const [queryFoodData, setQueryFoodData] = useState({})
  const [showQueryData, setShowQueryData] = useState(false);
  const debounceQuery = useDebounceValue(queryFood);
  //fetching data from server
  useEffect(() => {
    let ignore = false;
    (async () => {
      if (debounceQuery.length > 0) {
        console.log(debounceQuery)
        const data = await fetchFoodData(debounceQuery);
        if (!ignore) {
          console.log("data fetched",data);
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
          {[0,0,0,0].map((value, index) => {
              return (
                  <MacroChart key={index} />
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
          {showQueryData ? <QueryTable queryFoodData={showQueryData ? queryFoodData : {}}/> : <FoodTable/>}
        </Box>
      </Box>
    </Box>
  )
}