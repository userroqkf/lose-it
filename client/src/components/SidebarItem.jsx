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
      {["Dashboard", "Food", "Weight"].map((text, index) => (
        <ListItem key={text} 
        onClick={() => {
          setShowPage(text.toUpperCase())
        }} 
        disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
