import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export default function SidebarItem(props) {
  const { setShowPage } = props;

  return (
    <List>
      {["dashboard", "food", "weight"].map((text, index) => (
        <NavLink key={index} to={`/${text}`} style={{ textDecoration: 'none' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
          </NavLink>
      ))}
    </List>
  );
}
