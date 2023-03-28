import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material"
import {Typography} from "@mui/material"

export default function SignUpButton() {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#0066EE",
        width: "inherit",
        padding: "1.5em"
      }}
      onClick={handleSignUp}
    >
      <Typography>
        Start Your Journey
      </Typography>
    </Button>
  )
}