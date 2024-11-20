import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Invoice {
  id: string;
  client: string;
  amount: number;
  date: Date;
  dueDate: Date;
  status: 'paid' | 'pending' | 'overdue';
}



@Component({
  selector: 'app-invoice-page',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure CommonModule is imported here
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.css'],
})
export class InvoicePageComponent {
  selectedStatus: string = 'All';
  searchTerm: string = '';

  constructor(
    private router: Router, 
  ) {
   
  }

  invoices: Invoice[] = [
    {
      id: 'INV-001',
      client: 'Acme Corp',
      amount: 2500.0,
      date: new Date('2024-03-15'),
      dueDate: new Date('2024-04-15'),
      status: 'paid',
    },
    {
      id: 'INV-002',
      client: 'Globex Inc',
      amount: 1750.5,
      date: new Date('2024-03-10'),
      dueDate: new Date('2024-04-10'),
      status: 'paid',
    },
    {
      id: 'INV-003',
      client: 'Wayne Enterprises',
      amount: 4999.99,
      date: new Date('2024-02-28'),
      dueDate: new Date('2024-03-28'),
      status: 'paid',
    },
    {
      id: 'INV-001',
      client: 'Acme Corp',
      amount: 2500.0,
      date: new Date('2024-03-15'),
      dueDate: new Date('2024-04-15'),
      status: 'paid',
    },
    {
      id: 'INV-002',
      client: 'Globex Inc',
      amount: 1750.5,
      date: new Date('2024-03-10'),
      dueDate: new Date('2024-04-10'),
      status: 'paid',
    },
    {
      id: 'INV-003',
      client: 'Wayne Enterprises',
      amount: 4999.99,
      date: new Date('2024-02-28'),
      dueDate: new Date('2024-03-28'),
      status: 'overdue',
    },
    {
      id: 'INV-001',
      client: 'Acme Corp',
      amount: 2500.0,
      date: new Date('2024-03-15'),
      dueDate: new Date('2024-04-15'),
      status: 'pending',
    },
    {
      id: 'INV-002',
      client: 'Globex Inc',
      amount: 1750.5,
      date: new Date('2024-03-10'),
      dueDate: new Date('2024-04-10'),
      status: 'paid',
    },
    {
      id: 'INV-003',
      client: 'Wayne Enterprises',
      amount: 4999.99,
      date: new Date('2024-02-28'),
      dueDate: new Date('2024-03-28'),
      status: 'overdue',
    },
    {
      id: 'INV-001',
      client: 'Acme Corp',
      amount: 2500.0,
      date: new Date('2024-03-15'),
      dueDate: new Date('2024-04-15'),
      status: 'pending',
    },
    {
      id: 'INV-002',
      client: 'Globex Inc',
      amount: 1750.5,
      date: new Date('2024-03-10'),
      dueDate: new Date('2024-04-10'),
      status: 'paid',
    },
    {
      id: 'INV-003',
      client: 'Wayne Enterprises',
      amount: 4999.99,
      date: new Date('2024-02-28'),
      dueDate: new Date('2024-03-28'),
      status: 'overdue',
    },
    {
      id: 'INV-001',
      client: 'Acme Corp',
      amount: 2500.0,
      date: new Date('2024-03-15'),
      dueDate: new Date('2024-04-15'),
      status: 'pending',
    },
    {
      id: 'INV-002',
      client: 'Globex Inc',
      amount: 1750.5,
      date: new Date('2024-03-10'),
      dueDate: new Date('2024-04-10'),
      status: 'paid',
    },
    {
      id: 'INV-003',
      client: 'Wayne Enterprises',
      amount: 4999.99,
      date: new Date('2024-02-28'),
      dueDate: new Date('2024-03-28'),
      status: 'overdue',
    },
    {
      id: 'INV-001',
      client: 'Acme Corp',
      amount: 2500.0,
      date: new Date('2024-03-15'),
      dueDate: new Date('2024-04-15'),
      status: 'pending',
    },
    {
      id: 'INV-002',
      client: 'Globex Inc',
      amount: 1750.5,
      date: new Date('2024-03-10'),
      dueDate: new Date('2024-04-10'),
      status: 'paid',
    },
    {
      id: 'INV-003',
      client: 'Wayne Enterprises',
      amount: 4999.99,
      date: new Date('2024-02-28'),
      dueDate: new Date('2024-03-28'),
      status: 'overdue',
    },
    {
      id: 'INV-001',
      client: 'Acme Corp',
      amount: 2500.0,
      date: new Date('2024-03-15'),
      dueDate: new Date('2024-04-15'),
      status: 'pending',
    },
    {
      id: 'INV-002',
      client: 'Globex Inc',
      amount: 1750.5,
      date: new Date('2024-03-10'),
      dueDate: new Date('2024-04-10'),
      status: 'paid',
    },
    {
      id: 'INV-003',
      client: 'Wayne Enterprises',
      amount: 4999.99,
      date: new Date('2024-02-28'),
      dueDate: new Date('2024-03-28'),
      status: 'overdue',
    },
    {
      id: 'INV-001',
      client: 'Acme Corp',
      amount: 2500.0,
      date: new Date('2024-03-15'),
      dueDate: new Date('2024-04-15'),
      status: 'pending',
    },
    {
      id: 'INV-002',
      client: 'Globex Inc',
      amount: 1750.5,
      date: new Date('2024-03-10'),
      dueDate: new Date('2024-04-10'),
      status: 'paid',
    },
    {
      id: 'INV-003',
      client: 'Wayne Enterprises',
      amount: 4999.99,
      date: new Date('2024-02-28'),
      dueDate: new Date('2024-03-28'),
      status: 'overdue',
    },
  ];

  getStatusClass(status: string): string {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (status) {
      case 'paid':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return baseClasses;
    }
  }

  filterByStatus(status: string) {
    this.selectedStatus = status;
    // Implement filtering logic if necessary
  }

  createInvoice() {
    // Logic for creating a new invoice
    this.router.navigate(['/templates']);
  }

  currentPage = 1;
  itemsPerPage = 6; // Show 9 items per page

  get filteredInvoices(): Invoice[] {
    return this.invoices.filter(invoice => {
      if (this.selectedStatus !== 'All' && invoice.status.toLowerCase() !== this.selectedStatus.toLowerCase()) {
        return false;
      }
      
      if (!this.searchTerm) return true;
      
      const searchLower = this.searchTerm.toLowerCase();
      return (
        invoice.client.toLowerCase().includes(searchLower) ||
        invoice.id.toLowerCase().includes(searchLower) ||
        invoice.amount.toString().includes(searchLower)
      );
    });
  }

  get paginatedInvoices(): Invoice[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredInvoices.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredInvoices.length / this.itemsPerPage);
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.currentPage = 1; // Reset to first page when searching
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
