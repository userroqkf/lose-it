import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chart from "./components/Chart";
import Dashboard from "./components/Dashboard";

import { Box } from "@mui/material";
import WeightDisplay from "./components/WeightDisplay";

function App() {
  const drawerWidth = 240;
  const [showPage, SetShowPage] = useState("WEIGHT");

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar name={"John Kim"} drawerWidth={drawerWidth} />
      {showPage === "DASHBOARD" && <Dashboard drawerWidth={drawerWidth} />}
      {/* {showPage === "Food" &&
        <FoodDisplay/>
      } */}
      {showPage === "WEIGHT" && <WeightDisplay />}
    </Box>
  );
}

export default App;
