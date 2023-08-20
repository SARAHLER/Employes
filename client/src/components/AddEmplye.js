import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Grid,
  Button,
  Container,
  Paper,
  Typography,
  Alert,
  Snackbar,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTextField from "./CustomTextField";
import API_BASE_URL from "./apiConfig";

function AddEmployee() {
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(false);

  const handleCloseAlert = () => {
    setSuccessMessage(false);
  };
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/cities`)
      .then((response) => {
        if (Array.isArray(response.data.cities)) {
          setCities(response.data.cities);
        } else {
          console.error(
            "Response data.cities is not an array:",
            response.data.cities
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching city list:", error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      EmployeeID: "",
      Name: "",
      City: "",
      Department: "",
      Gender: "",
    },
    validationSchema: Yup.object({
      EmployeeID: Yup.string().required("שדה חובה"),
      Name: Yup.string()
        .required("שדה חובה")
        .matches(/^[\u0590-\u05FF\s]+$/, "שם יכול להכיל רק אותיות בעברית"),
      City: Yup.string().required("שדה חובה"),
      Department: Yup.string().required("שדה חובה"),
      Gender: Yup.string().required("שדה חובה"),
    }),

    onSubmit: (values) => {
      axios
        .post(`${API_BASE_URL}/employees`, values)
        .then((response) => {
          if (response.data.message === "עובד חדש נוסף בהצלחה") {
            setSuccessMessage(true);
            setTimeout(() => {
              navigate("/listEmployees");
            }, 2000);
          }
        })
        .catch((error) => console.error("Error adding employee:", error));
    },
  });

  return (
    <Container
      maxWidth="sm"
      sx={{ margin: "0 auto", marginTop: "50px", padding: "20px" }}
    >
      <Typography variant="h6">
        <strong>הוסף עובד חדש</strong>
      </Typography>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextField
                id="EmployeeID"
                name="EmployeeID"
                label="Employee ID"
                value={formik.values.EmployeeID}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.EmployeeID && !!formik.errors.EmployeeID}
                helperText={
                  formik.touched.EmployeeID && formik.errors.EmployeeID
                }
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                id="Name"
                name="Name"
                label="Name"
                value={formik.values.Name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Name && !!formik.errors.Name}
                helperText={formik.touched.Name && formik.errors.Name}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                id="City"
                name="City"
                label="City"
                select
                value={formik.values.City}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.City && !!formik.errors.City}
                helperText={formik.touched.City && formik.errors.City}
              >
                {cities.map((city) => (
                  <MenuItem key={city.CityID} value={city.CityName}>
                    {city.CityName}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                id="Department"
                name="Department"
                label="Department"
                value={formik.values.Department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Department && !!formik.errors.Department}
                helperText={
                  formik.touched.Department && formik.errors.Department
                }
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                id="Gender"
                name="Gender"
                label="Gender"
                value={formik.values.Gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Gender && !!formik.errors.Gender}
                helperText={formik.touched.Gender && formik.errors.Gender}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                הוסף
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar
        open={successMessage}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          העובד נוסף בהצלחה!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AddEmployee;
