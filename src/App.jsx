import { Card, Grid, Typography } from "@mui/material";
import ServiceRequests from "./service-requests";
import logo from "./assets/cicolife logo.png";

function App() {
  return (
    <>
      <Grid container>
        <Grid size={{ xs: 12, sm: 2 }}>
          <img src={logo} alt="Company Logo" width={150} />
        </Grid>
        <Grid size={{ xs: 12, sm: 10 }}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <ServiceRequests />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
