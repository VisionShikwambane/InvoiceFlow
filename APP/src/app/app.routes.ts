import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserSectionComponent } from './user-section/user-section.component';
import { TemplatesSectionComponent } from './templates-section/templates-section.component';

export const routes: Routes = [
  {
    path: '',
    component: UserSectionComponent,
    children: [
    { path: '', redirectTo: 'invoices', pathMatch: 'full' },
    { path: 'invoices', loadComponent:  () =>import("./components/invoice-page/invoice-page.component").then(c=>c.InvoicePageComponent) },
    { path: 'templates', loadComponent:  () =>import("./components/select-invoice-template/select-invoice-template.component").then(c=>c.SelectInvoiceTemplateComponent) },
    { path: 'create-invoice/:templateId', loadComponent:  () =>import("./components/create-invoice/create-invoice.component").then(c=>c.CreateInvoiceComponent) },
    ]
  },
  {
    path: 'template',
    component: TemplatesSectionComponent,
    children: [
    { path: '', redirectTo: 'invoices', pathMatch: 'full' },
    { path: 'morderntemplate', loadComponent:  () =>import("./components/invoiceTemplates/modern-template/modern-template.component").then(c=>c.ModernTemplateComponent) },
    { path: 'proffesionaltemplate', loadComponent:  () =>import("./components/invoiceTemplates/professional-template/professional-template.component").then(c=>c.ProfessionalTemplateComponent) },
    ]
  },
  
];

