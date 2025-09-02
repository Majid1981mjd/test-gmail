
import React, { useState } from 'react';
import { LogoIcon, SearchIcon, CopyIcon, UserProfileIcon } from './Icons';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  recipients: string;
}

const Header: React.FC<HeaderProps> = ({ searchValue, onSearchChange, recipients }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy Recipients');

  const handleCopy = () => {
    navigator.clipboard.writeText(recipients).then(() => {
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy Recipients'), 2000);
    });
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <LogoIcon className="w-8 h-8 text-brand-primary" />
        <h1 className="text-2xl font-bold text-slate-100">Inboxious</h1>
      </div>

      <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-64 lg:w-80">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-secondary" />
          <input
            type="text"
            placeholder="Search by subject or sender..."
            value={searchValue}
            onChange={onSearchChange}
            className="w-full bg-brand-surface border border-brand-border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
          />
        </div>
        
        <button
          onClick={handleCopy}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-surface border border-brand-border hover:bg-slate-700 text-brand-text font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <CopyIcon className="w-5 h-5" />
          {copyButtonText}
        </button>

        <div className="hidden sm:block">
            <UserProfileIcon className="w-10 h-10 text-brand-text-secondary cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
