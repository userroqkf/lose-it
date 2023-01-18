import React, {useState} from "react";
import SidebarItem from "./SidebarItem";
import LetterAvatars from "./LetterAvatars";
import { Button, Drawer, Box, AppBar, Toolbar, IconButton, Typography, Avatar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { flexbox } from '@mui/system';


const drawerWidth = 240;

export default function Sidebar(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
        sx={{
          display:"flex",
          flexDirection:"row",
          justifyContent:{xs: "space-between", sm: "flex-end"},
          // backgroundColor:"white"
        }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
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
                <LetterAvatars 
                  name={props.name}
                /> 
            </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography> */}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Button>
            <LetterAvatars
              name={props.name}
            />
            <Typography>
              {props.name}
            </Typography>
          </Button>
          <SidebarItem/>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between" },
          }}
          open
        >
          <Box

          >
            <Button>
              <LetterAvatars
                name={props.name}
              />
              <Typography>
                {props.name}
              </Typography>
            </Button>
            <SidebarItem/>
          </Box>
          <Button>
            Logout
          </Button>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography>
          Hi, Welcome Back
        </Typography>
        <Box
          display="flex"
          // flexDirection={{xs:"column", md:"row"}}
          flexWrap="wrap"
          boxSizing="border-box"
          margin-right= "-15px"
          margin-left= "-15px"
        >
          <Box
            flex={{ xs: "0 0 100%", md:"0 0 50%"}}
            flexBasis={{lg:"0"}}
            flexGrow={{lg:"1"}}
            maxWidth={{ xs:"100%", md:"50%", lg:"100%"}}
            // backgroundColor="green"
            boxSizing="border-box"
            paddingLeft={"15px"}
            paddingRight={"15px"}
            height="300px"
            marginBottom="1.5rem"
            // position="relative"
          >
            <Box
              height="inherit"
              backgroundColor="black"
            >
              Testing
            </Box>
          </Box>
          <Box
            flex={{ xs: "0 0 100%", md:"0 0 50%"}}
            flexBasis={{lg:"0"}}
            flexGrow={{lg:"1"}}
            maxWidth={{ xs:"100%", md:"50%", lg:"100%"}}
            // backgroundColor="green"
            boxSizing="border-box"
            paddingLeft={"15px"}
            paddingRight={"15px"}
            height="300px"
            marginBottom="1.5rem"
            // position="relative"
          >
            <Box
              height="inherit"
              backgroundColor="black"
            >
              Testing
            </Box>
          </Box>
          <Box
            flex={{ xs: "0 0 100%", md:"0 0 50%"}}
            flexBasis={{lg:"0"}}
            flexGrow={{lg:"1"}}
            maxWidth={{ xs:"100%", md:"50%", lg:"100%"}}
            // backgroundColor="green"
            boxSizing="border-box"
            paddingLeft={"15px"}
            paddingRight={"15px"}
            height="300px"
            marginBottom="1.5rem"
            // position="relative"
          >
            <Box
              height="inherit"
              backgroundColor="black"
            >
              Testing
            </Box>
          </Box>
          <Box
            flex={{ xs: "0 0 100%", md:"0 0 50%"}}
            flexBasis={{lg:"0"}}
            flexGrow={{lg:"1"}}
            maxWidth={{ xs:"100%", md:"50%", lg:"100%"}}
            // backgroundColor="green"
            boxSizing="border-box"
            paddingLeft={"15px"}
            paddingRight={"15px"}
            height="300px"
            marginBottom="1.5rem"
            // position="relative"
          >
            <Box
              height="inherit"
              backgroundColor="black"
            >
              Testing
            </Box>
          </Box>
        </Box>
        
        <Box
        display="flex"
        flexWrap="wrap"
        boxSizing="border-box"
        marginRight="-15px"
        marginLeft="-15px"
        // backgroundColor="red"
        >
          <Box
          flex={{xs:"0 0 100%", md: "0 0 100%", lg:"0 0 66.666666666666%"}}
          maxWidth={{xs:"100%", md:"100%", lg:"66.666666666666%"}}
          boxSizing="border-box"
          paddingLeft={"15px"}
          paddingRight={"15px"}
          height="300px"
          marginBottom="1.5rem"
          >
            <Box
              height="inherit"
              backgroundColor="black"
              color={"white"}
            >
              Testing left
            </Box>
          </Box>
          <Box
          flex={{xs:"0 0 100%", md: "0 0 100%", lg:"0 0 33.333333333333%"}}
          maxWidth={{xs:"100%", md:"100%", lg:"33.333333333333%"}}
          boxSizing="border-box"
          paddingLeft={"15px"}
          paddingRight={"15px"}
          height="300px"
          marginBottom="1.5rem"
          >
            <Box
              height="inherit"
              backgroundColor="black"
              color={"white"}
            >
              Testing right
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}