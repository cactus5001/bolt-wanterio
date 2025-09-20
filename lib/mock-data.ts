// Mock data for development when database is not set up
export const mockMedicines = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    description: 'Pain relief and fever reducer. Safe for adults and children over 12.',
    price: 12.50,
    stock_quantity: 100,
    category: 'Pain Relief',
    image_url: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    description: 'Antibiotic for bacterial infections. Prescription required.',
    price: 25.00,
    stock_quantity: 50,
    category: 'Antibiotics',
    image_url: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Cetirizine 10mg',
    description: 'Antihistamine for allergies and hay fever relief.',
    price: 8.75,
    stock_quantity: 80,
    category: 'Allergy',
    image_url: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Ibuprofen 400mg',
    description: 'Anti-inflammatory pain relief for muscle and joint pain.',
    price: 15.30,
    stock_quantity: 75,
    category: 'Pain Relief',
    image_url: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Vitamin C 1000mg',
    description: 'Immune system support with high-strength vitamin C tablets.',
    price: 18.90,
    stock_quantity: 120,
    category: 'Vitamins',
    image_url: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Aspirin 325mg',
    description: 'Pain reliever and blood thinner. Consult doctor for regular use.',
    price: 9.99,
    stock_quantity: 90,
    category: 'Pain Relief',
    image_url: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Omeprazole 20mg',
    description: 'Proton pump inhibitor for acid reflux and heartburn.',
    price: 22.50,
    stock_quantity: 60,
    category: 'Digestive',
    image_url: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Loratadine 10mg',
    description: 'Non-drowsy antihistamine for seasonal allergies.',
    price: 11.25,
    stock_quantity: 85,
    category: 'Allergy',
    image_url: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const mockDoctors = [
  {
    id: '1',
    user_id: 'mock-doctor-1',
    full_name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    experience_years: 12,
    consultation_fee: 150.00,
    bio: 'Experienced cardiologist specializing in heart disease prevention and treatment.',
    availability_hours: 'Mon-Fri 9AM-5PM',
    rating: 4.8,
    total_reviews: 156
  },
  {
    id: '2',
    user_id: 'mock-doctor-2',
    full_name: 'Dr. Michael Chen',
    specialization: 'Pediatrics',
    experience_years: 8,
    consultation_fee: 120.00,
    bio: 'Pediatric specialist with expertise in child healthcare and development.',
    availability_hours: 'Mon-Sat 8AM-6PM',
    rating: 4.9,
    total_reviews: 203
  },
  {
    id: '3',
    user_id: 'mock-doctor-3',
    full_name: 'Dr. Emily Rodriguez',
    specialization: 'Dermatology',
    experience_years: 15,
    consultation_fee: 180.00,
    bio: 'Board-certified dermatologist specializing in skin conditions and cosmetic procedures.',
    availability_hours: 'Tue-Sat 10AM-4PM',
    rating: 4.7,
    total_reviews: 89
  }
]

export const mockClinics = [
  {
    id: '1',
    user_id: 'mock-clinic-1',
    name: 'City Medical Center',
    address: '123 Main Street, Downtown',
    phone: '+1 (555) 123-4567',
    services: 'General Medicine, Emergency Care, Laboratory Services',
    opening_hours: '24/7 Emergency, Clinic: Mon-Fri 8AM-8PM',
    rating: 4.6,
    total_reviews: 342
  },
  {
    id: '2',
    user_id: 'mock-clinic-2',
    name: 'Family Health Clinic',
    address: '456 Oak Avenue, Suburbs',
    phone: '+1 (555) 987-6543',
    services: 'Family Medicine, Pediatrics, Women\'s Health',
    opening_hours: 'Mon-Sat 9AM-6PM',
    rating: 4.8,
    total_reviews: 178
  }
]