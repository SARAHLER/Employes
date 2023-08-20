const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const cors = require('cors');
const employeeRouter=require('./routes/employees')
const citiesRouter=require('./routes/cities')

app.use(bodyParser.json());
app.use(cors());
app.use(employeeRouter);
app.use(citiesRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  