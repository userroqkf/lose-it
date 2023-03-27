import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

export const PageLayout = ({ children }) => {
  const drawerWidth = 240;
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar 
        drawerWidth={drawerWidth} 
      />
      {children}
    </Box>
  );
};
