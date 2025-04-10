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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import DataViewerDialog from "../../components/DataViewerDialog";

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
}) {
  //constants
  const theme = useTheme();

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
            <Typography variant="subtitle2">
              {device != "" ? device : "-"}
            </Typography>
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
              color="warning"
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
              <Typography variant="subtitle2">
                {description != "" ? description : "-"}
              </Typography>
            </Stack>
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

          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={handleOpenDialog}
            sx={{ mt: 1 }}
          >
            View Attachments
          </Button>
        </Collapse>
      </Paper>
      <DataViewerDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        title={`Supporting Images for ${device}`}
      ></DataViewerDialog>
    </>
  );
});

export default PastRequestAccordion;
