// layouts/AuthLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="auth-layout">


      <div className="auth-content">
        <Outlet />
      </div>

    </div>
  );
};

export default AuthLayout;