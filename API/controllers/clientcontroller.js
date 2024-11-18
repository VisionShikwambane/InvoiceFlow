const { Client } = require('../models');
const ClientService = require('../services/ClientService');

const getAllClients = async (req, res) => {
    const clients = await Client.findAll();
    res.json(clients);
};

const addClient = async (req, res) => {
    try {
      const { name, email, phone, status } = req.body;
      const newClient = await ClientService.addClient({ name, email, phone, status });
  
      res.status(201).json({
        isSuccess: true,
        message: 'Client added successfully',
        data: newClient,
      });

    } catch (error) {
      res.status(500).json({
        message: `Error adding client: ${error.message}`,
      });
    }
  };

module.exports = { getAllClients, addClient };