import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useSearchParams } from 'react-router-dom';
import { fetchUserById } from './mockAPI';

const QRCodeGenerator = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  
  const userId = searchParams.get('userId') || '1';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Using mock API service
        const data = await fetchUserById(userId);
        
        // Filter out sensitive information before encoding
        const sanitizedData = sanitizeUserData(data);
        setUserData(sanitizedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message || 'An error occurred while fetching user data');
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Function to remove sensitive information from user data
  const sanitizeUserData = (data) => {
    const sanitized = { ...data };
    
    // Remove sensitive fields
    const sensitiveFields = ['password', 'token', 'authToken', 'apiKey', 'secret', 'cvv', 'cardNumber'];
    sensitiveFields.forEach(field => {
      if (sanitized[field]) {
        delete sanitized[field];
      }
    });

    // If there are nested objects with sensitive data, sanitize those too
    Object.keys(sanitized).forEach(key => {
      if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
        sanitized[key] = sanitizeUserData(sanitized[key]);
      }
    });

    return sanitized;
  };

  // Function to download QR code as image
  const downloadQRCode = () => {
    const canvas = document.getElementById('qrcode-canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `user-${userId}-qrcode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  // Function to copy the scan URL to clipboard
  const copyScanUrl = () => {
    const scanUrl = `${window.location.origin}/scan?data=${encodeURIComponent(JSON.stringify(userData))}`;
    navigator.clipboard.writeText(scanUrl);
    alert('Scan URL copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <span className="font-medium">Error:</span> {error}
              </p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                No user data available
              </p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  // Convert user data to JSON string for QR code
  const qrData = JSON.stringify(userData, null, 2);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">User QR Code</h2>
        <p className="text-gray-600 mb-6">QR code containing sanitized user information</p>
        
        <div className="flex flex-col items-center">
          <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200 mb-6">
            <QRCodeCanvas
              id="qrcode-canvas"
              value={qrData}
              size={256}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin={true}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <button 
              onClick={downloadQRCode} 
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition duration-200 flex items-center justify-center flex-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download QR Code
            </button>
            <button 
              onClick={copyScanUrl} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-200 flex items-center justify-center flex-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Copy Scan URL
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          User Data in QR Code:
        </h3>
        <div className="bg-white p-4 rounded-md overflow-x-auto max-h-60 overflow-y-auto">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">{JSON.stringify(userData, null, 2)}</pre>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
        <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          How to Scan This QR Code
        </h3>
        <ol className="list-decimal list-inside text-blue-700 text-sm space-y-1">
          <li>Take a photo of this QR code with your smartphone camera</li>
          <li>Or use a QR code scanner app to scan this code</li>
          <li>The app will direct you to a page showing all user information</li>
          <li>Alternatively, copy the scan URL and paste it in a browser</li>
        </ol>
      </div>
      
      <div className="mt-6 text-center">
        <a href="/" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Dashboard
        </a>
      </div>
    </div>
  );
};

export default QRCodeGenerator;