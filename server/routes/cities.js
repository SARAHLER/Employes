const  express = require('express');
const { allCities } = require('../controllers/cities');
const router = express.Router();

router.get('/cities',allCities)
module.exports = router;
