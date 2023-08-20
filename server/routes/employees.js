const  express = require('express');
const router = express.Router();
const{allEmployees,addemployee,deleteEmployees,editEmployee}=require('../controllers/employees');

router.get('/employees',allEmployees);
router.post('/employees',addemployee);
router.delete('/deleteEmployees/:EmployeeID',deleteEmployees);
router.put('/editEmployee/:EmployeeID',editEmployee)
module.exports = router;
