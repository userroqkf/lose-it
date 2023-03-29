import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DataUsageIcon from '@mui/icons-material/DataUsage';

export default function SidebarItem(props) {

  return (
    <List>
      {["macro","dashboard", "food", "weight"].map((text, index) => (
        <NavLink 
          key={index} 
          to={`/${text}`} 
          style={{ textDecoration: 'none' }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {text === "macro" && <DataUsageIcon />}
                {text === "dashboard" && <HomeIcon />}
                {text === "food" && <RestaurantIcon />}
                {text === "weight" && <MonitorWeightIcon />}
              </ListItemIcon>
              <ListItemText 
                primary={text}
                sx={{
                  color: "black",
                  textTransform: "uppercase"
                }}

              />
            </ListItemButton>
          </ListItem>
          </NavLink>
      ))}
    </List>
  );
}
