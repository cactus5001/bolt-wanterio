'use client'

import { useAuth } from '@/providers/auth-provider'
import { PageLoadingSpinner } from '@/components/loading-spinner'
import { Navbar } from '@/components/navbar'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Pill, 
  Stethoscope, 
  Building2, 
  Ambulance, 
  Calendar, 
  ShoppingBag,
  MessageCircle,
  User,
  Clock,
  Heart
} from 'lucide-react'

export default function PatientDashboard() {
  const { user, userRoles, loading } = useAuth()

  if (loading) {
    return <PageLoadingSpinner />
  }

  if (!user || !userRoles.includes('patient')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  const quickActions = [
    {
      title: 'Pharmacy',
      description: 'Browse medicines and place orders',
      icon: Pill,
      href: '/pharmacy',
      color: 'bg-green-50 text-green-600 border-green-200',
      hoverColor: 'hover:bg-green-100'
    },
    {
      title: 'Find Doctors',
      description: 'Book appointments with specialists',
      icon: Stethoscope,
      href: '/doctors',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      title: 'Medical Clinics',
      description: 'Visit nearby clinics and centers',
      icon: Building2,
      href: '/clinics',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      hoverColor: 'hover:bg-purple-100'
    },
    {
      title: 'Emergency Ambulance',
      description: 'Request immediate medical transport',
      icon: Ambulance,
      href: '/ambulance',
      color: 'bg-red-50 text-red-600 border-red-200',
      hoverColor: 'hover:bg-red-100'
    },
    {
      title: 'My Appointments',
      description: 'View and manage your appointments',
      icon: Calendar,
      href: '/appointments',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      hoverColor: 'hover:bg-indigo-100'
    },
    {
      title: 'Order History',
      description: 'Track your medicine orders',
      icon: ShoppingBag,
      href: '/orders',
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      hoverColor: 'hover:bg-orange-100'
    },
    {
      title: 'Messages',
      description: 'Chat with healthcare providers',
      icon: MessageCircle,
      href: '/chats',
      color: 'bg-teal-50 text-teal-600 border-teal-200',
      hoverColor: 'hover:bg-teal-100'
    },
    {
      title: 'Profile Settings',
      description: 'Update your personal information',
      icon: User,
      href: '/profile',
      color: 'bg-gray-50 text-gray-600 border-gray-200',
      hoverColor: 'hover:bg-gray-100'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <div className="container py-8">
        <BreadcrumbNav items={[
          { label: 'Patient Dashboard' }
        ]} />

        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.user_metadata?.full_name || 'Patient'}!</h1>
              <p className="text-muted-foreground">Your health is our priority. What can we help you with today?</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Upcoming Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Active Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Unread Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-sm text-muted-foreground">Emergency Support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <Card key={action.title} className={`${action.hoverColor} transition-colors cursor-pointer border-2 ${action.color.split(' ').slice(-1)[0]}`}>
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action.color}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={action.href}>
                      Access Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest healthcare interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Recent Activity</h3>
              <p className="text-muted-foreground mb-4">
                Start using our services to see your activity here
              </p>
              <Button asChild>
                <Link href="/pharmacy">Browse Pharmacy</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}