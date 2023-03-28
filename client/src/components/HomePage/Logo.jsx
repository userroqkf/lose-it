import AdbIcon from '@mui/icons-material/Adb';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography'

export default function Logo() {
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={"center"}
      alignItems={"center"}

    >
      <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, color: "#0066EE", mr: 1 }} />
      <Typography
        variant="h6"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: '#0066EE',
          textDecoration: 'none',
        }}
      >
        Lose It
      </Typography>
    </Box>
  );
}