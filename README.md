# 🏥 Wanterio - Complete Healthcare Platform

![Wanterio Logo](https://i.ibb.co.com/YSxRxVr/Picsart-25-09-19-17-01-04-788.jpg)

**Wanterio** is a comprehensive healthcare super-app that connects patients with doctors, pharmacies, clinics, emergency services, and more - all in one powerful platform.

## ✨ Features

### 🔐 **Authentication & User Management**
- Secure user registration and login with Supabase Auth
- Role-based access control (Patient, Doctor, Clinic, Driver, Admin, Moderator)
- Automatic user profile sync and management

### 💊 **Online Pharmacy**
- Browse extensive medicine catalog
- Real-time inventory management
- Shopping cart and order placement
- Order tracking and history
- Category-based medicine filtering

### 👨‍⚕️ **Doctor Services**
- Find qualified doctors by specialization
- View doctor profiles with ratings and reviews
- Book appointments with real-time availability
- Secure doctor-patient communication

### 🏥 **Medical Clinics**
- Discover nearby medical clinics
- View clinic services and operating hours
- Book clinic appointments
- Clinic profile management

### 🚑 **Emergency Services**
- 24/7 ambulance request system
- Real-time emergency dispatch
- GPS location tracking
- Emergency type classification

### 💬 **Secure Communication**
- End-to-end encrypted chat system
- Doctor-patient messaging
- Real-time message delivery
- Chat history and management

### 📊 **Role-Based Dashboards**
- **Patient Dashboard**: Appointments, orders, health records
- **Doctor Dashboard**: Patient management, schedule, earnings
- **Clinic Dashboard**: Appointment management, staff coordination
- **Driver Dashboard**: Emergency requests, route optimization
- **Admin Dashboard**: System management, user oversight
- **Moderator Dashboard**: Content moderation, review management

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+ with App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom healthcare theme
- **Authentication**: Supabase Auth with RLS policies
- **Database**: PostgreSQL with Row Level Security

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanterio.git
   cd wanterio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up Supabase database**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the SQL script from `supabase/apply-schema.sql`
   - Disable email confirmation in Authentication settings

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
wanterio/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Role-based dashboards
│   ├── pharmacy/          # Pharmacy features
│   ├── doctors/           # Doctor services
│   ├── clinics/           # Clinic services
│   ├── ambulance/         # Emergency services
│   └── ...
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...
├── lib/                  # Utility functions and configurations
│   ├── supabase/         # Supabase client setup
│   └── ...
├── providers/            # React context providers
├── supabase/            # Database migrations and schema
├── types/               # TypeScript type definitions
└── ...
```

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **Role-based permissions**: Granular access control by user role
- **Secure authentication**: Supabase Auth with JWT tokens
- **Data encryption**: All sensitive data encrypted at rest
- **HIPAA compliance ready**: Healthcare data protection standards

## 🎨 Design System

Wanterio uses a custom healthcare-focused design system with:
- **Primary Colors**: Blue theme matching the logo
- **Semantic Colors**: Role-specific color coding
- **Accessibility**: WCAG 2.1 AA compliant
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: System preference support

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📦 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the project
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@wanterio.com or join our Discord community.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the backend infrastructure
- [Next.js](https://nextjs.org) for the React framework
- [Tailwind CSS](https://tailwindcss.com) for styling
- [shadcn/ui](https://ui.shadcn.com) for UI components
- [Lucide](https://lucide.dev) for icons

---

**Made with ❤️ for better healthcare accessibility**