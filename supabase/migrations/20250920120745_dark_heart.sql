/*
  # Seed Data for Healthcare Super-App

  1. Insert sample medicines for pharmacy
  2. Create test user accounts with appropriate roles
  3. Add sample doctor and clinic profiles
  4. Insert sample appointments and orders for testing
*/

-- Insert sample medicines
INSERT INTO medicines (name, description, price, stock_quantity, category, image_url) VALUES
  ('Paracetamol 500mg', 'Pain relief and fever reducer. Safe for adults and children over 12.', 12.50, 100, 'Pain Relief', 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg'),
  ('Amoxicillin 250mg', 'Antibiotic for bacterial infections. Prescription required.', 25.00, 50, 'Antibiotics', 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg'),
  ('Cetirizine 10mg', 'Antihistamine for allergies and hay fever relief.', 8.75, 80, 'Allergy', 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg'),
  ('Ibuprofen 400mg', 'Anti-inflammatory pain relief for muscle and joint pain.', 15.30, 75, 'Pain Relief', 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg'),
  ('Vitamin C 1000mg', 'Immune system support with high-strength vitamin C tablets.', 18.90, 120, 'Vitamins', 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg');

-- Note: Test users will be created through the authentication system
-- The following would normally be handled by triggers or the application:

-- Sample doctor profiles (to be created after user registration)
-- These are examples of what would be inserted when doctors register

/*
Example doctor inserts (will be done programmatically):
INSERT INTO doctors (user_id, specialization, experience_years, consultation_fee, bio, availability_hours) VALUES
  ('doctor1-uuid', 'General Medicine', 8, 75.00, 'Experienced general practitioner specializing in family medicine and preventive care.', 'Mon-Fri: 9AM-5PM'),
  ('doctor2-uuid', 'Cardiology', 12, 150.00, 'Board-certified cardiologist with expertise in heart disease prevention and treatment.', 'Mon-Wed-Fri: 10AM-4PM');
*/

/*
Example clinic profiles (will be done programmatically):
INSERT INTO clinics (user_id, name, address, phone, services, opening_hours) VALUES
  ('clinic1-uuid', 'City Medical Center', '123 Healthcare Ave, Medical District', '+1-234-567-8900', 'General Medicine, Diagnostics, Lab Services', 'Mon-Sat: 8AM-8PM, Sun: 10AM-6PM'),
  ('clinic2-uuid', 'Family Health Clinic', '456 Wellness St, Downtown', '+1-234-567-8901', 'Family Medicine, Pediatrics, Women Health', 'Mon-Fri: 9AM-6PM, Sat: 9AM-2PM');
*/

-- Create indexes for better performance on frequently queried columns
CREATE INDEX IF NOT EXISTS idx_medicines_category ON medicines(category);
CREATE INDEX IF NOT EXISTS idx_medicines_name ON medicines USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_ambulance_requests_status ON ambulance_requests(status);

-- Update function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_clinics_updated_at BEFORE UPDATE ON clinics FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_medicines_updated_at BEFORE UPDATE ON medicines FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_ambulance_requests_updated_at BEFORE UPDATE ON ambulance_requests FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_chats_updated_at BEFORE UPDATE ON chats FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();