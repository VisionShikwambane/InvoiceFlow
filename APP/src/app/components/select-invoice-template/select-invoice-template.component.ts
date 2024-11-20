import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-invoice-template',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-invoice-template.component.html',
  styleUrl: './select-invoice-template.component.css'
})
export class SelectInvoiceTemplateComponent {

  searchTerm = '';
  categories = ['All', 'Professional', 'Creative', 'Simple', 'Modern', 'Classic'];
  selectedCategory = 'All';

  templates: any[] = [
    {
      id: '1',
      name: 'Professional Classic',
      description: 'Clean and professional design for business use',
      preview: 'https://templates.invoicehome.com/invoice-template-us-neat-750px.png',
      tags: ['Business', 'Corporate', 'Clean'],
      popularity: 45
    },
    {
      id: '2',
      name: 'Modern Minimal',
      description: 'Contemporary design with minimal elements',
      preview: 'https://media.istockphoto.com/id/1195596077/vector/generic-invoice.jpg?s=1024x1024&w=is&k=20&c=yxWMeD8bJ0O1ix83sSf1UAVKnR8nlLAN6azs7EY5cDg=',
      tags: ['Modern', 'Minimal', 'Sleek'],
      popularity: 38
    },
    {
      id: '3',
      name: 'Creative Studio',
      description: 'Perfect for creative professionals and agencies',
      preview: 'https://media.istockphoto.com/id/827116026/vector/invoice-template.jpg?s=1024x1024&w=is&k=20&c=ky5i1GCKnNAvkhYZWoYTVHf6WmSrkKJ7v7-Nq58dGXc=',
      tags: ['Creative', 'Colorful', 'Unique'],
      popularity: 29
    },
    {
      id: '4',
      name: 'Tech Startup',
      description: 'Modern design for tech companies and startups',
      preview: 'https://templates.invoicehome.com/invoice-template-us-neat-750px.png',
      tags: ['Modern', 'Tech', 'Dynamic'],
      popularity: 33
    },
    {
      id: '5',
      name: 'Freelancer Pro',
      description: 'Perfect for independent professionals',
      preview: 'https://templates.invoicehome.com/invoice-template-us-neat-750px.png',
      tags: ['Freelance', 'Simple', 'Professional'],
      popularity: 41
    },
    {
      id: '6',
      name: 'Enterprise Suite',
      description: 'Comprehensive template for large organizations',
      preview: 'https://templates.invoicehome.com/invoice-template-us-neat-750px.png',
      tags: ['Enterprise', 'Corporate', 'Professional'],
      popularity: 27
    }
  ];

  get filteredTemplates() {
    return this.templates.filter(template => {
      const matchesSearch = !this.searchTerm || 
        template.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        template.tags.some((tag: string) => tag.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchesCategory = this.selectedCategory === 'All' || 
        template.tags.includes(this.selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  useTemplate(template: any) {
    console.log('Using template:', template);
    // Add your template selection logic here
  }

}
