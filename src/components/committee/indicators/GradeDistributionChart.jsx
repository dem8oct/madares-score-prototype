import React from 'react';

const GradeDistributionChart = ({ gradeDistribution }) => {
  if (!gradeDistribution) return null;

  const grades = [
    { grade: 'A+', count: gradeDistribution['A+'] || 0, color: '#10b981', emoji: '🟢' },
    { grade: 'A', count: gradeDistribution['A'] || 0, color: '#10b981', emoji: '🟢' },
    { grade: 'B+', count: gradeDistribution['B+'] || 0, color: '#84cc16', emoji: '🟡' },
    { grade: 'B', count: gradeDistribution['B'] || 0, color: '#84cc16', emoji: '🟡' },
    { grade: 'C+', count: gradeDistribution['C+'] || 0, color: '#f59e0b', emoji: '🟠' },
    { grade: 'C', count: gradeDistribution['C'] || 0, color: '#f59e0b', emoji: '🟠' },
    { grade: 'D', count: gradeDistribution['D'] || 0, color: '#ef4444', emoji: '🔴' },
    { grade: 'F', count: gradeDistribution['F'] || 0, color: '#dc2626', emoji: '🔴' }
  ];

  const total = grades.reduce((sum, g) => sum + g.count, 0);

  const getEmojiBar = (count, maxCount) => {
    const maxEmojis = 20;
    const emojiCount = Math.ceil((count / maxCount) * maxEmojis);
    return emojiCount;
  };

  const maxCount = Math.max(...grades.map(g => g.count));

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-4">Grade Distribution</h3>
      <div className="space-y-3">
        {grades.map((gradeItem) => {
          const percentage = ((gradeItem.count / total) * 100).toFixed(1);
          const emojiBarLength = getEmojiBar(gradeItem.count, maxCount);

          return (
            <div key={gradeItem.grade} className="flex items-center gap-3">
              <div className="w-8 text-sm font-semibold text-gray-700">
                {gradeItem.grade}:
              </div>
              <div className="w-24 text-sm text-gray-600">
                {gradeItem.count} schools
              </div>
              <div className="w-16 text-sm text-gray-500">
                ({percentage}%)
              </div>
              <div className="flex-1 text-xl leading-none">
                {gradeItem.emoji.repeat(emojiBarLength)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GradeDistributionChart;
