import { Box, Toolbar, Typography } from "@mui/material";
import DateSelector from "./FoodDisplay/DateSelector";

import MacroChart from "./FoodDisplay/MacroChart";
import WeightChart from "./WeightDisplay/WeightChart"
import WeightMonthSelector from "./WeightDisplay/WeightMonthSelector";

export default function Dashboard(props) {
  const {value, weightData, setWeightData, fixedData, drawerWidth, datePicker, 
    setDatePicker,setValue, dateSelected, setDateSelected, setShowPage,
    macroData, setMacroData, foodMacroSum,remainingMacro
  } = props;
  return (
    <Box
      component="main"
      //added border box
      box-sizing={"border-box"}
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      marginTop="60px"
      height="90vh"
    >
      {/* <Toolbar /> */}
      <Typography
        variant="h6"
        gutterBottom={true}
      >Hi, Welcome Back
      </Typography>
      <DateSelector
        datePicker={datePicker}
        setDatePicker={setDatePicker}
      />
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignContent={"center"}
        paddingTop={"1em"}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          boxSizing="border-box"
          margin-right="-15px"
          margin-left="-15px"
          height={"50%"}
          justifyContent={"space-around"}
          alignContent={"center"}
          onClick={() => {
            setShowPage("FOOD")
          }}
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
          display="flex"
          flexWrap="wrap"
          boxSizing="border-box"
          marginRight="-1em"
          marginLeft="-1em"
          // height={"70%"}
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"center"}
          paddingTop={"1em"}
          // backgroundColor="red"
        >
          <WeightMonthSelector
            setValue={setValue}
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
          />
          <Box
            // flex={{ xs: "0 0 100%", md: "0 0 100%", lg: "0 0 100%" }}
            // maxWidth={{ xs: "100%", md: "100%", lg: "100%" }}
            boxSizing="border-box"
            paddingLeft={"15px"}
            paddingRight={"15px"}
            marginBottom="1.5rem"
            onClick={() => {
              setShowPage("WEIGHT")
            }}
          >
            <WeightChart
              value={value}
              weightData={weightData}
              setWeightData={setWeightData}
              fixedData={fixedData}
            />
          </Box>
        </Box>
      </Box>
      
    </Box>
  );
}
