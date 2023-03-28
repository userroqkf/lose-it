import { useState } from "react";
import SidebarItem from "./SidebarItem";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

import { useAuth0 } from "@auth0/auth0-react";

import {
  Button,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Sidebar(props) {
  const { drawerWidth, setShowPage } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { logout, user } = useAuth0();
  console.log(user.nickname);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px`},
        }}
        color="inherit"
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: { xs: "space-between", md: "flex-end" },
            // backgroundColor:"white"
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleMenu}
            color="inherit"
          >
            <Avatar src={user.picture} alt="temp iamge"/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar />
          <Button>
            <Avatar src={user.picture} alt="temp iamge"/>
          </Button>
          <SidebarItem 
            setShowPage={setShowPage}
          />
          <Button onClick={handleLogout}>Logout</Button>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              display: "flex",
              flexDirection: "column",
              //need to change in order to follow the design principle given
              justifyContent: "space-between",
            },
          }}
          open
        >
          <Box>
          <Toolbar />
            <Button>
              <Avatar src={user.picture} alt="temp iamge"/>
            </Button>
            <SidebarItem 
              setShowPage={setShowPage}
            />
          </Box>
          <Box
            sx={{
              margin: "2em auto"
            }}
          >
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}
