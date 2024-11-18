export interface Client {
  id: string;
  name: string;
  email: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
  createdAt: string;
} 