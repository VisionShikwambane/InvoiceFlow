import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { InvoiceDetails } from '../../models/create-invoice.interface';

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
export class InvoicePageComponent implements OnInit {
  selectedStatus: string = 'All';
  searchTerm: string = '';
  invoices: InvoiceDetails[] = []

  constructor(
    private router: Router, 
    private invoiceService: InvoiceService
  ) {
   
  }
  ngOnInit(): void {
    this.getUserInvoices();
  }


 
  amount: number = 2323;

  getUserInvoices() {
    const userId = 1; // Replace with actual user ID from your auth system
    
    this.invoiceService.getUserInvoices(userId).subscribe({
      next: (response) => {
        if (response.isSuccess) {

          this.invoices = response.data
          this.invoices = response.data.map((invoice: any) => {
            // Compute the total and store it in the `amount` variable
            this.amount = invoice.items.reduce((total: number, item: any) => {
              return total + item.quantity * item.price;
            }, 0);
  
            // Optionally, attach the computed amount to the invoice object
            invoice.amount = this.amount;
  
            return invoice;
          });

        } else {


        }
      
      },
      error: (error: any) => {
        console.error('Error loading invoices:', error);
       
      }
    });
  }

  


  
  getStatusClass(status: string): string {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (status) {
      case 'paid':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'viewed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'downloaded':
        return `${baseClasses} bg-indigo-100 text-indigo-800`;
      case 'draft':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-neutral-100 text-neutral-800`;
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

  get filteredInvoices(): InvoiceDetails[] {
    return this.invoices.filter(invoice => {
      if (this.selectedStatus !== 'All' && invoice.status.toLowerCase() !== this.selectedStatus.toLowerCase()) {
        return false;
      }
      
      if (!this.searchTerm) return true;
      
      const searchLower = this.searchTerm.toLowerCase();
      return (
        invoice.client.name.toLowerCase().includes(searchLower) ||
        invoice.id.toLowerCase().includes(searchLower) 
       // invoice.amount.toString().toString().includes(searchLower)
      );
    });
  }

  get paginatedInvoices(): InvoiceDetails[] {
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
