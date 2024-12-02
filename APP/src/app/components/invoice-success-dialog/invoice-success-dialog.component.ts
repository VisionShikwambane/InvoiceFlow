import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReminderSettings } from '../../models/ReminderSettings';
import { EmailSettings } from '../../models/EmailSettings';


@Component({
  selector: 'app-invoice-success-dialog',
  standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './invoice-success-dialog.component.html',
  styleUrl: './invoice-success-dialog.component.css'
})
export class InvoiceSuccessDialogComponent {



  @Input() show = false;
  @Input() sendInvoiceToEmail = 'example@gmail.com';
  @Output() onClose = new EventEmitter<void>();
  @Output() onFinish = new EventEmitter<{
    emailSettings: EmailSettings;
  }>();

  currentStep = 0;
  steps = ['Send Invoice', 'Review & Download'];



  emailSettings: EmailSettings = {
    to: '',
    subject: 'Invoice from Your Company',
    message: '',
    scheduleType: 'now',
    scheduledDate: new Date()
  };

 

  downloadInvoice(): void {
    // Implementation would depend on your invoice generation service
    console.log('Downloading invoice...');
  }

  finish(): void {
    this.onFinish.emit({
      emailSettings: this.emailSettings
    });
    this.onClose.emit();
  }


}
