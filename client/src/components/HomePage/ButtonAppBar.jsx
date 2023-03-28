import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LoginButton from './LoginButton';
import Logo from './Logo'

export default function ButtonAppBar() {
  return (
    <Box >
      <AppBar position="static"
      sx={{
        backgroundColor: '#ffff',
        width: "100%",
      }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Logo/>
          <LoginButton/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}