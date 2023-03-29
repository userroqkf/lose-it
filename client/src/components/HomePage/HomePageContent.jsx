import { Button, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { Box } from "@mui/system"
import scale from "../../img/scale.png"
import IntroText from "./IntroText"
import SignUpButton from "./SignUpButton"

export default function HomePageContent() {
  return (
    <Grid2 
      container 
      spacing={1}
      sx={{
        width: "80%",
        margin:"auto"
      }}
    >
      <Grid2 xs={12} sm={6}
        sx={{
          maxWidth: "50%"
        }}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent="center"
          alignItems={'flex-start'}
          height="100%"
        >
          <IntroText/>
          <SignUpButton/>
        </Box>
      </Grid2>
      <Grid2 lg={6} xs={0}
        // sx={{
        //   maxWidth: "50%"
        // }}
      >
        <img 
          src={scale} 
          alt="scale"
          width={"100%"}
        />
      </Grid2>
    </Grid2>
  )
}