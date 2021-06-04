const express = require('express');
const route = express.Router();

const services = require('../services/render');
const kontroller = require('../controller/kontroller');


/**
 * @description Root Route
 * @method GET /
 */

route.get('/', services.homeRoutes);

/**
 * @description adduser
 * @method GET /add-user
 */

route.get('/add-user', services.add_user);

/**
 * @description updateuser
 * @method GET /update-user
 */

route.get('/update-user', services.update_user);

// API
route.post('/api/users', kontroller.create);
route.get('/api/users', kontroller.find);
route.put('/api/users/:id', kontroller.update);
route.delete('/api/users/:id', kontroller.delete);

module.exports = route