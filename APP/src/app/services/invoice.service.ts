  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { environment } from '../../environments/environment';
  import { InvoiceDetails } from '../models/InvoiceDetails';

  import { Observable } from 'rxjs';
  import { ResponseObject } from '../models/ResponseObject';

  @Injectable({
    providedIn: 'root',
  })
  export class InvoiceService {
      
    private baseUrl = `${environment.apiUrl}/Invoice`;

    constructor(private http: HttpClient) {}

    createInvoice(invoiceData: InvoiceDetails): Observable<ResponseObject<InvoiceDetails>> {
      return this.http.post<ResponseObject<InvoiceDetails>>(this.baseUrl, invoiceData);
    }

    getUserInvoices(userId: number): Observable<ResponseObject<InvoiceDetails[]>> {
      return this.http.get<ResponseObject<InvoiceDetails[]>>(`${this.baseUrl}/GetUserInvoices?userId=${userId}`);
    }

    updateInvoiceStatus(invoiceId: string, status: string): Observable<any> {
      return this.http.patch(`${this.baseUrl}/${invoiceId}`, { status });
    }

    deleteInvoice(invoiceId: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${invoiceId}`);
    }

    sendReminder(invoiceId: string): Observable<any> {
      return this.http.post(`${this.baseUrl}/${invoiceId}/reminder`, {});
    }

    updateInvoice(invoiceData: InvoiceDetails): Observable<ResponseObject<InvoiceDetails>> {
      return this.http.put<ResponseObject<InvoiceDetails>>(`${this.baseUrl}`, invoiceData);
    }
    
    archiveInvoice(invoiceDto: InvoiceDetails): Observable<ResponseObject<InvoiceDetails>> {
      return this.http.post<ResponseObject<InvoiceDetails>>(`${this.baseUrl}/archive`, invoiceDto);
    }
    

    updateStatus(invoiceDto: InvoiceDetails): Observable<ResponseObject<InvoiceDetails>> {
      return this.http.post<ResponseObject<InvoiceDetails>>(`${this.baseUrl}/updateStatus`, invoiceDto);
    }
    

  }
