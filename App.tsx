
import React, { useState, useMemo, useCallback } from 'react';
import { EmailAccount, EmailStatus, EmailProvider } from './types';
import Header from './components/Header';
import StatCard from './components/StatCard';
import EmailGroup from './components/EmailGroup';
import InstructionsPanel from './components/InstructionsPanel';
import { GmailIcon, OutlookIcon, YahooIcon, OtherProviderIcon } from './components/Icons';

const initialEmailAccounts: EmailAccount[] = [
  {
    id: 'gmail-1',
    provider: EmailProvider.GMAIL,
    name: 'Test Account 1',
    email: 'test.acc.1.inbx@gmail.com',
    emails: [
      { id: 'email-1', senderName: 'Alice', senderEmail: 'alice@example.com', subject: 'Campaign Alpha: Weekly Newsletter', status: EmailStatus.INBOX, timestamp: new Date(Date.now() - 60 * 1000) },
      { id: 'email-2', senderName: 'Bob', senderEmail: 'bob@example.com', subject: 'Campaign Bravo: New Product Launch', status: EmailStatus.INBOX, timestamp: new Date(Date.now() - 5 * 60 * 1000) },
      { id: 'email-3', senderName: 'Charlie', senderEmail: 'charlie@example.com', subject: 'Campaign Charlie: Special Offer', status: EmailStatus.SPAM, timestamp: new Date(Date.now() - 30 * 60 * 1000) },
    ]
  },
  {
    id: 'gmail-2',
    provider: EmailProvider.GMAIL,
    name: 'Test Account 2',
    email: 'test.acc.2.inbx@gmail.com',
    emails: [
      { id: 'email-4', senderName: 'Alice', senderEmail: 'alice@example.com', subject: 'Campaign Alpha: Weekly Newsletter', status: EmailStatus.INBOX, timestamp: new Date(Date.now() - 2 * 60 * 1000) },
    ]
  },
    {
    id: 'outlook-1',
    provider: EmailProvider.OUTLOOK,
    name: 'Outlook Test',
    email: 'test.outlook.inbx@hotmail.com',
    emails: [
        { id: 'email-5', senderName: 'David', senderEmail: 'david@example.com', subject: 'Campaign Delta: Updates', status: EmailStatus.INBOX, timestamp: new Date(Date.now() - 10 * 60 * 1000) },
    ]
  },
  {
    id: 'yahoo-1',
    provider: EmailProvider.YAHOO,
    name: 'Yahoo Test',
    email: 'test.yahoo.inbx@att.net',
    emails: [
      { id: 'email-6', senderName: 'Eve', senderEmail: 'eve@example.com', subject: 'Campaign Echo: Follow-up', status: EmailStatus.SPAM, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    ]
  },
  {
    id: 'other-1',
    provider: EmailProvider.OTHER,
    name: 'AOL Test',
    email: 'test.other.inbx@aol.com',
    emails: []
  }
];

const App: React.FC = () => {
  const [emailAccounts] = useState<EmailAccount[]>(initialEmailAccounts);
  const [searchTerm, setSearchTerm] = useState('');

  const allRecipientEmails = useMemo(() => {
    return emailAccounts.map(acc => acc.email).join(', ');
  }, [emailAccounts]);

  const filteredAccounts = useMemo(() => {
    if (!searchTerm.trim()) {
      return emailAccounts;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return emailAccounts.map(account => {
      const filteredEmails = account.emails.filter(email =>
        email.senderName.toLowerCase().includes(lowercasedFilter) ||
        email.senderEmail.toLowerCase().includes(lowercasedFilter) ||
        email.subject.toLowerCase().includes(lowercasedFilter)
      );
      return { ...account, emails: filteredEmails };
    });
  }, [emailAccounts, searchTerm]);

  const calculateInboxPercentage = useCallback((provider: EmailProvider) => {
    const relevantEmails = emailAccounts
      .filter(acc => acc.provider === provider)
      .flatMap(acc => acc.emails);

    if (relevantEmails.length === 0) return 0;
    
    const inboxCount = relevantEmails.filter(email => email.status === EmailStatus.INBOX).length;
    return Math.round((inboxCount / relevantEmails.length) * 100);
  }, [emailAccounts]);

  const gmailPercentage = useMemo(() => calculateInboxPercentage(EmailProvider.GMAIL), [calculateInboxPercentage]);
  const outlookPercentage = useMemo(() => calculateInboxPercentage(EmailProvider.OUTLOOK), [calculateInboxPercentage]);
  const yahooPercentage = useMemo(() => calculateInboxPercentage(EmailProvider.YAHOO), [calculateInboxPercentage]);
  const othersPercentage = useMemo(() => calculateInboxPercentage(EmailProvider.OTHER), [calculateInboxPercentage]);
  
  const getProviderIcon = (provider: EmailProvider) => {
    switch(provider) {
        case EmailProvider.GMAIL: return <GmailIcon className="w-6 h-6" />;
        case EmailProvider.OUTLOOK: return <OutlookIcon className="w-6 h-6" />;
        case EmailProvider.YAHOO: return <YahooIcon className="w-6 h-6" />;
        case EmailProvider.OTHER: return <OtherProviderIcon className="w-6 h-6" />;
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg font-sans p-4 sm:p-6 lg:p-8">
      <Header
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        searchValue={searchTerm}
        recipients={allRecipientEmails}
      />
      <main className="mt-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Gmail" percentage={gmailPercentage} />
          <StatCard title="Outlook / Hotmail" percentage={outlookPercentage} />
          <StatCard title="AT&T / Yahoo" percentage={yahooPercentage} />
          <StatCard title="Others" percentage={othersPercentage} />
        </section>

        <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {filteredAccounts.map(account => (
                <EmailGroup 
                    key={account.id} 
                    account={account} 
                    icon={getProviderIcon(account.provider)}
                />
            ))}
          </div>
          <div className="lg:col-span-1">
            <InstructionsPanel />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
