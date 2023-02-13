import { Box, Toolbar, Typography } from "@mui/material";
import DateSelector from "./FoodDisplay/DateSelector";

import MacroChart from "./FoodDisplay/MacroChart";
import WeightChart from "./WeightDisplay/WeightChart"

export default function Dashboard(props) {
  const {value, weightData, setWeightData, fixedData, drawerWidth} = props;
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      marginTop="60px"
      height="90vh"
    >
      {/* <Toolbar /> */}
      <Typography>Hi, Welcome Back</Typography>
      <DateSelector/>
      <Box
        display={"flex"}
        flexDirection="column"
      >
        <Box
          display="flex"
          // flexDirection={{xs:"column", md:"row", lg:"row"}}
          flexWrap="wrap"
          boxSizing="border-box"
          margin-right="-15px"
          margin-left="-15px"
          height={"30%"}
        >
          <MacroChart/>
          <MacroChart/>
          <MacroChart/>
          <MacroChart/>
        </Box>

        <Box
          display="flex"
          flexWrap="wrap"
          boxSizing="border-box"
          marginRight="-15px"
          marginLeft="-15px"
          height={"70%"}
          // backgroundColor="red"
        >
          <Box
            // flex={{ xs: "0 0 100%", md: "0 0 100%", lg: "0 0 100%" }}
            // maxWidth={{ xs: "100%", md: "100%", lg: "100%" }}
            boxSizing="border-box"
            paddingLeft={"15px"}
            paddingRight={"15px"}
            marginBottom="1.5rem"
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
