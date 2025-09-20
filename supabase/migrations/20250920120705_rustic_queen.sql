/*
  # Healthcare Super-App Database Schema

  1. New Tables
    - `users` - User profile data
    - `roles` - Available system roles
    - `user_roles` - User role assignments (many-to-many)
    - `doctors` - Doctor-specific information
    - `clinics` - Clinic-specific information
    - `medicines` - Pharmacy inventory
    - `orders` - Patient medicine orders
    - `order_items` - Individual items in orders
    - `appointments` - Medical appointments
    - `ambulance_requests` - Emergency ambulance requests
    - `chats` - Chat conversations between users
    - `messages` - Individual chat messages
    - `reviews` - Patient reviews for doctors/clinics

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for role-based access
    - Ensure data privacy and security compliance

  3. Indexes and Constraints
    - Foreign key constraints for data integrity
    - Indexes for performance optimization
    - Unique constraints where appropriate
*/

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- User roles (many-to-many relationship)
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('patient', 'doctor', 'clinic', 'driver', 'admin', 'super_admin', 'moderator')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  specialization text,
  experience_years integer DEFAULT 0,
  consultation_fee decimal(10,2) DEFAULT 0,
  bio text,
  availability_hours text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

-- Clinics table
CREATE TABLE IF NOT EXISTS clinics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  address text,
  phone text,
  services text,
  opening_hours text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;

-- Medicines table
CREATE TABLE IF NOT EXISTS medicines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL DEFAULT 0,
  stock_quantity integer NOT NULL DEFAULT 0,
  category text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_amount decimal(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  payment_method text DEFAULT 'cod',
  shipping_address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  medicine_id uuid NOT NULL REFERENCES medicines(id) ON DELETE RESTRICT,
  quantity integer NOT NULL DEFAULT 1,
  price decimal(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES users(id) ON DELETE SET NULL,
  clinic_id uuid REFERENCES users(id) ON DELETE SET NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT appointment_provider_check CHECK (
    (doctor_id IS NOT NULL AND clinic_id IS NULL) OR 
    (doctor_id IS NULL AND clinic_id IS NOT NULL)
  )
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Ambulance requests table
CREATE TABLE IF NOT EXISTS ambulance_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  driver_id uuid REFERENCES users(id) ON DELETE SET NULL,
  pickup_location text NOT NULL,
  destination text,
  emergency_type text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'en_route', 'arrived', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ambulance_requests ENABLE ROW LEVEL SECURITY;

-- Chats table
CREATE TABLE IF NOT EXISTS chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant1_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  participant2_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(participant1_id, participant2_id),
  CONSTRAINT different_participants CHECK (participant1_id != participant2_id)
);

ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id uuid NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES users(id) ON DELETE SET NULL,
  clinic_id uuid REFERENCES users(id) ON DELETE SET NULL,
  appointment_id uuid NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT review_provider_check CHECK (
    (doctor_id IS NOT NULL AND clinic_id IS NULL) OR 
    (doctor_id IS NULL AND clinic_id IS NOT NULL)
  ),
  UNIQUE(patient_id, appointment_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);
CREATE INDEX IF NOT EXISTS idx_doctors_user_id ON doctors(user_id);
CREATE INDEX IF NOT EXISTS idx_clinics_user_id ON clinics(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_clinic_id ON appointments(clinic_id);
CREATE INDEX IF NOT EXISTS idx_ambulance_requests_patient_id ON ambulance_requests(patient_id);
CREATE INDEX IF NOT EXISTS idx_ambulance_requests_driver_id ON ambulance_requests(driver_id);
CREATE INDEX IF NOT EXISTS idx_chats_participant1 ON chats(participant1_id);
CREATE INDEX IF NOT EXISTS idx_chats_participant2 ON chats(participant2_id);
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_reviews_doctor_id ON reviews(doctor_id);
CREATE INDEX IF NOT EXISTS idx_reviews_clinic_id ON reviews(clinic_id);

-- Row Level Security Policies

-- Users policies
CREATE POLICY "Users can read own data" ON users FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Admin can read all users" ON users FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- User roles policies
CREATE POLICY "Users can read own roles" ON user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admin can manage all roles" ON user_roles FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- Doctors policies
CREATE POLICY "Everyone can read doctors" ON doctors FOR SELECT TO authenticated USING (true);
CREATE POLICY "Doctors can update own profile" ON doctors FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admin can manage doctors" ON doctors FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- Clinics policies
CREATE POLICY "Everyone can read clinics" ON clinics FOR SELECT TO authenticated USING (true);
CREATE POLICY "Clinics can update own profile" ON clinics FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admin can manage clinics" ON clinics FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- Medicines policies
CREATE POLICY "Everyone can read medicines" ON medicines FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can manage medicines" ON medicines FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- Orders policies
CREATE POLICY "Users can read own orders" ON orders FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can create orders" ON orders FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admin can read all orders" ON orders FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- Order items policies
CREATE POLICY "Users can read own order items" ON order_items FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can create order items" ON order_items FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Appointments policies
CREATE POLICY "Patients can read own appointments" ON appointments FOR SELECT TO authenticated USING (patient_id = auth.uid());
CREATE POLICY "Doctors can read their appointments" ON appointments FOR SELECT TO authenticated USING (doctor_id = auth.uid());
CREATE POLICY "Clinics can read their appointments" ON appointments FOR SELECT TO authenticated USING (clinic_id = auth.uid());
CREATE POLICY "Patients can create appointments" ON appointments FOR INSERT TO authenticated WITH CHECK (patient_id = auth.uid());
CREATE POLICY "Doctors can update their appointments" ON appointments FOR UPDATE TO authenticated USING (doctor_id = auth.uid());
CREATE POLICY "Clinics can update their appointments" ON appointments FOR UPDATE TO authenticated USING (clinic_id = auth.uid());

-- Ambulance requests policies
CREATE POLICY "Patients can manage own requests" ON ambulance_requests FOR ALL TO authenticated USING (patient_id = auth.uid());
CREATE POLICY "Drivers can read assigned requests" ON ambulance_requests FOR SELECT TO authenticated USING (driver_id = auth.uid());
CREATE POLICY "Drivers can update assigned requests" ON ambulance_requests FOR UPDATE TO authenticated USING (driver_id = auth.uid());
CREATE POLICY "Admin can manage all requests" ON ambulance_requests FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- Chats policies
CREATE POLICY "Participants can read their chats" ON chats FOR SELECT TO authenticated USING (
  participant1_id = auth.uid() OR participant2_id = auth.uid()
);
CREATE POLICY "Users can create chats" ON chats FOR INSERT TO authenticated WITH CHECK (
  participant1_id = auth.uid() OR participant2_id = auth.uid()
);

-- Messages policies
CREATE POLICY "Chat participants can read messages" ON messages FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM chats 
    WHERE chats.id = messages.chat_id 
    AND (chats.participant1_id = auth.uid() OR chats.participant2_id = auth.uid())
  )
);
CREATE POLICY "Chat participants can send messages" ON messages FOR INSERT TO authenticated WITH CHECK (
  sender_id = auth.uid() AND EXISTS (
    SELECT 1 FROM chats 
    WHERE chats.id = messages.chat_id 
    AND (chats.participant1_id = auth.uid() OR chats.participant2_id = auth.uid())
  )
);

-- Reviews policies
CREATE POLICY "Everyone can read reviews" ON reviews FOR SELECT TO authenticated USING (true);
CREATE POLICY "Patients can create reviews for their appointments" ON reviews FOR INSERT TO authenticated WITH CHECK (
  patient_id = auth.uid() AND EXISTS (
    SELECT 1 FROM appointments 
    WHERE appointments.id = reviews.appointment_id 
    AND appointments.patient_id = auth.uid()
    AND appointments.status = 'completed'
  )
);
CREATE POLICY "Moderators can delete reviews" ON reviews FOR DELETE TO authenticated USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role IN ('moderator', 'admin', 'super_admin')
  )
);