import { Box, Typography } from "@mui/material";
import React from "react";

const NoDataFound = ({ fullScreen = true }) => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={fullScreen ? "100vh" : "100%"}
        width="100%"
      >
        <Box textAlign="center">
          <Typography
            variant="body1"
            mt={2}
            color="text.secondary"
            sx={{ fontSize: "1rem" }}
          >
            No Data Found!
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default NoDataFound;
