// Mock API service to simulate fetching user data
export const mockUsers = {
  '1': {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-234-567-8900',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA'
    },
    company: 'ABC Corp',
    position: 'Software Engineer',
    department: 'Engineering',
    startDate: '2022-01-15',
    isActive: true,
    password: 'supersecret123', // This will be filtered out
    token: 'abc123xyz', // This will be filtered out
    apiKey: 'secret-api-key' // This will be filtered out
  },
  '2': {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1-987-654-3210',
    address: {
      street: '456 Oak Ave',
      city: 'Somewhere',
      state: 'NY',
      zip: '54321',
      country: 'USA'
    },
    company: 'XYZ Inc',
    position: 'Product Manager',
    department: 'Product',
    startDate: '2021-05-20',
    isActive: true,
    password: 'anotherSecret456', // This will be filtered out
    secret: 'confidential-info' // This will be filtered out
  },
  '3': {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1-555-123-4567',
    address: {
      street: '789 Pine Rd',
      city: 'Elsewhere',
      state: 'TX',
      zip: '98765',
      country: 'USA'
    },
    company: 'DEF Ltd',
    position: 'Designer',
    department: 'Design',
    startDate: '2023-03-10',
    isActive: true,
    cvv: '123', // This will be filtered out
    cardNumber: '4111-1111-1111-1111' // This will be filtered out
  }
};

export const fetchUserById = async (userId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const user = mockUsers[userId];
  
  if (!user) {
    const error = new Error(`User with ID ${userId} not found`);
    error.status = 404;
    throw error;
  }
  
  return user;
};