import React from 'react';
import clsx from 'clsx';

const RankingsTable = ({ rankings, highlightSchool = 'YOUR SCHOOL' }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                School Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rankings.map((school, idx) => {
              const isHighlighted = school.highlight || school.school_name === highlightSchool;

              return (
                <tr
                  key={idx}
                  className={clsx(
                    isHighlighted && 'bg-blue-50 border-l-4 border-l-blue-600'
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {school.rank <= 3 && (
                        <span className="mr-2">
                          {school.rank === 1 && '🥇'}
                          {school.rank === 2 && '🥈'}
                          {school.rank === 3 && '🥉'}
                        </span>
                      )}
                      <span className={clsx(
                        'text-sm font-medium',
                        isHighlighted ? 'text-blue-900' : 'text-gray-900'
                      )}>
                        {school.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {isHighlighted && (
                        <span className="mr-2">🏫</span>
                      )}
                      <span className={clsx(
                        'text-sm',
                        isHighlighted ? 'font-semibold text-blue-900' : 'text-gray-900'
                      )}>
                        {school.school_name}
                      </span>
                      {isHighlighted && (
                        <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs font-medium">
                          ⭐
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'text-sm font-medium',
                      isHighlighted ? 'text-blue-900' : 'text-gray-900'
                    )}>
                      {school.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                      school.grade === 'A+' && 'bg-green-100 text-green-800',
                      school.grade === 'A' && 'bg-green-100 text-green-800',
                      school.grade === 'B+' && 'bg-blue-100 text-blue-800',
                      school.grade === 'B' && 'bg-blue-100 text-blue-800',
                      school.grade === 'C+' && 'bg-yellow-100 text-yellow-800',
                      school.grade === 'C' && 'bg-yellow-100 text-yellow-800',
                      school.grade === 'D' && 'bg-orange-100 text-orange-800',
                      school.grade === 'F' && 'bg-red-100 text-red-800'
                    )}>
                      {school.grade}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingsTable;
