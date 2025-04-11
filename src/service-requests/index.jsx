import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import NewServiceRequests from "./new-service-requests";
import PastServiceRequests from "./past-service-requests";

const ServiceRequests = () => {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {" "}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab label="Register Breakdown Query" value={1} />
              <Tab label="Past Service Requests" value={2} />
            </TabList>
          </Box>
          <TabPanel value={1}>
            <NewServiceRequests />
          </TabPanel>
          <TabPanel value={2}>
            <PastServiceRequests />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default ServiceRequests;
