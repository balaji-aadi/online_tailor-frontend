import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const TailorPortal = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <div className="flex-shrink-0">
        <Navigation type="tailor" />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TailorPortal;