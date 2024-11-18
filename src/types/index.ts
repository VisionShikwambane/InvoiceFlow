import { z } from 'zod';

export interface PaymentProof {
  id: string;
  invoiceId: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  verifiedAt?: string;
  status: 'pending' | 'verified' | 'rejected';
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectName: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
  createdAt: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  dueDate: string;
  createdAt: string;
  paidAt?: string;
  paymentProof?: PaymentProof;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'To Do' | 'In Progress' | 'Completed';
  progress: number;
  progressStatus: 'Not Started' | 'Started' | '25% Done' | '50% Done' | '75% Done' | 'Almost Done' | 'Completed';
  dueDate: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  timeSpent?: number;
  comments?: TaskComment[];
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: string;
}