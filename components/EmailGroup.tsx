
import React from 'react';
import { EmailAccount, EmailStatus } from '../types';
import { NoDataIcon } from './Icons';

interface EmailGroupProps {
  account: EmailAccount;
  icon: React.ReactNode;
}

const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
};

const EmailTable: React.FC<{ emails: EmailAccount['emails'] }> = ({ emails }) => {
  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 text-brand-text-secondary">
        <NoDataIcon className="w-16 h-16 mb-4" />
        <p className="font-semibold">No data</p>
        <p className="text-sm">No matching emails found for this account.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-brand-text-secondary uppercase">
          <tr>
            <th scope="col" className="py-3 px-4">Sender</th>
            <th scope="col" className="py-3 px-4">Subject</th>
            <th scope="col" className="py-3 px-4">Status</th>
            <th scope="col" className="py-3 px-4">Time</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email.id} className="border-t border-brand-border hover:bg-slate-700/50">
              <td className="py-3 px-4">
                <div className="font-medium text-slate-100">{email.senderName}</div>
                <div className="text-brand-text-secondary">{email.senderEmail}</div>
              </td>
              <td className="py-3 px-4 text-slate-300">{email.subject}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 text-xs font-bold rounded-full text-white ${email.status === EmailStatus.INBOX ? 'bg-brand-success' : 'bg-brand-danger'}`}>
                  {email.status}
                </span>
              </td>
              <td className="py-3 px-4 text-brand-text-secondary whitespace-nowrap">{timeAgo(email.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const EmailGroup: React.FC<EmailGroupProps> = ({ account, icon }) => {
  return (
    <div className="bg-brand-surface rounded-xl shadow-lg overflow-hidden">
      <div className="bg-slate-700/50 p-4 flex items-center gap-4 border-b border-brand-border">
        {icon}
        <div>
          <h3 className="font-bold text-lg text-slate-100">{account.name}</h3>
          <p className="text-brand-text-secondary text-sm">{account.email}</p>
        </div>
      </div>
      <EmailTable emails={account.emails} />
    </div>
  );
};

export default EmailGroup;
