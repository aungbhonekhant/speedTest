const express = require('express')
const router = express.Router();
const Services = require('./services/render');

const services = new Services();

/** 
* @description Root route
* @method GET /
*/
router.get('/', services.baseRoute);

/** 
* @description daily benchmark route
* @method GET /dailyLogs
*/
router.get('/dailyLogs/:date', services.dailyRoute);

module.exports = router;