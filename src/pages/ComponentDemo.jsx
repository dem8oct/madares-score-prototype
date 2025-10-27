import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import Table from '../components/common/Table';
import Toast from '../components/common/Toast';
import ProgressBar from '../components/common/ProgressBar';
import { Plus, Search, Save } from 'lucide-react';

const ComponentDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [language, setLanguage] = useState('en');

  // Sample data for table
  const tableData = [
    { id: 1, school: 'Al-Noor School', status: 'Pending', score: 85 },
    { id: 2, school: 'Al-Majd Academy', status: 'Approved', score: 92 },
    { id: 3, school: 'Riyadh International', status: 'In Review', score: 78 },
  ];

  const tableColumns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'school', label: 'School Name', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const variant = value === 'Approved' ? 'success' : value === 'Pending' ? 'warning' : 'primary';
        return <Badge variant={variant}>{value}</Badge>;
      }
    },
    { key: 'score', label: 'Score', sortable: true },
  ];

  const mockUser = {
    name: 'Admin User',
    role: 'Operations Reviewer'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={mockUser}
        language={language}
        onLanguageToggle={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        onLogout={() => alert('Logout clicked')}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Design System Components
          </h1>
          <p className="text-gray-600">
            All components from Document 01 are working! Test each component below.
          </p>
        </div>

        <div className="space-y-8">
          {/* Buttons Section */}
          <Card title="Buttons" subtitle="Different variants and sizes">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button icon={<Plus className="w-4 h-4" />}>With Icon</Button>
                <Button disabled>Disabled</Button>
                <Button fullWidth>Full Width Button</Button>
              </div>
            </div>
          </Card>

          {/* Inputs Section */}
          <Card title="Input Fields" subtitle="Text inputs with various states">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="School Name"
                name="school"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter school name"
              />

              <Input
                label="Required Field"
                name="required"
                required
                placeholder="This field is required"
              />

              <Input
                label="With Icon"
                name="search"
                icon={<Search className="w-5 h-5 text-gray-400" />}
                placeholder="Search..."
              />

              <Input
                label="Error State"
                name="error"
                error="This field has an error"
                placeholder="Invalid input"
              />

              <Input
                label="Disabled"
                name="disabled"
                disabled
                value="Cannot edit"
              />

              <Input
                label="Arabic Input"
                name="arabic"
                dir="rtl"
                placeholder="أدخل النص هنا"
                helperText="This input supports RTL"
              />
            </div>
          </Card>

          {/* Badges Section */}
          <Card title="Badges" subtitle="Status indicators and labels">
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <Badge variant="success" dot>With Dot</Badge>
              <Badge variant="danger" dot>Alert</Badge>
            </div>
          </Card>

          {/* Progress Bars Section */}
          <Card title="Progress Bars" subtitle="Show completion status">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Primary</p>
                <ProgressBar percentage={75} color="primary" />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Success</p>
                <ProgressBar percentage={100} color="success" />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Warning</p>
                <ProgressBar percentage={45} color="warning" />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Danger</p>
                <ProgressBar percentage={20} color="danger" />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Sizes</p>
                <div className="space-y-3">
                  <ProgressBar percentage={60} size="sm" showLabel={false} />
                  <ProgressBar percentage={60} size="md" showLabel={false} />
                  <ProgressBar percentage={60} size="lg" showLabel={false} />
                </div>
              </div>
            </div>
          </Card>

          {/* Table Section */}
          <Card title="Table" subtitle="Sortable data table with row hover">
            <Table
              columns={tableColumns}
              data={tableData}
              onRowClick={(row) => alert(`Clicked: ${row.school}`)}
            />
          </Card>

          {/* Modal & Toast Section */}
          <Card title="Modal & Toast" subtitle="Dialogs and notifications">
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setIsModalOpen(true)}>
                Open Modal
              </Button>
              <Button
                variant="success"
                onClick={() => setShowToast(true)}
              >
                Show Toast
              </Button>
            </div>
          </Card>

          {/* Cards Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Card Title" subtitle="With subtitle">
              <p className="text-gray-600">
                This is a card with default padding and title.
              </p>
            </Card>

            <Card
              title="With Actions"
              actions={
                <Button size="sm" icon={<Plus className="w-4 h-4" />}>
                  Add
                </Button>
              }
            >
              <p className="text-gray-600">
                Cards can have action buttons in the header.
              </p>
            </Card>

            <Card padding="sm" border={true} shadow={true}>
              <p className="text-gray-600">
                No title, small padding, with border and shadow.
              </p>
            </Card>
          </div>

        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              icon={<Save className="w-4 h-4" />}
              onClick={() => setIsModalOpen(false)}
            >
              Save Changes
            </Button>
          </>
        }
      >
        <p className="text-gray-600">
          This is a modal dialog. It can contain any content and has a customizable footer.
          Click outside or press the X button to close.
        </p>
      </Modal>

      {/* Toast */}
      {showToast && (
        <Toast
          message="This is a success notification!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default ComponentDemo;
