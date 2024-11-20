import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'invoices', loadComponent:  () =>import("./components/invoice-page/invoice-page.component").then(c=>c.InvoicePageComponent) },
    { path: 'templates', loadComponent:  () =>import("./components/select-invoice-template/select-invoice-template.component").then(c=>c.SelectInvoiceTemplateComponent) },
    { path: 'create-invoice', loadComponent:  () =>import("./components/create-invoice/create-invoice.component").then(c=>c.CreateInvoiceComponent) },
];
