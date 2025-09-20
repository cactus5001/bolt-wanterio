'use client'

import { useAuth } from '@/providers/auth-provider'
import { PageLoadingSpinner } from '@/components/loading-spinner'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Pill, 
  Stethoscope, 
  Building2, 
  Ambulance, 
  MessageCircle,
  Shield,
  Clock,
  Users,
  Heart
} from 'lucide-react'

export default function HomePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return <PageLoadingSpinner />
  }

  if (user) {
    return <PageLoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center mb-8">
            <Image 
              src="https://i.ibb.co.com/YSxRxVr/Picsart-25-09-19-17-01-04-788.jpg" 
              alt="Wanterio Logo" 
              width={120} 
              height={120} 
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Welcome to 
              <span className="text-primary block">Wanterio</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your complete healthcare companion - connecting you with doctors, pharmacies, clinics, emergency services, and more in one powerful platform.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything You Need for Better Health</h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive healthcare services at your fingertips
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Pill className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Online Pharmacy</CardTitle>
              <CardDescription>
                Order medicines online with fast delivery and competitive prices
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Stethoscope className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Expert Doctors</CardTitle>
              <CardDescription>
                Book appointments with qualified doctors across all specialties
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Medical Clinics</CardTitle>
              <CardDescription>
                Access to trusted clinics and specialized medical services
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Ambulance className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Emergency Services</CardTitle>
              <CardDescription>
                24/7 ambulance services with real-time tracking
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <CardTitle>Secure Chat</CardTitle>
              <CardDescription>
                Communicate securely with healthcare providers
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Secure & Private</CardTitle>
              <CardDescription>
                Your health data is protected with enterprise-grade security
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-primary-foreground/80">Happy Patients</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Stethoscope className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Qualified Doctors</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-primary-foreground/80">Emergency Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of users who trust our platform for their healthcare needs.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/auth/signup">Create Your Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/20">
        <div className="container text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-semibold">HealthCare App</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 HealthCare App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}