const fs = require('fs'); 
let cities = []; 

fs.readFile('employees.json', (err, data) => {
    if (err) {
      console.error('שגיאה בקריאת קובץ JSON', err);
    } else {
        cities = JSON.parse(data).cities; 
    }
  });
const allCities=async(req,res)=>{
    res.json({ cities });
}
module.exports={allCities}