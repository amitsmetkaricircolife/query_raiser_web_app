import { useState, memo } from "react";
import {
  Paper,
  Collapse,
  Button,
  Typography,
  Box,
  IconButton,
  Stack,
  useTheme,
  Chip,
  Divider,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import DataViewerDialog from "../../components/DataViewerDialog";
import NoDataFound from "../../components/NoDataFound";

const PastRequestAccordion = memo(function PastRequestAccordion({
  device,
  postedDate,
  status,
  issue,
  description,
  address,
  contactPerson,
  contactNumber,
  expanded,
  onChange,
  image,
}) {
  //constants
  const theme = useTheme();
  console.log("THIS IS IMAGE", image);

  //states
  const [dialogOpen, setDialogOpen] = useState(false);

  //methods
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          mt: 2,
          overflow: "hidden",
          p: 2,
          backgroundColor: theme.palette.grey[50],
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          onClick={onChange}
          sx={{ cursor: "pointer" }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="subtitle2"
              color={theme.palette.secondary.main}
            >
              Device:
            </Typography>
            <Typography variant="subtitle2">{device ?? "--"}</Typography>
          </Stack>

          <IconButton size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Box onClick={onChange} sx={{ cursor: "pointer", mb: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="subtitle2"
              color={theme.palette.secondary.main}
            >
              Posted On:
            </Typography>
            <Typography variant="subtitle2">
              {postedDate != "" ? postedDate : "-"}
            </Typography>
          </Stack>
        </Box>
        <Box onClick={onChange} sx={{ cursor: "pointer", mb: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="subtitle2"
              color={theme.palette.secondary.main}
            >
              Status:
            </Typography>
            <Chip
              label={status}
              color={
                status == "Open"
                  ? "error"
                  : status == "Pending"
                  ? "warning"
                  : "success"
              }
              size="small"
              variant="outlined"
            />
          </Stack>
        </Box>
        <Box onClick={onChange} sx={{ cursor: "pointer", mb: 0.4 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="subtitle2"
              color={theme.palette.secondary.main}
            >
              Issue:
            </Typography>
            <Typography variant="subtitle2">
              {issue != "" ? issue : "-"}
            </Typography>
          </Stack>
        </Box>

        <Collapse in={expanded}>
          <Divider sx={{ my: 3 }} />

          <Box sx={{ mt: 1 }}>
            <Stack direction="row" spacing={1}>
              <Typography
                variant="subtitle2"
                color={theme.palette.secondary.main}
              >
                Description:
              </Typography>
              <Typography variant="subtitle2">{description ?? "--"}</Typography>
            </Stack>
            {image ? (
              <Link
                component="button"
                variant="body2"
                onClick={handleOpenDialog}
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: "underline",
                  cursor: "pointer",
                  mt: 0.5,
                  display: "inline-block",
                }}
              >
                <Stack direction="row" alignItems="center">
                  {" "}
                  <AttachFileIcon fontSize="small" />
                  View Attachment
                </Stack>
              </Link>
            ) : null}
          </Box>
          <Box sx={{ mt: 1 }}>
            <Stack direction="row" spacing={1}>
              <Typography
                variant="subtitle2"
                color={theme.palette.secondary.main}
              >
                Address:
              </Typography>
              <Typography variant="subtitle2">
                {address != "" ? address : "-"}
              </Typography>
            </Stack>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1.5, sm: 10 }}
            sx={{
              mt: 1,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="subtitle2"
                color={theme.palette.secondary.main}
              >
                Contact Person:
              </Typography>
              <Typography variant="subtitle2">
                {contactPerson != "" ? contactPerson : "-"}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="subtitle2"
                color={theme.palette.secondary.main}
              >
                Contact Number:
              </Typography>
              <Typography variant="subtitle2">
                {contactNumber != "" ? contactNumber : "-"}
              </Typography>
            </Stack>
          </Stack>
        </Collapse>
      </Paper>
      <DataViewerDialog
        maxWidth="md"
        open={dialogOpen}
        onClose={handleCloseDialog}
        title={`Supporting Images for ${device ?? "Other"}`}
      >
        {image ? (
          <img src={image} alt="Image" width="100%vw" height="500px" />
        ) : (
          <NoDataFound />
        )}
      </DataViewerDialog>
    </>
  );
});

export default PastRequestAccordion;
