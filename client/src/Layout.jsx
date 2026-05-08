import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './auth/pages/Navbar';

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;