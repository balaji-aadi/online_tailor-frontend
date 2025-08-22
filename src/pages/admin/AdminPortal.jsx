import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const AdminPortal = () => {
  return (
    <div className="flex bg-background overflow-hidden">
      {/* Sidebar Navigation */}
      <div className=" flex-shrink-0">
        <Navigation type="admin" />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="overflow-y-auto h-[100vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;