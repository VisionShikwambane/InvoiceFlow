import { Injectable } from '@angular/core';
import { ProfessionalTemplateComponent } from '../components/invoiceTemplates/professional-template/professional-template.component';
import { ModernTemplateComponent } from '../components/invoiceTemplates/modern-template/modern-template.component';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private templates = new Map([
    ['1', {
      id: '1',
      name: 'Professional Classic',
      component: ProfessionalTemplateComponent,
      preview: 'assets/templates-pictures/proffesional_template.png'
    }],
    ['2', {
      id: '2',
      name: 'Modern Minimal',
      component: ModernTemplateComponent,
      preview: 'assets/templates-pictures/morderntemplate.png'
    }]
  ]);

  getTemplate(id: string) {
    return this.templates.get(id);
  }
}