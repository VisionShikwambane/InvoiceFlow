const { Client } = require('../models');

class ClientService {

  static async addClient(clientData) {
    try {
      // Validate client data (optional)
      if (!clientData.name || !clientData.email || !clientData.status) {
        throw new Error('All fields are required: name, email, phone, status');
      }

      // Create a new client
      const newClient = await Client.create({
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        status: clientData.status,
      });

      return newClient;
    } catch (error) {
      throw new Error(`Error adding client: ${error.message}`);
    }
  }


}

module.exports = ClientService;
