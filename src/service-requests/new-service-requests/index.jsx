import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Divider,
  TextField,
  Typography,
  Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AllService } from "../../service/services";
import { debounce } from "lodash";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DataViewerDialog from "../../components/DataViewerDialog";
import NewAddressForm from "./NewAddressForm";

const NewServiceRequests = () => {
  //constants
  const raisedBy = "GlTwSxksjHdPw0m1gDtWthVFwoj1";

  const acIssues = [
    { name: "AC Not Cooling" },
    { name: "AC not getting On" },
    { name: "Gas Leakage" },
    { name: "Getting Error Code on AC" },
    { name: "Water Dripping from AC" },
    { name: "App related Issues" },
    { name: "Request for Routine service" },
    { name: "AC is making noise" },
    { name: "Remote of AC not working" },
    { name: "Outdoor Unit of AC not working" },
    { name: "Ice formation on AC" },
    { name: "Others" },
  ];
  //states
  const [open, setOpen] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [deviceList, setDeviceList] = useState([]);
  const [openAddAddress, setOpenAddAddress] = useState(false);
  // Form validation schema

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      contactperson: "",
      contactnumber: "",
      contactemail: "xyz@gmail.com",
      image: "",
      subject: "AC Not Cooling",
      summery: "",
      status: false,
      deviceid: "",
      customer_id: "",
      address: "",
      raisedBy: raisedBy,
      billingName: "",
      brandName: "",
    },
    validationSchema: Yup.object({
      customer_id: Yup.string().required("Customer selection is required"),
      billingName: Yup.string().required("Billing Name is required"),
      brandName: Yup.string().required("Brand Name is required"),
      contactperson: Yup.string().required("Contact Person is required"),
      contactnumber: Yup.string()
        .required("Contact Number is required")
        .matches(/^[0-9]{10}$/, "Contact Number must be exactly 10 digits"),
      address: Yup.string().required("Address selection is required"),
      deviceid: Yup.string().required("AC selection is required"),
      subject: Yup.string().required("Issue selection is required"),
      summery: Yup.string(),
    }),

    onSubmit: async (values) => {
      console.log("THIS ARE VALUES", values);
      try {
        const response = await AllService.createQuery(values);
        console.log(response);
        setOpen(true);
        formik.resetForm();
        setSelectedCustomer(null); // Clear Autocomplete
        setAddresses([]);
        setDeviceList([]);
        setSelectedAddressId(null);
      } catch (error) {
        console.log(error);
      }
    },
  });

  //api calls
  const fetchCustomers = useCallback(
    debounce(async (query) => {
      if (query.length >= 3) {
        const customers = await AllService.getCustomerDataFilter(query);
        setCustomerOptions(customers);
      }
    }, 300),
    []
  );

  //methods
  const handleOpenDialog = () => {
    setOpenAddAddress(true);
  };

  const handleCloseDialog = () => {
    setOpenAddAddress(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleCustomerSelect = async (event, customer) => {
    setSelectedCustomer(customer);

    if (customer) {
      formik.setFieldValue("customer_id", customer.customer_id);

      const customerData = await AllService.getCustomerData(
        customer.customer_id
      );
      setAddresses(customerData.shipping_address);

      setSelectedAddressId(customerData.shipping_address?._id);
      formik.setFieldValue("userName", customerData.name);
      formik.setFieldValue("userPhoneNo", customerData.mobileNumber);
      formik.setFieldValue("billingName", customerData.gstin[0]?.billingName);
    } else {
      formik.setFieldValue("customer_id", "");
      setAddresses([]);
      setDeviceList([]);
      formik.resetForm();
    }
  };

  const handleAddressSelect = async (address) => {
    setSelectedAddressId(address._id);
    formik.setFieldValue("contactperson", address.contactPerson);
    formik.setFieldValue("contactnumber", address.contactNumber);
    const formattedAddress = `${address.line1}, ${address.line2}, ${address.city}, ${address.state}, ${address.pincode}`;
    formik.setFieldValue("address", formattedAddress);

    const devices = await AllService.getDeviceDataFromAddressId(address._id);
    console.log(devices); // You can store device data in state if needed.
    //setDeviceList(devices);
    setDeviceList([
      {
        deviceId: "E1:FF:56:R4",
        name: "Hall AC",
      },
    ]);
    if (devices?.length > 0) {
      formik.setFieldValue("deviceid", devices[0].deviceId);
    } else {
      formik.setFieldValue("deviceid", "Other");
    }
  };

  //useEffects

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Stack>
            <Typography variant="subtitle2">Search User</Typography>
            <Autocomplete
              value={selectedCustomer}
              options={customerOptions}
              getOptionLabel={(option) =>
                `${option.name} (${option.customer_id})` || ""
              }
              onInputChange={(e, value) => fetchCustomers(value)}
              onChange={handleCustomerSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="Search by Billing Name, Phone Number, Brand Name or Customer ID"
                />
              )}
            />
          </Stack>
        </Grid>
        {formik.values.customer_id != "" ? (
          <>
            <Grid size={12}>
              <Typography variant="h6" color="primary" fontWeight="bold">
                Billing Information
              </Typography>
            </Grid>
            <Grid size={6}>
              <Stack>
                <Typography variant="subtitle2">Billing Name</Typography>
                <TextField
                  name="billingName"
                  placeholder="Billing Name"
                  size="small"
                  value={formik.values.billingName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.billingName &&
                    Boolean(formik.errors.billingName)
                  }
                  helperText={
                    formik.touched.billingName && formik.errors.billingName
                  }
                />
              </Stack>
            </Grid>
            <Grid size={6}>
              <Stack>
                <Typography variant="subtitle2">Brand Name</Typography>
                <TextField
                  name="brandName"
                  placeholder="Brand Name"
                  size="small"
                  value={formik.values.brandName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.brandName && Boolean(formik.errors.brandName)
                  }
                  helperText={
                    formik.touched.brandName && formik.errors.brandName
                  }
                />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Typography variant="h6" color="primary" fontWeight="bold">
                User Information
              </Typography>
            </Grid>
            <Grid size={6}>
              <Stack>
                <Typography variant="subtitle2">User Name</Typography>
                <TextField
                  name="userName"
                  placeholder="User Name"
                  size="small"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.userName && Boolean(formik.errors.userName)
                  }
                  helperText={formik.touched.userName && formik.errors.userName}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Stack>
            </Grid>
            <Grid size={6}>
              <Stack>
                <Typography variant="subtitle2">User Phone No.</Typography>
                <TextField
                  name="userPhoneNo"
                  placeholder="User Phone No."
                  size="small"
                  value={formik.values.userPhoneNo}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.userPhoneNo &&
                    Boolean(formik.errors.userPhoneNo)
                  }
                  helperText={
                    formik.touched.userPhoneNo && formik.errors.userPhoneNo
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Typography variant="h6" color="primary" fontWeight="bold">
                Select Address
              </Typography>
              {formik.touched.address && formik.errors.address && (
                <Typography color="error" variant="caption">
                  {formik.errors.address}
                </Typography>
              )}
            </Grid>
            <Grid size={12} sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleOpenDialog}
                startIcon={<AddOutlinedIcon />}
              >
                Add new address
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {addresses.map((address) => (
                  <Grid size={4} key={address._id}>
                    <Box
                      sx={{
                        border:
                          selectedAddressId === address._id
                            ? "2px solid #1976d2"
                            : "1px solid #ccc",
                        borderRadius: 2,
                        p: 2,
                        cursor: "pointer",
                        backgroundColor:
                          selectedAddressId === address._id
                            ? "#e3f2fd"
                            : "white",
                      }}
                      onClick={() => handleAddressSelect(address)}
                    >
                      <Typography variant="caption">
                        {address.line1}, {address.line2}, {address.city},{" "}
                        {address.state}, {address.pincode}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid size={12}></Grid>
            <Grid size={6}>
              <Stack>
                <Typography variant="subtitle2">Contact Person</Typography>
                <TextField
                  name="contactperson"
                  placeholder="Contact Person Name"
                  size="small"
                  value={formik.values.contactperson}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.contactperson &&
                    Boolean(formik.errors.contactperson)
                  }
                  helperText={
                    formik.touched.contactperson && formik.errors.contactperson
                  }
                />
              </Stack>
            </Grid>
            <Grid size={6}>
              <Stack>
                <Typography variant="subtitle2">Contact Number</Typography>
                <TextField
                  name="contactnumber"
                  placeholder="Contact Number"
                  size="small"
                  value={formik.values.contactnumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.contactnumber &&
                    Boolean(formik.errors.contactnumber)
                  }
                  helperText={
                    formik.touched.contactnumber && formik.errors.contactnumber
                  }
                />
              </Stack>
            </Grid>
            <Grid size={6}>
              <Stack>
                <Typography variant="subtitle2">Select AC</Typography>
                <FormControl fullWidth>
                  <Select
                    name="deviceid"
                    value={formik.values.deviceid}
                    onChange={formik.handleChange}
                    size="small"
                    error={
                      formik.touched.deviceid && Boolean(formik.errors.deviceid)
                    }
                  >
                    {deviceList?.map((data, index) => (
                      <MenuItem key={index} value={data.deviceId}>
                        {data.name}
                      </MenuItem>
                    ))}
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
                {formik.touched.deviceid && formik.errors.deviceid && (
                  <Typography color="error" variant="caption">
                    {formik.errors.deviceid}
                  </Typography>
                )}
              </Stack>
            </Grid>
            <Grid size={6}>
              <Stack>
                <Typography variant="subtitle2">Select Issue</Typography>
                <FormControl fullWidth>
                  <Select
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    size="small"
                    error={
                      formik.touched.subject && Boolean(formik.errors.subject)
                    }
                  >
                    {acIssues.map((data) => (
                      <MenuItem value={data.name}>{data.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formik.touched.subject && formik.errors.subject && (
                  <Typography color="error" variant="caption">
                    {formik.errors.subject}
                  </Typography>
                )}
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack>
                <Typography variant="subtitle2">Description</Typography>
                <TextField
                  name="summery"
                  placeholder="Description"
                  size="small"
                  multiline
                  rows={5}
                  value={formik.values.summery}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.summery && Boolean(formik.errors.summery)
                  }
                  helperText={formik.touched.summery && formik.errors.summery}
                />
              </Stack>
            </Grid>
            {/* <Grid size={12}>
              <Typography variant="h6" color="primary" fontWeight="bold">
                Upload Images
              </Typography>
            </Grid> */}
            {/* <Grid size={12}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddPhotoAlternateIcon />}
            onClick={triggerFileInput}
            sx={{ mb: 2 }}
          >
            Upload Images
          </Button>

          <Grid container spacing={2}>
            {images.map((image) => (
              <Grid key={image.id} size={4}>
                <Box
                  sx={{
                    position: "relative",
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    overflow: "hidden",
                    height: 150,
                  }}
                >
                  <img
                    src={image.preview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={() => handleDeleteImage(image.id)}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "rgba(255,255,255,0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.9)",
                      },
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid> */}
            <Grid size={12}>
              <Divider />
            </Grid>
            <Grid size={12} align="right">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Grid>
          </>
        ) : null}
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Request created successfully!
        </Alert>
      </Snackbar>
      <DataViewerDialog
        maxWidth="sm"
        open={openAddAddress}
        onClose={handleCloseDialog}
        title={`Add New Address`}
      >
        <NewAddressForm
          onClose={handleCloseDialog}
          customerData={selectedCustomer}
        />
      </DataViewerDialog>
    </form>
  );
};

export default NewServiceRequests;
