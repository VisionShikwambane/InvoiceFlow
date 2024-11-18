const express = require('express');
const clientController = require('../controllers/clientcontroller');
const router = express.Router();


router.get('/clients', clientController.getAllClients);
router.post('/clients', clientController.addClient);


module.exports = router;
