export type UserRole = 'patient' | 'doctor' | 'clinic' | 'driver' | 'admin' | 'super_admin' | 'moderator'

export interface User {
  id: string
  email: string
  full_name?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface UserRoles {
  id: string
  user_id: string
  role: UserRole
  created_at: string
}

export interface Doctor {
  id: string
  user_id: string
  specialization?: string
  experience_years?: number
  consultation_fee?: number
  bio?: string
  availability_hours?: string
  created_at: string
  updated_at: string
  user?: User
}

export interface Clinic {
  id: string
  user_id: string
  name: string
  address?: string
  phone?: string
  services?: string
  opening_hours?: string
  created_at: string
  updated_at: string
  user?: User
}

export interface Medicine {
  id: string
  name: string
  description?: string
  price: number
  stock_quantity: number
  category?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  payment_method?: string
  shipping_address?: string
  created_at: string
  updated_at: string
  user?: User
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  medicine_id: string
  quantity: number
  price: number
  created_at: string
  medicine?: Medicine
}

export interface Appointment {
  id: string
  patient_id: string
  doctor_id?: string
  clinic_id?: string
  appointment_date: string
  appointment_time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
  patient?: User
  doctor?: Doctor
  clinic?: Clinic
}

export interface AmbulanceRequest {
  id: string
  patient_id: string
  driver_id?: string
  pickup_location: string
  destination?: string
  emergency_type?: string
  status: 'pending' | 'assigned' | 'en_route' | 'arrived' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
  patient?: User
  driver?: User
}

export interface Chat {
  id: string
  participant1_id: string
  participant2_id: string
  created_at: string
  updated_at: string
  participant1?: User
  participant2?: User
  messages?: Message[]
}

export interface Message {
  id: string
  chat_id: string
  sender_id: string
  content: string
  created_at: string
  sender?: User
}

export interface Review {
  id: string
  patient_id: string
  doctor_id?: string
  clinic_id?: string
  appointment_id: string
  rating: number
  comment?: string
  created_at: string
  updated_at: string
  patient?: User
  doctor?: Doctor
  clinic?: Clinic
}