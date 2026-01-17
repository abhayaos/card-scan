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
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">User Dashboard</h1>
        <p className="text-gray-600 mb-6">Generate QR codes for user information</p>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-grow">
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                Enter User ID
              </label>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter user ID to generate QR code"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mt-4 md:mt-0">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
              >
                Generate QR Code
              </button>
            </div>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2">Step 1</h3>
            <p className="text-gray-700">Enter a user ID in the form above</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="font-semibold text-green-800 mb-2">Step 2</h3>
            <p className="text-gray-700">Click "Generate QR Code"</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="font-semibold text-purple-800 mb-2">Step 3</h3>
            <p className="text-gray-700">View and download the QR code</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">About QR Code Generation</h2>
        <p className="text-gray-600 mb-3">
          This application generates QR codes containing user information. The QR code contains
          sanitized user data with sensitive information removed.
        </p>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li>Sensitive data like passwords and API keys are automatically filtered out</li>
          <li>User data is fetched from the API endpoint and encoded as JSON in the QR code</li>
          <li>You can download the generated QR code as an image</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;