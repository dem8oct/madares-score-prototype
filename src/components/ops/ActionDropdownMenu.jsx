import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, UserPlus, History, Download, MessageSquare } from 'lucide-react';

const ActionDropdownMenu = ({ evaluation, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleAction = (action) => {
    setIsOpen(false);
    onAction(action, evaluation);
  };

  const menuItems = [
    {
      id: 'open_review',
      label: 'Open Review',
      icon: ExternalLink,
      primary: true,
      action: () => handleAction('open_review'),
    },
    {
      id: 'assign_to_me',
      label: 'Assign to Me',
      icon: UserPlus,
      action: () => handleAction('assign_to_me'),
    },
    {
      id: 'view_history',
      label: 'View History',
      icon: History,
      action: () => handleAction('view_history'),
    },
    {
      id: 'download_evidence',
      label: 'Download Evidence',
      icon: Download,
      action: () => handleAction('download_evidence'),
    },
    {
      id: 'add_note',
      label: 'Add Internal Note',
      icon: MessageSquare,
      action: () => handleAction('add_note'),
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Actions menu"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="5" r="1.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <circle cx="12" cy="19" r="1.5" fill="currentColor" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                  item.primary
                    ? 'text-primary-600 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActionDropdownMenu;
