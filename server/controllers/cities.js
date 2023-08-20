const fs = require('fs'); 
let cities = []; 

fs.readFile('employees.json', (err, data) => {
    if (err) {
      console.error("Error writing JSON file", err);
    } else {
        cities = JSON.parse(data).cities; 
    }
  });
const allCities=async(req,res)=>{
    res.json({ cities });
}
module.exports={allCities}