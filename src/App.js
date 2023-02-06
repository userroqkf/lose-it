import { useState } from "react";
import { Box } from "@mui/material";

import "./App.css";

import WeightDisplay from "./components/WeightDisplay";
import Sidebar from "./components/Sidebar";
import Chart from "./components/Chart";
import Dashboard from "./components/Dashboard";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay";

function App() {
  const drawerWidth = 240;
  const [showPage, SetShowPage] = useState("FOOD");

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar name={"John Kim"} drawerWidth={drawerWidth} />
      {showPage === "DASHBOARD" && <Dashboard drawerWidth={drawerWidth} />}
      {showPage === "WEIGHT" && <WeightDisplay drawerWidth={drawerWidth}/>}
      {showPage === "FOOD" && <FoodDisplay drawerWidth={drawerWidth} />}
    </Box>
  );
}

export default App;
