const { Client } = require('../models');
const ClientService = require('../services/ClientService');

const getAllClients = async (req, res) => {
    const clients = await Client.findAll();
    res.json(clients);
};

const addClient = async (req, res) => {
    try {
      const {id,  name, email, phone, status } = req.body;
      const newClient = await ClientService.addClient({id, name, email, phone, status });
  
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

  const deleteClient = async (req, res) => {
    try {
      const { id } = req.params; // Get client ID from URL params
      const result = await ClientService.deleteClient(id);
  
      res.status(200).json({
        isSuccess: true,
        message: result.message,
      });
    } catch (error) {
      res.status(500).json({
        message: `Error deleting client: ${error.message}`,
      });
    }
  };

module.exports = { getAllClients, addClient, deleteClient };