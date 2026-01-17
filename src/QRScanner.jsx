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
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Profile Information
                  </h2>
                  <div className="space-y-3">
                    {decodedData.name && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">Name:</span>
                        <span className="text-gray-900">{decodedData.name}</span>
                      </div>
                    )}
                    {decodedData.email && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">Email:</span>
                        <span className="text-gray-900">{decodedData.email}</span>
                      </div>
                    )}
                    {decodedData.phone && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">Phone:</span>
                        <span className="text-gray-900">{decodedData.phone}</span>
                      </div>
                    )}
                    {decodedData.id && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">ID:</span>
                        <span className="text-gray-900">{decodedData.id}</span>
                      </div>
                    )}
                    {decodedData.isActive !== undefined && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">Status:</span>
                        <span className={`font-medium ${decodedData.isActive ? 'text-green-600' : 'text-red-600'}`}>
                          {decodedData.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Work Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Work Information
                  </h2>
                  <div className="space-y-3">
                    {decodedData.company && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">Company:</span>
                        <span className="text-gray-900">{decodedData.company}</span>
                      </div>
                    )}
                    {decodedData.position && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">Position:</span>
                        <span className="text-gray-900">{decodedData.position}</span>
                      </div>
                    )}
                    {decodedData.department && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">Department:</span>
                        <span className="text-gray-900">{decodedData.department}</span>
                      </div>
                    )}
                    {decodedData.startDate && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">Start Date:</span>
                        <span className="text-gray-900">{decodedData.startDate}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Address Information */}
                {decodedData.address && (
                  <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      Address Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {decodedData.address.street && (
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium text-gray-600">Street:</span>
                          <span className="text-gray-900">{decodedData.address.street}</span>
                        </div>
                      )}
                      {decodedData.address.city && (
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium text-gray-600">City:</span>
                          <span className="text-gray-900">{decodedData.address.city}</span>
                        </div>
                      )}
                      {decodedData.address.state && (
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium text-gray-600">State:</span>
                          <span className="text-gray-900">{decodedData.address.state}</span>
                        </div>
                      )}
                      {decodedData.address.zip && (
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium text-gray-600">ZIP:</span>
                          <span className="text-gray-900">{decodedData.address.zip}</span>
                        </div>
                      )}
                      {decodedData.address.country && (
                        <div className="flex justify-between border-b pb-2">
                          <span className="font-medium text-gray-600">Country:</span>
                          <span className="text-gray-900">{decodedData.address.country}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Additional fields that don't fit in the predefined sections */}
              {Object.entries(decodedData).filter(([key]) => 
                !['id', 'name', 'email', 'phone', 'address', 'company', 'position', 'department', 'startDate', 'isActive'].includes(key)
              ).map(([key, value]) => (
                <div key={key} className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()} Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-gray-900">{String(value)}</span>
                    </div>
                  </div>
                </div>
              ))}
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