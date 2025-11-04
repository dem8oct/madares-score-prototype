import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Modal from './common/Modal';

const RoleSelector = () => {
  const { showRoleSelector, selectRole } = useAuth();
  const { t } = useLanguage();

  const roles = [
    { value: 'school_admin', icon: '🏫', description: 'Manage school evaluations' },
    { value: 'ops_reviewer', icon: '✅', description: 'Review and approve submissions' },
    { value: 'committee_member', icon: '👔', description: 'Manage indicators and weights' },
    { value: 'appeals_officer', icon: '⚖️', description: 'Handle school appeals' },
    { value: 'national_viewer', icon: '📊', description: 'Master Dashboard - View all system statistics' },
    { value: 'public', icon: '🌐', description: 'Browse public school scores' },
  ];

  return (
    <Modal
      isOpen={showRoleSelector}
      onClose={() => {}} // Cannot close without selecting
      title={t('auth.selectRole')}
      size="lg"
      closeOnOutsideClick={false}
    >
      <div className="grid grid-cols-2 gap-4">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => selectRole(role.value)}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
          >
            <div className="text-4xl mb-3">{role.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {t(`roles.${role.value}`)}
            </h3>
            <p className="text-sm text-gray-500">{role.description}</p>
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-center text-gray-500">
        Select a role to explore the prototype
      </p>
    </Modal>
  );
};

export default RoleSelector;
