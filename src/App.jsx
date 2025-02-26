import React from 'react';
import './index.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

