import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const Module: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default Module;
