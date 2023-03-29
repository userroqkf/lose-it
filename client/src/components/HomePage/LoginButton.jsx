import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from "@mui/material";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
    });
  };

  return (
    <Button 
      variant="text" 
      sx={{color: "white"}} 
      onClick={handleLogin}
    >
      <Typography
        variant="h6"
        sx={{
          mr: 2,
          display: 'flex',
          fontFamily: 'Helvetica',
          fontSize: "1em",
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'black',
          textDecoration: 'none',
          textTransform: "uppercase"
        }}
      >
        log in
      </Typography>
    </Button>
  );
};


