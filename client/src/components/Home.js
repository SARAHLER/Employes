import * as React from "react";
import {AppBar,Box,Toolbar} from "@mui/material";
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
