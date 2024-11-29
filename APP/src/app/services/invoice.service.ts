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
}
