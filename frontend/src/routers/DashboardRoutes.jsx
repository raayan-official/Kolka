import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import ManageProducts from '../pages/dashboard/admin/ManageProducts';
import ManageOrders from '../pages/dashboard/admin/ManageOrders';
import AddNewPost from '../pages/dashboard/admin/AddNewPost';

import UserDashboard from '../pages/dashboard/user/UserDashboard';
import Profile from '../pages/dashboard/user/Profile';
import Orders from '../pages/dashboard/user/Orders';
import Payments from '../pages/dashboard/user/Payments';

const DashboardRoutes = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      {/* Admin Dashboard Routes */}
      {user?.role === 'admin' && (
        <>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="admin/manage-products" element={<ManageProducts />} />
          <Route path="admin/manage-orders" element={<ManageOrders />} />
          <Route path="admin/add-new-post" element={<AddNewPost />} />
        </>
      )}

      {/* User Dashboard Routes */}
      <Route path="/" element={<UserDashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="orders" element={<Orders />} />
      <Route path="payments" element={<Payments />} />
    </Routes>
  );
};

export default DashboardRoutes;
