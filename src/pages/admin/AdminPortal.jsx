import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const AdminPortal = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <div className="w-64 flex-shrink-0">
        <Navigation type="admin" />
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

export default AdminPortal;