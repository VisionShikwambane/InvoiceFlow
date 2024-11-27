const express = require('express');
const clientController = require('../controllers/clientcontroller');
const router = express.Router();


router.get('/clients', clientController.getAllClients);
router.get('/pdf', clientController.generateClientsPDF);
router.post('/clients', clientController.addClient);
router.delete('/clients/:id', clientController.deleteClient);

module.exports = router;
