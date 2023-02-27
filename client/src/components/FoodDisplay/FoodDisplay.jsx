import { useState, useRef, useEffect } from "react";
import "chartjs-adapter-moment";

import { Box, Toolbar, FormControl, InputLabel, Input, InputAdornment, TextField } from "@mui/material";

import MacroChart from "./MacroChart";
import DateSelector from "./DateSelector";
import FoodTable from "./FoodTable";

export default function FoodDisplay(props) {

  const { drawerWidth, value, setValue, datePicker, setDatePicker } = props;

  // const [value, setValue] = useState(new Date());

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
            label={"Add Food"} 
            fullWidth
            margin="dense" 
          />
        </Box>
        <Box 
          // position={"relative"} 
          // height temp
          height={"50vh"} 
          width={"100%"} 
          margin={"auto"}>
          <FoodTable/>
        </Box>
      </Box>
    </Box>
  )
}