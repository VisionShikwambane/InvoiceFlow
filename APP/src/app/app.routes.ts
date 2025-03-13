import { RouterModule, Routes } from '@angular/router';
import { UserSectionComponent } from './user-section/user-section.component';
import { ClientSectionComponent } from './client-section/client-section.component';

export const routes: Routes = [
  {
    path: '',
    component: UserSectionComponent,
    children: [
      { path: '', redirectTo: 'invoices', pathMatch: 'full' },
      { path: 'invoices', loadComponent: () => import("./user-section/invoice-page/invoice-page.component").then(c => c.InvoicePageComponent) },
      { path: 'templates', loadComponent: () => import("./user-section/select-invoice-template/select-invoice-template.component").then(c => c.SelectInvoiceTemplateComponent) },
      { path: 'create-invoice/:templateId', loadComponent: () => import("./user-section/create-invoice/create-invoice.component").then(c => c.CreateInvoiceComponent) },
    ]
  },

  {
    path: 'clients',
    component: ClientSectionComponent,
    children: [
      // { path: '', redirectTo: 'invoices', pathMatch: 'full' },

    ]
  },


];

