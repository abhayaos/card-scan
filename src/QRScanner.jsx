import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const QRScanner = () => {
  const [decodedData, setDecodedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get the QR code data from URL parameter
    const qrData = searchParams.get('data');
    
    if (qrData) {
      try {
        // Decode the URI-encoded JSON string
        const decodedJson = decodeURIComponent(qrData);
        // Parse the JSON to get the user data
        const userData = JSON.parse(decodedJson);
        setDecodedData(userData);
      } catch (error) {
        console.error('Error decoding QR data:', error);
        setDecodedData({ error: 'Invalid QR code data' });
      }
    } else {
      setDecodedData({ error: 'No QR data provided' });
    }
    
    setIsLoading(false);
  }, [searchParams]);

  const renderDataField = (key, value, level = 0) => {
    const indentClass = level > 0 ? `ml-${level * 4}` : '';
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return (
        <div key={key} className={`${indentClass} mb-2`}>
          <h3 className="font-semibold text-gray-800 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
          <div className="ml-4 border-l-2 border-gray-200 pl-3">
            {Object.entries(value).map(([subKey, subValue]) => 
              renderDataField(subKey, subValue, level + 1)
            )}
          </div>
        </div>
      );
    } else if (Array.isArray(value)) {
      return (
        <div key={key} className={`${indentClass} mb-2`}>
          <h3 className="font-semibold text-gray-800 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
          <ul className="list-disc ml-5 text-gray-700">
            {value.map((item, index) => (
              <li key={index}>{typeof item === 'object' ? JSON.stringify(item) : String(item)}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div key={key} className={`${indentClass} mb-2 grid grid-cols-12 gap-2`}>
          <div className="col-span-4">
            <span className="font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
          </div>
          <div className="col-span-8">
            <span className="text-gray-900 break-words">
              {String(value)}
            </span>
          </div>
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 text-lg">Processing QR code data...</p>
        </div>
      </div>
    );
  }

  if (decodedData?.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-center justify-center">
              <svg className="h-5 w-5 text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 font-medium">Error Processing QR Code</span>
            </div>
          </div>
          <p className="text-gray-700 mb-6">{decodedData.error}</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Scanned QR Code Information
              </h1>
              <button 
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back
              </button>
            </div>
            
            <div className="border-2 border-dashed border-green-300 rounded-lg p-6 mb-6 bg-green-50">
              <div className="flex items-center text-green-700 mb-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="font-medium">QR Code Successfully Scanned</span>
              </div>
              <p className="text-gray-600 text-sm">
                The QR code has been successfully decoded. All user information is displayed below.
              </p>
            </div>
            
            <div className="space-y-6">
              {Object.entries(decodedData).map(([key, value]) => 
                renderDataField(key, value)
              )}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Security Notice
            </h3>
            <p className="text-blue-700 text-sm">
              This QR code contains sanitized user information with sensitive data filtered out. 
              Passwords, tokens, API keys, and other sensitive information are not included in the QR code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;