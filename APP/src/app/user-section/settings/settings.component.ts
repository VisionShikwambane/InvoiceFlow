import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  activeTab = 'company';
  logoPreview: string | null = null;
  
  @ViewChild('logoInput') logoInput!: ElementRef;

  // Company settings with direct property binding
  companySettings = {
    name: '',
    regNumber: '',
    email: '',
    phone: '',
    address: '',
    logo: null as File | null
  };

  // VAT settings with direct property binding
  vatSettings = {
    enabled: false,
    rate: 20
  };

  // Invoice settings with direct property binding
  invoiceSettings = {
    prefix: 'INV-',
    nextNumber: 1001,
    dueDays: 30,
    currency: 'USD',
    notes: 'Thank you for your business.',
    terms: 'Payment is due within the specified term.'
  };

  constructor() { }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings() {
    // Here you would typically load settings from your API or local storage
    console.log('Loading settings...');
    
    // Example of loading settings from localStorage (if available)
    const savedCompanySettings = localStorage.getItem('companySettings');
    if (savedCompanySettings) {
      this.companySettings = { ...this.companySettings, ...JSON.parse(savedCompanySettings) };
    }
    
    const savedVatSettings = localStorage.getItem('vatSettings');
    if (savedVatSettings) {
      this.vatSettings = { ...this.vatSettings, ...JSON.parse(savedVatSettings) };
    }
    
    const savedInvoiceSettings = localStorage.getItem('invoiceSettings');
    if (savedInvoiceSettings) {
      this.invoiceSettings = { ...this.invoiceSettings, ...JSON.parse(savedInvoiceSettings) };
    }
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  onLogoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // For preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
      
      // Store the file
      this.companySettings.logo = file;
    }
  }

  saveSettings() {
    // Combine all settings
    const allSettings = {
      company: this.companySettings,
      vat: this.vatSettings,
      invoice: this.invoiceSettings
    };

    // Save to localStorage for demo purposes
    localStorage.setItem('companySettings', JSON.stringify({
      name: this.companySettings.name,
      regNumber: this.companySettings.regNumber,
      email: this.companySettings.email,
      phone: this.companySettings.phone,
      address: this.companySettings.address
      // Note: We don't save the File object
    }));
    
    localStorage.setItem('vatSettings', JSON.stringify(this.vatSettings));
    localStorage.setItem('invoiceSettings', JSON.stringify(this.invoiceSettings));
    
    console.log('Settings saved:', allSettings);
    
    // Here you would typically send the settings to your API
    // For example:
    // this.settingsService.saveSettings(allSettings).subscribe(
    //   response => {
    //     console.log('Settings saved successfully', response);
    //     // Show success message
    //   },
    //   error => {
    //     console.error('Error saving settings', error);
    //     // Show error message
    //   }
    // );
    
    // Show success notification (placeholder)
    alert('Settings saved successfully!');
  }

}
