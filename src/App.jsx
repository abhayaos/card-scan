import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import QRCodeGenerator from './QRCodeGenerator';
import Dashboard from './Dashboard';
import QRScanner from './QRScanner';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-gray-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex space-x-4">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/qrcode" className="hover:underline">QR Code Generator</Link>
        </div>
      </nav>
      
      <main className="container mx-auto py-8 px-4 flex-grow">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/qrcode" element={<QRCodeGenerator />} />
          <Route path="/scan" element={<QRScanner />} />
        </Routes>
      </main>
      
      <footer className="py-4 text-center text-gray-600 text-sm bg-white border-t border-gray-200 mt-auto">
        <p>Founded by Abhaya Bikram Shahi</p>
      </footer>
    </div>
  );
}

export default App