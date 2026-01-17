import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import QRCodeGenerator from './QRCodeGenerator';
import Dashboard from './Dashboard';
import QRScanner from './QRScanner';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex space-x-4">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/qrcode" className="hover:underline">QR Code Generator</Link>
        </div>
      </nav>
      
      <main className="container mx-auto py-8 px-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/qrcode" element={<QRCodeGenerator />} />
          <Route path="/scan" element={<QRScanner />} />
        </Routes>
      </main>
    </div>
  );
}

export default App