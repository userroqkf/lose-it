import { useState } from "react";
import "chartjs-adapter-moment";

import WeightMonthSelector from "./WeightMonthSelector";
import AddWeight from "./AddWeight";

import { Box, Toolbar } from "@mui/material";
import WeightTable from "./WeightTable";
import WeightChart from "./WeightChart";

export default function WeightDisplay(props) {
    const {value, setValue, weightData, setWeightData, fixedData, 
      setFixedData, dateSelected, setDateSelected, apiServerUrl} = props;

    return (
    <Box 
      component="main" 
      width={"100%"}
      paddingTop={"1em"}
    >
      <Toolbar/>
      <WeightMonthSelector 
        setValue={setValue}
        setWeightData={setWeightData}
        fixedData={fixedData}
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
      />
      <AddWeight 
        setWeightData={setWeightData} 
        setFixedData={setFixedData} 
        weightData={weightData} 

        apiServerUrl={apiServerUrl}
      />
      <WeightChart
        value={value}
        weightData={weightData}
        setWeightData={setWeightData}
        fixedData={fixedData}
      />
      <WeightTable
      weightData={weightData}
      setFixedData={setFixedData}

      apiServerUrl={apiServerUrl}
      />
    </Box>
  );
}
