import React from 'react';
import AdminDashBoardNav from '../../components/AdminDashboardNav';
import AdminDashboardFixedLayout from '../../components/AdminDashboardFixedLayout';
import AdminDashboardMainLayout from '../../components/AdminDashboardMainLayout';

const AdminDashboard = () => {
  return (
    <div>
      <AdminDashBoardNav />
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <div style={{ flexBasis: "250px", flexShrink: 0 }}>
          <AdminDashboardFixedLayout />
        </div>
        <div style={{ flexGrow: 1, overflow: "auto" }}>
          <AdminDashboardMainLayout />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
