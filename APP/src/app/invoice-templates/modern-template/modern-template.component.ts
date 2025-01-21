import { Component, Input, OnInit } from '@angular/core';
import { InvoiceDetails } from '../../models/create-invoice.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
  
     
  }



  

}
