const fs = require('fs'); 

let employees = []; 
fs.readFile('employees.json', (err, data) => {
    if (err) {
      console.error('שגיאה בקריאת קובץ JSON', err);
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
      console.error("שגיאה בכתיבת קובץ JSON", err);
    } else {
      console.log("נתונים עודכנו בהצלחה");
    }
  });
  res.json({ message: 'עובד חדש נוסף בהצלחה' });
};

const deleteEmployees = async (req, res) => {
  const { EmployeeID } = req.params;
  employees = employees.filter((employee) => employee.EmployeeID !== EmployeeID);

  fs.writeFile('employees.json', JSON.stringify({ employees }), (err) => {
    if (err) {
      console.error('שגיאה בכתיבת קובץ JSON', err);
    } else {
      console.log('נתונים עודכנו בהצלחה');
    }
  });

  res.json({ message: 'עובד נמחק בהצלחה' });
};
const editEmployee = async (req, res) => {
    const { EmployeeID } = req.params; // מקבל את הפרמטר מה-URL
    const updatedEmployee = req.body; // מקבל את הנתונים המעודכנים מהבקשה
  
    // מחפש את העובד במערך לפי ה-ID
    const employeeIndex = employees.findIndex((employee) => employee.EmployeeID === EmployeeID);
  
    // אם לא מצא את העובד, מחזיר שגיאה 404
    if (employeeIndex === -1) {
      return res.status(404).json({ message: 'עובד לא נמצא' });
    }
  
    // מחליף את העובד הקיים במערך עם העובד המעודכן
    employees[employeeIndex] = updatedEmployee;
  
    // כתיבת המערך לקובץ JSON
    fs.writeFile('employees.json', JSON.stringify({ employees }), (err) => {
      if (err) {
        console.error('שגיאה בכתיבת קובץ JSON', err);
        return res.status(500).json({ message: 'שגיאה בעדכון נתונים' });
      } else {
        console.log('נתונים עודכנו בהצלחה');
        return res.json({ message: 'עובד עודכן בהצלחה' });
      }
    });
  };
  
module.exports = { allEmployees, addemployee, deleteEmployees,editEmployee };
