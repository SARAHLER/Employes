import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          flexGrow: 1,
          backgroundColor: "black",
        }}
      >
        <Box />

        <Toolbar sx={{
      marginRight: "10px",
    "& a": {
      color: "white",
      textDecoration: "none",
      marginRight: "10px",
    },
  }}>
          <Link  to="/"  >Home </Link>

          <Link to="/addEmployee" sx={{ color: "white" }}> Add-Employee </Link>
  
         <Link to="/listEmployees" sx={{ color: "white"}}> List-Employees </Link>

         </Toolbar>
      </AppBar>
    </Box>
  );
}
