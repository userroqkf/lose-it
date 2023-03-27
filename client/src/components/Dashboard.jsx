import { Box, Typography } from "@mui/material";
import DateSelector from "./FoodDisplay/DateSelector";
import { Link } from "react-router-dom";

import MacroChart from "./FoodDisplay/MacroChart";
import { PageLayout } from "./PageLayout/PageLayout";
import WeightChart from "./WeightDisplay/WeightChart"
import WeightMonthSelector from "./WeightDisplay/WeightMonthSelector";


import { withAuthenticationRequired } from "@auth0/auth0-react";
import { PageLoader } from "./PageLoader";

const  Dashboard = (props) =>  {
  const {value, weightData, setWeightData, fixedData, drawerWidth, datePicker, 
    setDatePicker,setValue, dateSelected, setDateSelected, setShowPage, 
    foodMacroSum,remainingMacro
  } = props;
  return (
    <PageLayout>
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
          <Link to={"/food"}>
            <Box
              display="flex"
              flexWrap="wrap"
              boxSizing="border-box"
              margin-right="-15px"
              margin-left="-15px"
              height={"50%"}
              justifyContent={"space-around"}
              alignContent={"center"}
            >
              {["Protein", "Fat", "Carb", "Calories"].map((value, index) => {
                  return (
                      <MacroChart 
                        key={index} 
                        macroName={value.toLowerCase()} 
                        foodMacroSum={foodMacroSum} 
                        remainingMacro={remainingMacro}  
                      />
                  )
              })}
            </Box>
          </Link>

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
              boxSizing="border-box"
              paddingLeft={"15px"}
              paddingRight={"15px"}
              marginBottom="1.5rem"
            >
              <Link to={"/weight"}>
                <WeightChart
                  value={value}
                  weightData={weightData}
                  setWeightData={setWeightData}
                  fixedData={fixedData}
                />
              </Link>
            </Box>
          </Box>
        </Box>
        
      </Box>
    </PageLayout>
  );
}

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => (
    <div className="page-layout">
      <PageLoader 
      />
    </div>
  ),
});
