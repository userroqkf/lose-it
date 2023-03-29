import { Toolbar, Typography, Box, TextField, InputAdornment, Button} from "@mui/material";
import { PageLayout } from "../PageLayout/PageLayout";
import { PageLoader } from "../PageLoader";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import MacroForm from "./MacroForm";

const  MacroPage = (props) =>  {
  const { macroData, apiServerUrl, getAccessTokenSilently, user, setMacroData } = props;
  const drawerWidth = '240px';
  return (
    <PageLayout>
      <Box
        component="main"
        height={"100vh"}
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      > 
        <Toolbar/>
        <Box>
          <Typography 
            variant="h6"
            gutterBottom={true}
          >
            Macro Data
          </Typography>
        </Box>
        <Box>
          <MacroForm
            macroData={macroData}
            apiServerUrl={apiServerUrl}
            getAccessTokenSilently={getAccessTokenSilently}
            user={user}
            setMacroData={setMacroData}
          />
        </Box>
      </Box>
    </PageLayout>
  )
}

export default withAuthenticationRequired(MacroPage, {
  onRedirecting: () => (
    <div className="page-layout">
      <PageLoader 
      />
    </div>
  )
});