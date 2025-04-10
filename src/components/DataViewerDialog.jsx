import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

// mui imports
import {
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";

// icons
import { Close as CloseIcon } from "@mui/icons-material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DataViewerDialog({
  open,
  onClose,
  title,
  children, // Accept children prop for the content
  Content, // Optional component prop (alternative to children)
  selectedItem,
  onSave,
  maxWidth = "md",
  showSaveButton = false, // Option to show/hide save button
}) {
  const theme = useTheme();
  const childRef = React.useRef(null);

  const handleSave = () => {
    if (childRef.current && childRef.current.saveData) {
      childRef.current.saveData();
    }
    if (onSave) {
      onSave();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <BootstrapDialog
      maxWidth={maxWidth}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.grey[50],
        }}
        id="customized-dialog-title"
      >
        <Typography fontSize="bold">{title}</Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[50],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {/* Render either children or Content prop */}
        {children
          ? children
          : Content && <Content ref={childRef} selectedItem={selectedItem} />}
      </DialogContent>
      {showSaveButton && (
        <DialogActions>
          <Button autoFocus onClick={handleSave}>
            Save changes
          </Button>
        </DialogActions>
      )}
    </BootstrapDialog>
  );
}
