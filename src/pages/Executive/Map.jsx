import React from 'react';
import SaudiArabiaMap from '../../components/executive/SaudiArabiaMap';

const InteractiveMap = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Interactive Performance Map
          </h1>
          <p className="text-gray-600">
            Geographic visualization of school performance across Saudi Arabia
          </p>
        </div>

        {/* Map Component */}
        <SaudiArabiaMap />
      </div>
    </div>
  );
};

export default InteractiveMap;
