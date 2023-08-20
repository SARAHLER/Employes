const fs = require('fs'); 

let employees = []; 
fs.readFile('employees.json', (err, data) => {
    if (err) {
      console.error("Error writing JSON file", err);
    } else {
      employees = JSON.parse(data).employees; 
    }
  });
const allEmployees = async (req, res) => {
  res.json(employees);
};

const addemployee = async (req, res) => {
  const newEmployee = req.body;
  employees.push(newEmployee);

  fs.writeFile("employees.json", JSON.stringify({ employees }), (err) => {
    if (err) {
      console.error("Error writing JSON file", err);
    } else {
      console.log("Data updated successfully");
    }
  });
  res.json({ message: "Successfully added a new employee" });
};

const deleteEmployees = async (req, res) => {
  const { EmployeeID } = req.params;
  employees = employees.filter((employee) => employee.EmployeeID !== EmployeeID);

  fs.writeFile('employees.json', JSON.stringify({ employees }), (err) => {
    if (err) {
      console.error("Error writing JSON file", err);
    } else {
      console.log("Data updated successfully");
    }
  });

  res.json({ message: 'Employee deleted successfully' });
};
const editEmployee = async (req, res) => {
    const { EmployeeID } = req.params; 
    const updatedEmployee = req.body; 
  
    const employeeIndex = employees.findIndex((employee) => employee.EmployeeID === EmployeeID);
  
    if (employeeIndex === -1) {
      return res.status(404).json({ message: 'Employee not found' });
    }
  
    employees[employeeIndex] = updatedEmployee;
  
    fs.writeFile('employees.json', JSON.stringify({ employees }), (err) => {
      if (err) {
        console.error("Error writing JSON file", err);
        return res.status(500).json({ message: 'Error updating data' });
      } else {
        console.log("Data updated successfully");
        return res.json({ message: 'Employee updated successfully' });
      }
    });
  };
  
module.exports = { allEmployees, addemployee, deleteEmployees,editEmployee };
