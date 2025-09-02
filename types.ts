
export enum EmailStatus {
  INBOX = 'INBOX',
  SPAM = 'SPAM',
}

export enum EmailProvider {
    GMAIL = 'Gmail',
    OUTLOOK = 'Outlook',
    YAHOO = 'Yahoo',
    OTHER = 'Other'
}

export interface Email {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  status: EmailStatus;
  timestamp: Date;
}

export interface EmailAccount {
  id: string;
  provider: EmailProvider;
  name: string;
  email: string;
  emails: Email[];
}
