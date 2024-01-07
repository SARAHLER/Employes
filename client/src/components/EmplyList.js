import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  Typography,
  Alert,
  Snackbar
} from "@mui/material";
import {Edit as EditIcon,Delete as DeleteIcon  } from "@mui/icons-material";
import { Link } from "react-router-dom";
import API_BASE_URL from './apiConfig';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
  };
  useEffect(() => {
    axios
    .get(`${API_BASE_URL}/employees`) 
    .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleDelete = (EmployeeID) => {
    axios
    .delete(`${API_BASE_URL}/deleteEmployees/${EmployeeID}`)
    .then((response) => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.EmployeeID !== EmployeeID)
        );
        setShowSuccessAlert(true); 
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <div>
<Paper sx={{ width: '80%', margin: 'auto' }}>
  <Typography variant="h3" sx={{ marginTop: '40px', marginBottom: '40px' }}>Employee List</Typography>
  <Table>
    <TableHead>
      <TableRow style={{ background: "#f5f5f5" }}>
        <TableCell><strong>מספר עובד</strong></TableCell>
        <TableCell><strong>שם</strong></TableCell>
        <TableCell><strong>עיר</strong></TableCell>
        <TableCell><strong>מגדר</strong></TableCell>
        <TableCell><strong>פעולות</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {employees.map((employee) => (
        <TableRow key={employee.EmployeeID} style={{ background: "#fff" }}>
          <TableCell>{employee.EmployeeID}</TableCell>
          <TableCell>{employee.Name}</TableCell>
          <TableCell>{employee.City}</TableCell>
          <TableCell>{employee.Gender}</TableCell>
          <TableCell>
            <IconButton
              onClick={() => handleDelete(employee.EmployeeID)}
              color="error"
              aria-label="מחק"
            >
              <DeleteIcon />
            </IconButton>
            <Snackbar
          open={showSuccessAlert}
          key={employee.EmployeeID} 
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            sx={{ width: '100%' }}
          >
The employee was successfully deleted!          </Alert>
        </Snackbar>
            <Link to={`/editEmployee/${employee.EmployeeID}`}>
              <IconButton color="primary" aria-label="ערוך">
                <EditIcon />
              </IconButton>
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Paper>

    </div>
  );
}

export default EmployeeList;
