import { Component, OnInit, HostListener, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { InvoiceDetails } from '../../models/create-invoice.interface';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastService } from '../../services/toast.service';
import { ToastComponent } from '../toast/toast';
import { DataService } from '../../services/DataService';

interface InvoiceActivity {
  id: string;
  type: 'email_opened' | 'invoice_viewed' | 'invoice_downloaded' | 'reminder_sent' | 'status_changed';
  timestamp: string;
  details?: string;
}

@Component({
  selector: 'app-invoice-page',
  standalone: true,
  imports: [CommonModule, FormsModule, OverlayModule, PortalModule, ConfirmDialogComponent, SpinnerComponent, ToastComponent],
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.css'],
})
export class InvoicePageComponent implements OnInit {
  selectedStatus: string = 'All';
  searchTerm: string = '';
  invoices: InvoiceDetails[] = []
  openDropdownId: string | null = null;
  @ViewChild(CdkOverlayOrigin) overlayOrigin!: CdkOverlayOrigin;
  selectedInvoice: InvoiceDetails | null = null;
  isModalOpen = false;
  loading = false;
  amount!: number;
  @ViewChild('confirmDialog') confirmDialog!: ConfirmDialogComponent;

  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private toastService: ToastService,
    private dataService: DataService
  ) {

  }
  ngOnInit(): void {
    this.getUserInvoices();
    this.toastService.showError('Invoice saved successfully');
  }





  formatAmount(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

  onCancelDelete() {
    console.log('Cancelled delete');
  }

  archiveInvoice(e: any) {

  }


  unarchiveInvoice(e: any) { }

  formatActivityTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }
    return this.formatDate(timestamp);
  }

  getUserInvoices() {
    const userId = 2;
    this.loading = true;
    this.invoiceService.getUserInvoices(userId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          console.log(response.data);
          this.loading = false;
          this.invoices = response.data.map((invoice: any) => {
            const amount = Array.isArray(invoice.items)
              ? invoice.items.reduce(
                (acc: number, item: any) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
                0
              )
              : 0;

            return { ...invoice, amount };
          });

        } else {
          this.loading = false;
        }
      },
      error: (error: any) => {
        this.loading = false;
      },
    });
  }











  getStatusClass(status: string): string {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (status) {
      case 'Paid':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Sent':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Overdue':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Viewed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Downloaded':
        return `${baseClasses} bg-indigo-100 text-indigo-800`;
      case 'Draft':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-neutral-100 text-neutral-800`;
    }
  }


  filterByStatus(status: string) {
    this.selectedStatus = status;
    // Implement filtering logic if necessary
  }

  downloadInvoicePDF(e: any) {

  }

  showArchived() {

  }
  filterArchived() {

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

  overlayPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 8
    }
  ];

  toggleDropdown(id: string, event: MouseEvent) {
    event.stopPropagation();
    this.openDropdownId = this.openDropdownId === id ? null : id;
  }

  closeDropdown() {
    this.openDropdownId = null;
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (this.openDropdownId) {
      this.closeDropdown();
    }
  }

  editInvoice(InvoiceDetails: InvoiceDetails) {
    this.dataService.changeData(InvoiceDetails);
    this.router.navigate([`/create-invoice/${InvoiceDetails.templateId}`]);
  }

  markAsPaid(invoice: InvoiceDetails) {
    this.openDropdownId = null;
    // Update the invoice status
    this.invoiceService.updateInvoiceStatus(invoice.id, 'paid').subscribe({
      next: () => {
        // Refresh the invoices list
        this.getUserInvoices();
      },
      error: (error) => {
        console.error('Error marking invoice as paid:', error);
      }
    });
  }

  showDialog = false;

  deleteInvoice(invoice: InvoiceDetails) {
    this.showDialog = false;
    // this.openDropdownId = null;
    // if (confirm('Are you sure you want to delete this invoice?')) {
    //   this.invoiceService.deleteInvoice(invoice.id).subscribe({
    //     next: () => {
    //       // Refresh the invoices list
    //       this.getUserInvoices();
    //     },
    //     error: (error) => {
    //       console.error('Error deleting invoice:', error);
    //     }
    //   });
    // }
  }

  openConfirmationDialog() {
    this.confirmDialog.show(
      'Confirm Delete',
      'Are you sure you want to clear all the Grid Lines?',
      () => this.clear(),
      () => this.cancelClear()
    );
  }
  clear() { }
  cancelClear() { }


  sendReminder(invoice: InvoiceDetails) {
    this.invoiceService.sendReminder(invoice.id).subscribe({
      next: () => {
        // You might want to show a success message here
        console.log('Reminder sent successfully');
      },
      error: (error) => {
        console.error('Error sending reminder:', error);
      }
    });
  }

  viewInvoiceDetails(invoice: InvoiceDetails) {
    // Add hardcoded activities for demonstration
    const mockActivities: InvoiceActivity[] = [
      {
        id: '1',
        type: 'email_opened' as const,
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        details: 'Email opened by client'
      },
      {
        id: '2',
        type: 'invoice_viewed' as const,
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        details: 'Invoice viewed online'
      },
      {
        id: '3',
        type: 'invoice_downloaded' as const,
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
        details: 'Invoice PDF downloaded'
      },
      {
        id: '4',
        type: 'reminder_sent' as const,
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
        details: 'Payment reminder email sent'
      },
      {
        id: '5',
        type: 'status_changed' as const,
        timestamp: new Date().toISOString(), // now
        details: 'Invoice status changed to Pending'
      }
    ];

    this.selectedInvoice = {
      ...invoice,
      activities: mockActivities
    };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedInvoice = null;
  }

  // Get payment status with proper styling
  getPaymentStatusStyle(status: string): { color: string; backgroundColor: string } {
    switch (status.toLowerCase()) {
      case 'paid':
        return { color: 'rgb(34 197 94)', backgroundColor: 'rgb(220 252 231)' };
      case 'pending':
        return { color: 'rgb(234 179 8)', backgroundColor: 'rgb(254 249 195)' };
      case 'overdue':
        return { color: 'rgb(239 68 68)', backgroundColor: 'rgb(254 226 226)' };
      default:
        return { color: 'rgb(107 114 128)', backgroundColor: 'rgb(243 244 246)' };
    }
  }

  getActivityIconClass(type: string): string {
    const baseClass = 'bg-blue-500';
    switch (type) {
      case 'email_opened':
        return 'bg-green-500';
      case 'invoice_viewed':
        return 'bg-blue-500';
      case 'invoice_downloaded':
        return 'bg-purple-500';
      case 'reminder_sent':
        return 'bg-yellow-500';
      case 'status_changed':
        return 'bg-indigo-500';
      default:
        return baseClass;
    }
  }

  getActivityDescription(activity: InvoiceActivity): string {
    // If details are provided, use them
    if (activity.details) {
      return activity.details;
    }

    // Otherwise, use default descriptions
    switch (activity.type) {
      case 'email_opened':
        return 'Invoice email was opened';
      case 'invoice_viewed':
        return 'Invoice was viewed online';
      case 'invoice_downloaded':
        return 'Invoice was downloaded';
      case 'reminder_sent':
        return 'Payment reminder was sent';
      case 'status_changed':
        return 'Invoice status was updated';
      default:
        return 'Activity recorded';
    }
  }
}
