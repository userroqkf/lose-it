import { Box } from "@mui/material";

export const PageLoader = () => {
  const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";

  return (
    <Box
      sx={{
        height: '5rem',
        width: '5rem',
        animation: 'spin 2s infinite linear'
      }}
    >
      <img src={loadingImg} alt="Loading..." />
    </Box>
  );
};