import React from "react";

import {Box, Toolbar, Typography } from "@mui/material";

export default function Dashboard(props) {
  const {drawerWidth} = props
  return (
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
  )
}