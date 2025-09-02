
import React from 'react';

const InstructionStep: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 bg-brand-primary flex items-center justify-center rounded-full text-white font-bold">
            {number}
        </div>
        <div>
            <h4 className="font-bold text-slate-100">{title}</h4>
            <p className="text-brand-text-secondary text-sm mt-1">{children}</p>
        </div>
    </div>
);


const InstructionsPanel: React.FC = () => {
  return (
    <div className="bg-brand-surface p-6 rounded-xl shadow-lg h-full">
      <h3 className="text-xl font-bold text-slate-100 mb-6">How to test your emails</h3>
      <div className="space-y-6">
        <InstructionStep number={1} title="Copy Recipients">
          Click the "Copy Recipients" button to copy all test email addresses to your clipboard.
        </InstructionStep>
        <InstructionStep number={2} title="Send Your Campaign">
          Go to your email service provider (ESP) and paste the copied list into the "To" field of your campaign.
        </InstructionStep>
        <InstructionStep number={3} title="Check the Results">
          Send your email. This dashboard will update in real-time to show whether your emails landed in the INBOX or SPAM folder.
        </InstructionStep>
      </div>
    </div>
  );
};

export default InstructionsPanel;
