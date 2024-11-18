import Dexie, { type Table } from 'dexie';
import { Client, Invoice, Task } from '@/types';

export class FreelanceDB extends Dexie {
  clients!: Table<Client>;
  invoices!: Table<Invoice>;
  tasks!: Table<Task>;

  constructor() {
    super('freelanceDB');
    this.version(1).stores({
      clients: '++id, name, email, status',
      invoices: '++id, number, clientId, status',
      tasks: '++id, title, clientId, status, priority',
    });
  }
}

export const db = new FreelanceDB();