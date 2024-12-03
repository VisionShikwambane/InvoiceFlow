import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { InvoiceDetails } from '../models/create-invoice.interface';

import { Observable } from 'rxjs';
import { ResponseResponse } from '../models/ResponseObject';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
    
  private baseUrl = `${environment.apiUrl}/invoice`;

  constructor(private http: HttpClient) {}

  createInvoice(invoiceData: InvoiceDetails): Observable<ResponseResponse<InvoiceDetails>> {
    return this.http.post<ResponseResponse<InvoiceDetails>>(this.baseUrl, invoiceData);
  }

  getUserInvoices(userId: number): Observable<ResponseResponse<InvoiceDetails[]>> {
    return this.http.get<ResponseResponse<InvoiceDetails[]>>(`${this.baseUrl}/user/${userId}`);
  }

  updateInvoiceStatus(invoiceId: string, status: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${invoiceId}`, { status });
  }

  deleteInvoice(invoiceId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${invoiceId}`);
  }
}
