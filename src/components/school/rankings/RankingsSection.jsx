import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import RankCard from './RankCard';
import { schoolRankings } from '../../../data/schoolRankings';

const RankingsSection = () => {
  const navigate = useNavigate();
  const rankings = schoolRankings;

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Your School's Position</h2>
        <button
          onClick={() => navigate('/school/rankings')}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <span>View Detailed Rankings</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Region Rank */}
        <RankCard
          title="Region Rank"
          rank={rankings.rankings.region.rank}
          total={rankings.rankings.region.total_schools}
          percentileBand={rankings.rankings.region.percentile_band}
          average={rankings.rankings.region.regional_average}
          aboveAverageBy={rankings.rankings.region.above_average_by}
          subtitle={rankings.rankings.region.region_name}
        />

        {/* City Rank */}
        <RankCard
          title="City Rank"
          rank={rankings.rankings.city.rank}
          total={rankings.rankings.city.total_schools}
          percentileBand={rankings.rankings.city.percentile_band}
          average={rankings.rankings.city.city_average}
          aboveAverageBy={rankings.rankings.city.above_average_by}
          subtitle={rankings.rankings.city.city_name}
        />

        {/* School Type Rank */}
        <RankCard
          title="School Type Rank"
          rank={rankings.rankings.school_type.rank}
          total={rankings.rankings.school_type.total_schools}
          percentileBand={rankings.rankings.school_type.percentile_band}
          average={rankings.rankings.school_type.type_average}
          aboveAverageBy={rankings.rankings.school_type.above_average_by}
          subtitle={rankings.rankings.school_type.school_type}
        />

        {/* Year-over-Year */}
        <RankCard
          title="Year-over-Year"
          rank={rankings.current_evaluation.overall_score}
          total="100"
          percentileBand={rankings.year_over_year.trend}
          showTrend={true}
          trendData={{
            direction: rankings.year_over_year.change_direction,
            value: rankings.year_over_year.change_percentage,
            period: rankings.year_over_year.previous_cycle,
            label: `${rankings.year_over_year.previous_grade} → ${rankings.current_evaluation.overall_grade}`
          }}
          subtitle={`vs ${rankings.year_over_year.previous_cycle} (${rankings.year_over_year.previous_score}%)`}
        />
      </div>
    </div>
  );
};

export default RankingsSection;
