import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { AllService } from "../../service/services";
import * as Yup from "yup";

const NewAddressForm = ({ onClose, customerData, onAddressAdded }) => {
  //constants
  //states
  console.log("CUSTOMER DATA", customerData);
  const [loading, setLoading] = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      line1: "",
      line2: "",
      pincode: "",
      city: "",
      state: "",
      contactPerson: "",
      contactNumber: "",
    },
    validationSchema: Yup.object({
      line1: Yup.string().required("Address Line 1 is required"),
      line2: Yup.string().required("Address Line 2 is required"),
      pincode: Yup.string()
        .required("Pincode is required")
        .matches(/^\d{6}$/, "Pincode must be exactly 6 digits"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      contactPerson: Yup.string().required("Contact Person is required"),
      contactNumber: Yup.string()
        .required("Pincode is required")
        .matches(/^\d{10}$/, "Mobile Number must be exactly 10 digits"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await AllService.createNewAddress(customerData?.customer_id, values);
        onAddressAdded();
        onClose();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const fetchPincodeDetails = useCallback(
    debounce(async (pincode) => {
      if (pincode.length === 6) {
        try {
          setPincodeLoading(true);
          const response = await axios.get(
            `${import.meta.env.VITE_APP_FETCH_ADDRESS_URL}${pincode}`
          );

          if (response.data && response.data[0]?.Status === "Success") {
            const postOffice = response.data[0]?.PostOffice?.[0];
            if (postOffice) {
              formik.setFieldValue("state", postOffice.State);
              formik.setFieldValue("city", postOffice.District);
            }
          }
        } catch (error) {
          console.error("Failed to fetch pincode details:", error);
        } finally {
          setPincodeLoading(false);
        }
      }
    }, 500),
    []
  );

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    formik.setFieldValue("pincode", value);

    if (value.length === 6) {
      fetchPincodeDetails(value);
    } else {
      formik.setFieldValue("state", "");
      formik.setFieldValue("city", "");
    }
  };

  useEffect(() => {
    return () => {
      fetchPincodeDetails.cancel();
    };
  }, [fetchPincodeDetails]);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Stack>
              <Typography variant="subtitle2">Address Line 1</Typography>
              <TextField
                name="line1"
                size="small"
                value={formik.values.line1}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.line1 && Boolean(formik.errors.line1)}
                helperText={formik.touched.line1 && formik.errors.line1}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack>
              <Typography variant="subtitle2">Address Line 2</Typography>
              <TextField
                name="line2"
                size="small"
                value={formik.values.line2}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.line2 && Boolean(formik.errors.line2)}
                helperText={formik.touched.line2 && formik.errors.line2}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack>
              <Typography variant="subtitle2">Pincode</Typography>
              <TextField
                name="pincode"
                size="small"
                value={formik.values.pincode}
                onBlur={formik.handleBlur}
                onChange={handlePincodeChange}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
                inputProps={{ maxLength: 6, inputMode: "numeric" }}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack>
              <Typography variant="subtitle2">City</Typography>
              <TextField
                loading={pincodeLoading}
                name="city"
                size="small"
                value={formik.values.city}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack>
              <Typography variant="subtitle2">State</Typography>
              <TextField
                loading={pincodeLoading}
                name="state"
                size="small"
                value={formik.values.state}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}></Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack>
              <Typography variant="subtitle2">Contact Person Name</Typography>
              <TextField
                name="contactPerson"
                size="small"
                value={formik.values.contactPerson}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.contactPerson &&
                  Boolean(formik.errors.contactPerson)
                }
                helperText={
                  formik.touched.contactPerson && formik.errors.contactPerson
                }
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack>
              <Typography variant="subtitle2">Contact Number</Typography>
              <TextField
                name="contactNumber"
                size="small"
                value={formik.values.contactNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.contactNumber &&
                  Boolean(formik.errors.contactNumber)
                }
                helperText={
                  formik.touched.contactNumber && formik.errors.contactNumber
                }
                inputProps={{ maxLength: 10, inputMode: "numeric" }}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid
            item
            size={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <LoadingButton
              loading={loading}
              type="submit"
              variant="contained"
              color="secondary"
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewAddressForm;
