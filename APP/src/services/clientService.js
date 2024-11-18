import api from './api';

export const getClients = () => api.get('/clients');

export const addClient = (client) => {
    return api.post('/clients', client)
      .then(response => {
        return response.data;
      });
  };
