'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { mockClinics, Clinic } from '@/lib/mock-data'
import { PageLoadingSpinner } from '@/components/loading-spinner'
import { Navbar } from '@/components/navbar'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Building2, Search, Calendar, Star, Clock, Phone, MapPin } from 'lucide-react'
import { toast } from 'sonner'

export default function ClinicsPage() {
  const { user, loading: authLoading } = useAuth()
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Simulate loading clinics
    setTimeout(() => {
      setClinics(mockClinics)
      setLoading(false)
    }, 500)
  }, [])

  const bookAppointment = (clinic: Clinic) => {
    if (!user) {
      toast.error('Please login to book an appointment')
      return
    }

    // Simulate booking
    toast.success(`Appointment request sent to ${clinic.name}. You will receive a confirmation shortly.`)
  }

  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.services?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.address?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (authLoading || loading) {
    return <PageLoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      
      <div className="container py-8">
        <BreadcrumbNav items={[
          { label: 'Medical Clinics' }
        ]} />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Medical Clinics</h1>
              <p className="text-muted-foreground">Find trusted clinics and specialized medical services</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clinics, services, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Clinics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredClinics.map((clinic) => (
            <Card key={clinic.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-10 w-10 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-center">{clinic.name}</CardTitle>
                <CardDescription className="text-center">
                  Medical Center
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{clinic.address}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{clinic.phone}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.6 (89 reviews)</span>
                  </div>

                  <div>
                    <span className="font-medium text-sm">Services:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {clinic.services?.split(', ').map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Hours:</span>
                    </div>
                    <p className="text-muted-foreground text-xs">{clinic.opening_hours}</p>
                  </div>

                  <Button 
                    onClick={() => bookAppointment(clinic)}
                    className="w-full"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClinics.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No clinics found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms
            </p>
          </div>
        )}
      </div>
    </div>
  )
}