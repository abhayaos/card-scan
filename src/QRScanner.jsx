import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const QRScanner = () => {
  const [decodedData, setDecodedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get the QR code data from URL parameter
    const qrDataParam = searchParams.get('data');
    
    if (qrDataParam) {
      try {
        // Decode the URI-encoded string
        const decodedText = decodeURIComponent(qrDataParam);
        
        // Check if it's JSON format or plain text format
        if (decodedText.startsWith('{')) {
          // It's JSON format
          const userData = JSON.parse(decodedText);
          setDecodedData(userData);
        } else {
          // It's plain text format, parse it
          const parsedData = parsePlainTextQRData(decodedText);
          setDecodedData(parsedData);
        }
      } catch (error) {
        console.error('Error decoding QR data:', error);
        setDecodedData({ error: 'Invalid QR code data' });
      }
    } else {
      setDecodedData({ error: 'No QR data provided' });
    }
    
    setIsLoading(false);
  }, [searchParams]);
  
  // Function to parse plain text QR data into structured object
  const parsePlainTextQRData = (text) => {
    const lines = text.split('\n');
    const result = {};
    let currentObj = result;
    let currentPrefix = '';
    
    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      
      // Check if it's a section header (ends with colon)
      if (line.endsWith(':') && !line.includes(': ')) {
        continue; // Skip section headers
      }
      
      // Check if it's a field entry
      const colonIndex = line.indexOf(': ');
      if (colonIndex !== -1) {
        let key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 2).trim();
        
        // Convert key to camelCase
        key = key.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(/\s+/g, '');
        key = key.charAt(0).toLowerCase() + key.slice(1);
        
        // Try to parse as JSON if it looks like it could be
        if (value.startsWith('{') && value.endsWith('}')) {
          try {
            currentObj[key] = JSON.parse(value);
          } catch {
            currentObj[key] = value;
          }
        } else {
          // Convert to appropriate type
          if (value.toLowerCase() === 'true') value = true;
          else if (value.toLowerCase() === 'false') value = false;
          else if (!isNaN(value) && !isNaN(parseFloat(value))) value = parseFloat(value);
          
          currentObj[key] = value;
        }
      }
    }
    
    return result;
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
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            
            <div className="border-2 border-dashed border-green-300 rounded-lg p-6 mb-8 bg-green-50">
              <div className="flex items-center text-green-700 mb-2">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h2 className="text-xl font-semibold">QR Code Successfully Scanned</h2>
              </div>
              <p className="text-gray-700 text-base ml-8">
                The QR code has been successfully decoded. All user information is displayed below.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Profile Information
                  </h2>
                  <div className="space-y-5">
                    {decodedData.name && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Name</h3>
                        <p className="text-lg text-gray-900 font-medium">{decodedData.name}</p>
                      </div>
                    )}
                    {decodedData.email && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Email</h3>
                        <p className="text-base text-gray-900 break-all">{decodedData.email}</p>
                      </div>
                    )}
                    {decodedData.phone && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Phone</h3>
                        <p className="text-base text-gray-900">{decodedData.phone}</p>
                      </div>
                    )}
                    {decodedData.id && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">ID</h3>
                        <p className="text-base text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded inline-block">{decodedData.id}</p>
                      </div>
                    )}
                    {decodedData.isActive !== undefined && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Status</h3>
                        <p className={`text-base font-semibold ${decodedData.isActive ? 'text-green-600' : 'text-red-600'}`}>
                          {decodedData.isActive ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Work Information */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Work Information
                  </h2>
                  <div className="space-y-5">
                    {decodedData.company && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Company</h3>
                        <p className="text-base text-gray-900">{decodedData.company}</p>
                      </div>
                    )}
                    {decodedData.position && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Position</h3>
                        <p className="text-base text-gray-900">{decodedData.position}</p>
                      </div>
                    )}
                    {decodedData.department && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Department</h3>
                        <p className="text-base text-gray-900">{decodedData.department}</p>
                      </div>
                    )}
                    {decodedData.startDate && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Start Date</h3>
                        <p className="text-base text-gray-900">{decodedData.startDate}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Address Information */}
                {decodedData.address && (
                  <div className="md:col-span-2 bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      Address Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {decodedData.address.street && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Street</h3>
                          <p className="text-base text-gray-900">{decodedData.address.street}</p>
                        </div>
                      )}
                      {decodedData.address.city && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">City</h3>
                          <p className="text-base text-gray-900">{decodedData.address.city}</p>
                        </div>
                      )}
                      {decodedData.address.state && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">State</h3>
                          <p className="text-base text-gray-900">{decodedData.address.state}</p>
                        </div>
                      )}
                      {decodedData.address.zip && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">ZIP Code</h3>
                          <p className="text-base text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded inline-block">{decodedData.address.zip}</p>
                        </div>
                      )}
                      {decodedData.address.country && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Country</h3>
                          <p className="text-base text-gray-900">{decodedData.address.country}</p>
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
                <div key={key} className="mt-8 bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()} Information
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                      <p className="text-base text-gray-900">{String(value)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-sm">
            <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Security Notice
            </h3>
            <p className="text-blue-700 text-base leading-relaxed">
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