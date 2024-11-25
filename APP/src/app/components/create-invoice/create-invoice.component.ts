import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModernTemplateComponent } from '../invoiceTemplates/modern-template/modern-template.component';
import { InvoiceSuccessDialogComponent } from '../invoice-success-dialog/invoice-success-dialog.component';
import { ReminderSettings } from '../../models/ReminderSettings';
import { EmailSettings } from '../../models/EmailSettings';


@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModernTemplateComponent,InvoiceSuccessDialogComponent],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css'
})
export class CreateInvoiceComponent implements OnInit {

  invoiceForm!: FormGroup;
  showPreview = false;
  isLoading = false;
  selectedTemplateId!: string;
  showSuccessDialog = false;
  activeTab: 'edit' | 'preview' = 'edit'; // Default to the edit tab


  reminderSettings: ReminderSettings = {
    enabled: true,
    remindWith: 'email',
    reminderType: '24hours'
  };

  emailSettings: EmailSettings = {
    to: '',
    subject: 'Invoice from Your Company',
    message: '',
    scheduleType: 'now',
    scheduledDate: new Date()
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedTemplateId = params['templateId'];
    });
  }

  private createForm() {
    this.invoiceForm = this.fb.group({

      signatureimage: [''],
      signaturename: [''],
      signaturedate: [new Date()],
      invoiceNumber: ['', Validators.required],
      issueDate: [new Date(), Validators.required],
      dueDate: ['', Validators.required],
      companyname: ['', Validators.required],
      companyaddress: ['', Validators.required],
      companyemail: ['', [Validators.required, Validators.email]],
      companyphone: ['', Validators.required],
      companylogo: [''],
      client: this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['']
      }),
      items: this.fb.array([]),
      taxRate: [10, [Validators.required, Validators.min(0), Validators.max(100)]], // Default 10% tax rate
      currency: ['USD', Validators.required], // Default currency
      notes: [''],
      terms: [''],
      subtotal: [0],
      tax: [0],
      total: [0]
    });

    // Add first item by default
    this.addItem();
    this.invoiceForm.get('taxRate')?.valueChanges.subscribe(() => this.calculateTotals());
    this.invoiceForm.get('currency')?.valueChanges.subscribe(() => this.calculateTotals());
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem() {
    const itemGroup = this.fb.group({
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      amount: [{ value: 0, disabled: true }]
    });

    itemGroup.valueChanges.subscribe(() => this.calculateTotals());
    this.items.push(itemGroup);
  }

  removeItem(index: number) {
    if (this.items.length > 1) {
      this.items.removeAt(index);
      this.calculateTotals();
    } else {
      //alert('At least one item is required.');
    }
  }
  

  

  calculateTotals() {
    const items = this.items.getRawValue();
    const taxRate = this.invoiceForm.get('taxRate')?.value || 0; // Get custom tax rate
    const subtotal = items.reduce((sum, item) => {
      const amount = item.quantity * item.price;
      this.items.at(items.indexOf(item)).patchValue({ amount }, { emitEvent: false });
      return sum + amount;
    }, 0);
  
    const tax = (subtotal * taxRate) / 100; // Use custom tax rate
    const total = subtotal + tax;
  
    this.invoiceForm.patchValue({
      subtotal,
      tax,
      total
    }, { emitEvent: false });


    console.log(this.invoiceForm)
  }

  

  togglePreview() {
    this.showPreview = !this.showPreview;
  }

  logoPreview: string | ArrayBuffer | null = null;

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files[0]) {
      const file = input.files[0];
  
      // FileReader to generate preview
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result; // Set the preview data
        this.invoiceForm.get('companylogo')?.setValue(this.logoPreview); 
        console.log("Updated form:", this.logoPreview); 
      };
      reader.readAsDataURL(file);
    }
  }
  

  onDetachLogo(fileInput: HTMLInputElement): void {
    // Clear the preview and reset the form control
    this.logoPreview = null;
    //this.companyForm.get('company.logo')?.reset();

    // Reset the file input to show "No file selected"
    fileInput.value = '';
  }


  async saveInvoice() {
    if (this.invoiceForm.valid) {
      this.isLoading = true;
      try {
        // Your save logic here
        await this.mockSaveDelay();
        
        // Show success dialog after saving
        this.showSuccessDialog = true;
      } catch (error) {
        console.error('Error saving invoice:', error);
        // Handle error
      } finally {
        this.isLoading = false;
      }
    } else {
      this.markFormGroupTouched(this.invoiceForm);
    }
  }

  closeSuccessDialog() {
    this.router.navigate(['/invoices']);
    this.showSuccessDialog = false;
  }

  handleSuccessFinish(data: { reminders: ReminderSettings; email: EmailSettings }) {
    console.log('Reminder Settings:', data.reminders);
    console.log('Email Settings:', data.email);
  
    // Handle reminder settings
    if (data.reminders) {
      this.setupReminders(data.reminders);
    }
  
    // Handle email settings
    if (data.email) {
      this.sendInvoiceEmail(data.email);
    }
  
    // Close dialog and navigate
    this.showSuccessDialog = false;
    this.router.navigate(['/invoices']);
  }
  
  
  private async setupReminders(reminderSettings: ReminderSettings) {
    try {
      // Your reminder setup logic
      console.log('Setting up reminders...', reminderSettings);
    } catch (error) {
      console.error('Error setting up reminders:', error);
    }
  }
  

  private async sendInvoiceEmail(emailSettings: any) {
    try {
      // Your email sending logic
      console.log('Sending email...', emailSettings);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  printInvoice(){

  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Mock delay for save operation
  private mockSaveDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  goBack() {
    this.router.navigate(['/templates']);
  }



  signaturePreview: string | null = null;

onSignatureSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            this.signaturePreview = fileReader.result as string;
            this.invoiceForm.get('signatureimage')?.setValue(this.signaturePreview); 
           
        };
        fileReader.readAsDataURL(input.files[0]);
    }
}

onRemoveSignature(input: HTMLInputElement) {
    this.signaturePreview = null;
    input.value = ''; // Clear the file input
}









}



