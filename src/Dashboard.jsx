import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId.trim()) {
      navigate(`/qrcode?userId=${encodeURIComponent(userId)}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white p-8 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-tight">QR Code Generator</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Professional QR code generation for secure user information sharing</p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter user ID (e.g., 1, 2, 3)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200"
                required
              />
            </div>
            <div className="self-end">
              <button
                type="submit"
                className="bg-gray-900 hover:bg-black text-white font-medium py-3 px-8 rounded-lg transition duration-200 whitespace-nowrap"
              >
                Generate QR
              </button>
            </div>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <span className="text-gray-700 font-medium">1</span>
              </div>
              <h3 className="font-semibold text-gray-900">Enter User ID</h3>
            </div>
            <p className="text-gray-600 text-sm">Input the user identifier to generate their QR code</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <span className="text-gray-700 font-medium">2</span>
              </div>
              <h3 className="font-semibold text-gray-900">Generate Code</h3>
            </div>
            <p className="text-gray-600 text-sm">Create a secure QR code with sanitized user data</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <span className="text-gray-700 font-medium">3</span>
              </div>
              <h3 className="font-semibold text-gray-900">Share Securely</h3>
            </div>
            <p className="text-gray-600 text-sm">Download or share the QR code for instant access</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center">About This System</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6 text-center">
              This enterprise-grade QR code generator creates secure, shareable codes containing user information
              while automatically filtering out sensitive data for privacy protection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-5 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Security Features</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Automatic sanitization of sensitive fields</li>
                  <li>• Encrypted data transmission</li>
                  <li>• Role-based access control</li>
                </ul>
              </div>
              <div className="p-5 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Key Benefits</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Instant QR code generation</li>
                  <li>• Cross-platform compatibility</li>
                  <li>• Professional quality output</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Founded by Abhaya Bikram Shahi</p>
      </footer>
    </div>
  );
};

export default Dashboard;