import { useAuth0 } from "@auth0/auth0-react";

export const StartPage = () => {
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

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
    });
  };

  return (
    <>
      <button className="button__login" onClick={handleLogin}>
        Log In
      </button>

      <button className="button__sign-up" onClick={handleSignUp}>
        Sign Up
      </button>
    </>
  );
};


