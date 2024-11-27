const { Client } = require('../models');

class ClientService {

  static async addClient(clientData) {
    try {
        // Validate client data
        if (!clientData.name || !clientData.email || !clientData.status) {
          throw new Error('All fields are required: name, email, phone, status');
        }
    
        if (clientData.id) {
          const updatedClient = await Client.findByPk(clientData.id);
    
          if (!updatedClient) {
            throw new Error(`Client with ID ${clientData.id} not found`);
          }
    
          await updatedClient.update({
            name: clientData.name,
            email: clientData.email,
            phone: clientData.phone,
            status: clientData.status,
          });
    
          return updatedClient;
        } else {
          // If `id` does not exist, create a new client
          const newClient = await Client.create({
            name: clientData.name,
            email: clientData.email,
            phone: clientData.phone,
            status: clientData.status,
          });
    
          return newClient;
        }
      } catch (error) {
        throw new Error(`Error saving client: ${error.message}`);
      }
  }


  static async deleteClient(clientId) {
    try {
      // Check if client exists
      const client = await Client.findByPk(clientId);
      if (!client) {
        throw new Error('Client not found');
      }

      // Delete the client
      await client.destroy();

      return { message: 'Client successfully deleted' };
    } catch (error) {
      throw new Error(`Error deleting client: ${error.message}`);
    }
  }

}

module.exports = ClientService;
