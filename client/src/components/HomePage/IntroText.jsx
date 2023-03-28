import { Box } from "@mui/system"
import { Typography } from "@mui/material"

export default function IntroText() {
  return (
    <Box
      padding={"50px 0 50px 0"}
    >
      <Typography 
        variant="h1"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'Helvetica',
          fontSize:"4em",
          letterSpacing: '.3rem',
          fontWeight: 900,
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Confidently track your nutrition.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mr: 2,
          fontFamily: 'sans-serif',
          fontSize:"1em",
          letterSpacing: '.3rem',
          fontWeight: 400,
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Track your meals and weight with LoseIt
      </Typography>
    </Box>
  )
}