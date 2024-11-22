export interface EmailSettings {
    to: string;
  subject: string;
  message: string;
  scheduleType: 'now' | 'scheduled';
  scheduledDate?: Date;
  }