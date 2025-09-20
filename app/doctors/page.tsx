'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { supabase } from '@/lib/supabase/client'
import { PageLoadingSpinner } from '@/components/loading-spinner'
import { Navbar } from '@/components/navbar'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Stethoscope, Search, Calendar, Star, Clock, DollarSign } from 'lucide-react'
import { toast } from 'sonner'

interface Doctor {
  id: string
  user_id: string
  specialization?: string
  experience_years?: number
  consultation_fee?: number
  bio?: string
  availability_hours?: string
  created_at: string
  updated_at: string
  users?: {
    id: string
    full_name?: string
    email: string
  }
}

export default function DoctorsPage() {
  const { user, loading: authLoading } = useAuth()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadDoctors()
  }, [])

  const loadDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          users (
            id,
            full_name,
            email
          )
        `)
        .order('created_at')

      if (error) {
        console.error('Error loading doctors:', error)
        toast.error('Failed to load doctors')
      } else {
        setDoctors(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load doctors')
    } finally {
      setLoading(false)
    }
  }

  const bookAppointment = async (doctor: Doctor) => {
    if (!user) {
      toast.error('Please login to book an appointment')
      return
    }

    try {
      // Create appointment for tomorrow at 10:00 AM (you can add date/time picker later)
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      
      const { error } = await supabase
        .from('appointments')
        .insert({
          patient_id: user.id,
          doctor_id: doctor.user_id,
          appointment_date: tomorrow.toISOString().split('T')[0],
          appointment_time: '10:00',
          status: 'pending',
          notes: 'General consultation'
        })

      if (error) throw error

      toast.success(`Appointment request sent to ${doctor.users?.full_name}. You will receive a confirmation shortly.`)
    } catch (error) {
      console.error('Error booking appointment:', error)
      toast.error('Failed to book appointment. Please try again.')
    }
  }

  const filteredDoctors = doctors.filter(doctor =>
    doctor.users?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (authLoading || loading) {
    return <PageLoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <div className="container py-8">
        <BreadcrumbNav items={[
          { label: 'Find Doctors' }
        ]} />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Find Doctors</h1>
              <p className="text-muted-foreground">Book appointments with qualified specialists</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors or specializations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-center">{doctor.user?.full_name}</CardTitle>
                <CardDescription className="text-center">
                  {doctor.specialization}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{doctor.experience_years} years exp.</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>${doctor.consultation_fee}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.8 (124 reviews)</span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {doctor.bio}
                  </p>

                  <div className="text-sm">
                    <span className="font-medium">Available:</span>
                    <p className="text-muted-foreground">{doctor.availability_hours}</p>
                  </div>

                  <Button 
                    onClick={() => bookAppointment(doctor)}
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

        {filteredDoctors.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No doctors found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms
            </p>
          </div>
        )}
      </div>
    </div>
  )
}