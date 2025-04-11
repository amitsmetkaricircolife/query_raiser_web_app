import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import NewServiceRequests from "./new-service-requests";
import PastServiceRequests from "./past-service-requests";

const ServiceRequests = () => {
  const [value, setValue] = React.useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {" "}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              overflowX: isMobile ? "auto" : "visible", // Allow horizontal scrolling on mobile
              "& .MuiTabs-scroller": {
                overflow: "visible !important", // Fix for scrollbar issues
              },
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              textColor="secondary"
              indicatorColor="secondary"
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons="auto" // Show scroll buttons when needed on mobile
              allowScrollButtonsMobile // Enable scroll buttons on mobile
              sx={{
                minHeight: "48px", // Ensure consistent height
                "& .MuiTab-root": {
                  fontSize: isMobile ? "0.75rem" : "0.875rem", // Smaller text on mobile
                  padding: isMobile ? "12px 8px" : "12px 16px", // Tighter padding on mobile
                  minWidth: "unset", // Allow tabs to shrink on mobile
                  whiteSpace: "nowrap", // Prevent text wrapping
                },
              }}
            >
              <Tab
                label={
                  isMobile
                    ? "Add New Breakdown Query"
                    : "Register New Breakdown Query"
                }
                value={1}
              />
              <Tab
                label={isMobile ? "Past Queries" : "Past Breakdown Queries"}
                value={2}
              />
            </TabList>
          </Box>
          <TabPanel value={1} sx={{ p: isMobile ? 1 : 2 }}>
            <NewServiceRequests />
          </TabPanel>
          <TabPanel value={2} sx={{ p: isMobile ? 1 : 2 }}>
            <PastServiceRequests />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default ServiceRequests;
