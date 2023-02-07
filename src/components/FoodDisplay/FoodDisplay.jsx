import { useState, useRef, useEffect } from "react";
import "chartjs-adapter-moment";

import { Box, Toolbar, FormControl, InputLabel, Input, InputAdornment, TextField } from "@mui/material";

import MacroChart from "./MacroChart";
import DateSelector from "./DateSelector";
import FoodTable from "./FoodTable";

export default function FoodDisplay(props) {

  const { drawerWidth } = props;

  const [value, setValue] = useState(new Date());

  return(
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    > 
      <Toolbar/>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignContent={"center"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <DateSelector 
          value={value}
          setValue={setValue}
        />
        <Box
          display="flex"
        >
          {[0,0,0,0].map((value, index) => {
              return (
                  <MacroChart key={index} />
              )
          })}
        </Box>
        <TextField label={"Search Food"} fullWidth margin="dense" />
        <Box 
          position={"relative"} 
          // height temp
          height={"50vh"} 
          width={"80vw"} 
          margin={"auto"}>
          <FoodTable/>
        </Box>
      </Box>
    </Box>
  )
}