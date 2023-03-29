import { Box } from '@mui/material';
import Typography from '@mui/material/Typography'
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';

export default function Logo() {
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={"center"}
      alignItems={"center"}

    >
      <MonitorWeightIcon sx={{ display: 'flex', color: "#0066EE", mr: 1 }} />
      <Typography
        variant="h6"
        sx={{
          mr: 2,
          display:'flex',
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