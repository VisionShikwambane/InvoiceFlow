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
  @Output() onClose = new EventEmitter<void>();
  @Output() onFinish = new EventEmitter<{
    reminderSettings: ReminderSettings;
    emailSettings: EmailSettings;
  }>();

  currentStep = 0;
  steps = ['Set Reminders', 'Send Email', 'Review & Download'];

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

  getStepCircleClass(index: number): string {
    if (index < this.currentStep) {
      return 'bg-indigo-600'; // completed step
    } else if (index === this.currentStep) {
      return 'bg-indigo-600 text-white'; // current step
    }
    return 'bg-gray-200 text-gray-700'; // future step
  }

  getStepTextClass(index: number): string {
    if (index <= this.currentStep) {
      return 'text-indigo-600 font-medium';
    }
    return 'text-gray-500';
  }

  getReminderTypeText(type: ReminderSettings['reminderType']): string {
    const types = {
      '24hours': '24 hours before due date',
      '12hours': '12 hours before due date',
      '2days': '2 days before due date',
      '3days': '3 days before due date',
      '1week': '1 week before due date'
    };
    return types[type];
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  nextStep(): void {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  downloadInvoice(): void {
    // Implementation would depend on your invoice generation service
    console.log('Downloading invoice...');
  }

  finish(): void {
    this.onFinish.emit({
      reminderSettings: this.reminderSettings,
      emailSettings: this.emailSettings
    });
    this.onClose.emit();
  }


}
