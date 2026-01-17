// Mock API service to simulate fetching Nepali-style user data (in English)
export const mockUsers = {
  '1': {
    id: 1,
    name: 'Abhaya Bikram Shahi',
    email: 'abhayabikramshahiofficial@gmail.com',
    phone: '+977-9808370638',
    address: {
      street: '102 Kathmandu Road',
      city: 'Kalikot',
      state: 'Karnali',
      zip: '21300',
      country: 'Nepal'
    },
    company: 'Nepal Tech Pvt Ltd',
    position: 'Software Engineer',
    department: 'Engineering',
    startDate: '2022-04-15', // Gregorian date
    isActive: true,
    password: 'gopalsecret123', // Will be filtered out
    token: 'nepal123xyz', // Will be filtered out
    apiKey: 'nepal-api-key' // Will be filtered out
  },
  '2': {
    id: 2,
    name: 'Sita Sharma',
    email: 'sita.sharma@example.com',
    phone: '+977-9809876543',
    address: {
      street: '56 Pokhara Lane',
      city: 'Pokhara',
      state: 'Gandaki',
      zip: '33700',
      country: 'Nepal'
    },
    company: 'Gandaki Products',
    position: 'Product Manager',
    department: 'Product',
    startDate: '2021-08-20',
    isActive: true,
    password: 'sitasecret456', // Will be filtered out
    secret: 'confidential-info' // Will be filtered out
  },
  '3': {
    id: 3,
    name: 'Baburam Pun',
    email: 'baburam.pun@example.com',
    phone: '+977-9845551234',
    address: {
      street: '789 Bharatpur Road',
      city: 'Bharatpur',
      state: 'Bagmati',
      zip: '44100',
      country: 'Nepal'
    },
    company: 'Chitwan Design Studio',
    position: 'Designer',
    department: 'Design',
    startDate: '2023-06-10',
    isActive: true,
    cvv: '123', // Will be filtered out
    cardNumber: '4111-1111-1111-1111' // Will be filtered out
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
