import "chartjs-adapter-moment";

import WeightMonthSelector from "./WeightMonthSelector";
import AddWeight from "./AddWeight";

import { Box, Toolbar } from "@mui/material";
import WeightTable from "./WeightTable";
import WeightChart from "./WeightChart";
import { PageLayout } from "../PageLayout/PageLayout";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { PageLoader } from "../PageLoader";

const WeightDisplay = (props) => {
    const {value, setValue, weightData, setWeightData, fixedData, 
      setFixedData, dateSelected, setDateSelected, apiServerUrl, user} = props;

    return (
      <PageLayout>
        <Box 
          component="main" 
          width={"100%"}
          paddingTop={"1em"}
        >
          <Toolbar/>
          <WeightMonthSelector 
            setValue={setValue}
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
          />
          <AddWeight 
            setWeightData={setWeightData} 
            setFixedData={setFixedData} 
            weightData={weightData} 
            apiServerUrl={apiServerUrl}
            user={user}
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
          user={user}
          />
        </Box>
      </PageLayout>
  );
}

export default withAuthenticationRequired(WeightDisplay, {
  onRedirecting: () => (
    <div className="page-layout">
      <PageLoader 
      />
    </div>
  ),
});