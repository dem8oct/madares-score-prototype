import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import KPICard from './KPICard';

const DeadlineCountdownCard = ({ data }) => {
  const { due_date, days_remaining, status } = data;

  // Determine color based on status/days remaining
  const getStatusColor = () => {
    if (days_remaining > 7) return { text: 'text-green-600', bg: 'bg-green-100', indicator: '🟢' };
    if (days_remaining >= 3) return { text: 'text-amber-600', bg: 'bg-amber-100', indicator: '🟡' };
    return { text: 'text-red-600', bg: 'bg-red-100', indicator: '🔴' };
  };

  const statusColors = getStatusColor();
  const formattedDate = format(parseISO(due_date), 'MMM dd, yyyy');
  const formattedTime = format(parseISO(due_date), 'hh:mm a');

  return (
    <KPICard title="Submission Deadline">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Clock Icon */}
        <div className={`flex items-center justify-center w-16 h-16 rounded-full ${statusColors.bg}`}>
          <Clock size={32} className={statusColors.text} />
        </div>

        {/* Days Remaining */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${statusColors.text}`}>
            {days_remaining}
          </div>
          <div className="text-lg font-medium text-gray-600">
            Days Remaining
          </div>
        </div>

        {/* Status Indicator */}
        <div className="text-2xl">
          {statusColors.indicator}
        </div>

        {/* Date and Time */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center space-x-1 text-sm font-semibold text-gray-900">
            <Calendar size={14} />
            <span>{formattedDate}</span>
          </div>
          <div className="text-xs text-gray-500">
            {formattedTime}
          </div>
        </div>
      </div>
    </KPICard>
  );
};

export default DeadlineCountdownCard;
