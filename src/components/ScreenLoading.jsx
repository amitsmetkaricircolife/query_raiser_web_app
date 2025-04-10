import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const ScreenLoading = ({
  message = "Loading",
  size = 40,
  fullScreen = true,
}) => {
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
          <CircularProgress size={size} color="primary" />
          <Typography
            variant="body1"
            mt={2}
            color="text.secondary"
            sx={{ fontSize: "1rem" }}
          >
            {message}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ScreenLoading;
