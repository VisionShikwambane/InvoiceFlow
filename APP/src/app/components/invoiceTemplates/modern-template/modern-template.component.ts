import { Component, Input, OnInit } from '@angular/core';
import { InvoiceDetails } from '../../../models/create-invoice.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modern-template',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './modern-template.component.html',
  styleUrl: './modern-template.component.css'
})
export class ModernTemplateComponent implements OnInit{

  @Input() invoice!: InvoiceDetails;

  ngOnInit(): void {
    // Hardcoded test data
    // this.invoice = {
    //   invoiceNumber: 'INV-2024-001',
    //   issueDate: new Date('2024-02-21'),
    //   dueDate: new Date('2024-03-21'),
    //   templateId: 'modern-blue', // Added this line
    //   company: {
    //     name: 'Tech Solutions Ltd',
    //     address: '123 Business Park\nSilicon Valley, CA 94025',
    //     email: 'contact@techsolutions.com',
    //     phone: '+1 (555) 123-4567',
    //     logo: 'https://i.pinimg.com/736x/71/b3/e4/71b3e4159892bb319292ab3b76900930.jpg'
    //   },
    //   client: {
    //     name: 'Acme Corporation',
    //     address: '456 Corporate Avenue\nNew York, NY 10001',
    //     email: 'billing@acmecorp.com',
    //     phone: '+1 (555) 987-6543'
    //   },
    //   items: [
    //     {
    //       description: 'Website Development',
    //       quantity: 1,
    //       price: 5000.00,
    //       amount: 5000.00
    //     }
    //   ],
    //   subtotal: 9000.00,
    //   taxRate: 18,
    //   tax: 1620.00,
    //   total: 10620.00,
    //   notes: 'Thank you for your business. We look forward to working with you again!',
    //   terms: '1. Payment is due within 30 days\n2. Please make payment to the bank account provided\n3. Late payments are subject to a 5% fee',
    //   signature: {
    //     name: 'John Smith',
    //     date: new Date('2024-02-21')
    //   }
    // };
  }



  

}
