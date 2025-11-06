import React, { useState } from 'react';
import { MapPin, Building2, TrendingUp, AlertCircle } from 'lucide-react';
import { saudiRegions, getScoreColor } from '../../data/regionPerformance';

const SaudiArabiaMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const getRegionColor = (region) => {
    if (!region.avgScore) return '#e5e7eb';
    return getScoreColor(region.avgScore);
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region.id === selectedRegion?.id ? null : region);
  };

  const regionInfo = selectedRegion || hoveredRegion;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Visualization */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Interactive Regional Map</h2>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-6 text-sm">
          <span className="font-medium text-gray-700">Performance:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10b981' }}></div>
            <span>Excellent (≥85%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
            <span>Good (70-85%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f97316' }}></div>
            <span>Needs Improvement (60-70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }}></div>
            <span>Critical (&lt;60%)</span>
          </div>
        </div>

        {/* Regions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {saudiRegions
            .filter(region => region.schools > 0)
            .map((region) => (
              <button
                key={region.id}
                onClick={() => handleRegionClick(region)}
                onMouseEnter={() => setHoveredRegion(region)}
                onMouseLeave={() => setHoveredRegion(null)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRegion?.id === region.id
                    ? 'border-blue-500 shadow-lg scale-105'
                    : 'border-transparent hover:border-blue-300 hover:shadow-md'
                }`}
                style={{ backgroundColor: getRegionColor(region) }}
              >
                <div className="text-white">
                  <div className="font-bold text-sm mb-1">{region.name}</div>
                  <div className="text-xs opacity-90">{region.nameAr}</div>
                  <div className="mt-2 text-lg font-bold">{region.avgScore}%</div>
                  <div className="text-xs opacity-90">{region.schools} schools</div>
                </div>
              </button>
            ))}
        </div>

        {/* Info Box */}
        {regionInfo && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {regionInfo.name} ({regionInfo.nameAr})
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Schools:</span>
                    <span className="ml-2 font-semibold">{regionInfo.schools}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Avg Score:</span>
                    <span className="ml-2 font-semibold">{regionInfo.avgScore}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Compliance:</span>
                    <span className="ml-2 font-semibold">{regionInfo.compliance}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">At Risk:</span>
                    <span className="ml-2 font-semibold text-red-600">{regionInfo.atRisk}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Details Panel */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {selectedRegion ? 'Region Details' : 'Select a Region'}
        </h2>

        {selectedRegion ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Cities in {selectedRegion.name}</h3>
              <div className="space-y-2">
                {selectedRegion.cities.map((city) => (
                  <div
                    key={city.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">{city.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{city.avgScore}%</div>
                      <div className="text-xs text-gray-500">{city.schools} schools</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3">Key Metrics</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Total Schools</div>
                    <div className="text-lg font-bold text-gray-900">{selectedRegion.schools}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">Compliance Rate</div>
                    <div className="text-lg font-bold text-gray-900">{selectedRegion.compliance}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="text-sm text-gray-600">At-Risk Schools</div>
                    <div className="text-lg font-bold text-gray-900">{selectedRegion.atRisk}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              Click on a region to view detailed information and city-level breakdown
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaudiArabiaMap;
