import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Typography,Paper,Container,Button,TextField} from '@mui/material';


function EditEmployee() {
  const { EmployeeID } = useParams();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/editEmployee/${EmployeeID}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, [EmployeeID]);

  const formik = useFormik({
    initialValues: {
      EmployeeID: '', 
      Name: '',
      City: '',
      Department: '',
      Gender: '',
    },
    validationSchema: Yup.object({
      Name: Yup.string().required('שדה חובה'),
      City: Yup.string().required('שדה חובה'),
      Department: Yup.string().required('שדה חובה'),
      Gender: Yup.string().required('שדה חובה'),
    }),
    onSubmit: (values) => {
      // שלח בקשת PUT כדי לעדכן את פרטי העובד בשרת
      axios
        .put(`http://localhost:3000/editEmployee/${EmployeeID}`, values)
        .then((response) => {
          if (response.data.message === 'עובד עודכן בהצלחה') {
            // התמוטטות לדף הרשימה של העובדים לאחר עדכון הפרטים
          }
        })
        .catch((error) => console.error('Error updating employee data:', error));
    },
  });

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm" sx={{ margin: '0 auto', marginTop: '50px', padding: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6">עריכת פרטי עובד</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="EmployeeID"
            name="EmployeeID"
            label="מספר עובד"
            value={EmployeeID} 
            disabled
          />
          <TextField
            fullWidth
            id="Name"
            name="Name"
            label="שם"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Name}
            error={formik.touched.Name && !!formik.errors.Name}
            helperText={formik.touched.Name && formik.errors.Name}
          />
          <TextField
            fullWidth
            id="City"
            name="City"
            label="עיר"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.City}
            error={formik.touched.City && !!formik.errors.City}
            helperText={formik.touched.City && formik.errors.City}
          />
          <TextField
            fullWidth
            id="Department"
            name="Department"
            label="מחלקה"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Department}
            error={formik.touched.Department && !!formik.errors.Department}
            helperText={formik.touched.Department && formik.errors.Department}
          />
          <TextField
            fullWidth
            id="Gender"
            name="Gender"
            label="מגדר"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Gender}
            error={formik.touched.Gender && !!formik.errors.Gender}
            helperText={formik.touched.Gender && formik.errors.Gender}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            עדכן
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default EditEmployee;
