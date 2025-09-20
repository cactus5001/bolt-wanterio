'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { mockUsers, mockDoctors, mockClinics, User, Doctor, Clinic } from '@/lib/mock-data'
import { PageLoadingSpinner } from '@/components/loading-spinner'
import { Navbar } from '@/components/navbar'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, Stethoscope, Building2, Phone, User as UserIcon } from 'lucide-react'
import { toast } from 'sonner'

interface Appointment {
  id: string
  patient_id: string
  doctor_id?: string
  clinic_id?: string
  appointment_date: string
  appointment_time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  patient?: User
  doctor?: Doctor
  clinic?: Clinic
}

export default function AppointmentsPage() {
  const { user, userRoles, loading: authLoading } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadAppointments()
    }
  }, [user, userRoles])

  const loadAppointments = () => {
    // Simulate loading appointments
    setTimeout(() => {
      const mockAppointments: Appointment[] = []

      if (userRoles.includes('patient')) {
        mockAppointments.push(
          {
            id: 'apt1',
            patient_id: user!.id,
            doctor_id: 'doctor1',
            appointment_date: '2024-01-25',
            appointment_time: '10:00',
            status: 'confirmed',
            notes: 'Regular checkup',
            created_at: '2024-01-20T00:00:00Z',
            patient: mockUsers.find(u => u.id === user!.id),
            doctor: mockDoctors.find(d => d.user_id === 'doctor1')
          },
          {
            id: 'apt2',
            patient_id: user!.id,
            clinic_id: 'clinic1',
            appointment_date: '2024-01-28',
            appointment_time: '14:30',
            status: 'pending',
            notes: 'Blood test',
            created_at: '2024-01-22T00:00:00Z',
            patient: mockUsers.find(u => u.id === user!.id),
            clinic: mockClinics.find(c => c.user_id === 'clinic1')
          }
        )
      }

      if (userRoles.includes('doctor')) {
        mockAppointments.push(
          {
            id: 'apt3',
            patient_id: 'patient1',
            doctor_id: user!.id,
            appointment_date: '2024-01-25',
            appointment_time: '09:00',
            status: 'confirmed',
            notes: 'Follow-up consultation',
            created_at: '2024-01-20T00:00:00Z',
            patient: mockUsers.find(u => u.id === 'patient1'),
            doctor: mockDoctors.find(d => d.user_id === user!.id)
          },
          {
            id: 'apt4',
            patient_id: 'patient2',
            doctor_id: user!.id,
            appointment_date: '2024-01-26',
            appointment_time: '11:30',
            status: 'pending',
            notes: 'Initial consultation',
            created_at: '2024-01-23T00:00:00Z',
            patient: mockUsers.find(u => u.id === 'patient2'),
            doctor: mockDoctors.find(d => d.user_id === user!.id)
          }
        )
      }

      if (userRoles.includes('clinic')) {
        mockAppointments.push(
          {
            id: 'apt5',
            patient_id: 'patient1',
            clinic_id: user!.id,
            appointment_date: '2024-01-27',
            appointment_time: '15:00',
            status: 'confirmed',
            notes: 'Lab work',
            created_at: '2024-01-21T00:00:00Z',
            patient: mockUsers.find(u => u.id === 'patient1'),
            clinic: mockClinics.find(c => c.user_id === user!.id)
          }
        )
      }

      setAppointments(mockAppointments)
      setLoading(false)
    }, 500)
  }

  const updateAppointmentStatus = (appointmentId: string, newStatus: Appointment['status']) => {
    setAppointments(prev => prev.map(apt =>
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ))
    
    const statusMessages = {
      confirmed: 'Appointment confirmed',
      completed: 'Appointment marked as completed',
      cancelled: 'Appointment cancelled'
    }
    
    toast.success(statusMessages[newStatus] || 'Appointment updated')
  }

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  if (authLoading || loading) {
    return <PageLoadingSpinner />
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">Please login to view appointments.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />
      
      <div className="container py-8">
        <BreadcrumbNav items={[
          { label: 'My Appointments' }
        ]} />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">My Appointments</h1>
              <p className="text-muted-foreground">
                {userRoles.includes('patient') && 'View and manage your medical appointments'}
                {userRoles.includes('doctor') && 'Manage your patient appointments'}
                {userRoles.includes('clinic') && 'Manage your clinic appointments'}
              </p>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        {appointment.doctor_id ? (
                          <Stethoscope className="h-6 w-6 text-blue-600" />
                        ) : (
                          <Building2 className="h-6 w-6 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {appointment.doctor_id 
                            ? appointment.doctor?.user?.full_name 
                            : appointment.clinic?.name
                          }
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.doctor_id 
                            ? appointment.doctor?.specialization
                            : 'Medical Clinic'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(appointment.appointment_date)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formatTime(appointment.appointment_time)}</span>
                      </div>

                      {(userRoles.includes('doctor') || userRoles.includes('clinic')) && (
                        <div className="flex items-center space-x-2">
                          <UserIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{appointment.patient?.full_name}</span>
                        </div>
                      )}

                      {appointment.clinic && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate">{appointment.clinic.address}</span>
                        </div>
                      )}
                    </div>

                    {appointment.notes && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm"><strong>Notes:</strong> {appointment.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end space-y-3">
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>

                    {/* Action buttons based on user role and appointment status */}
                    <div className="flex space-x-2">
                      {userRoles.includes('patient') && appointment.status === 'confirmed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                        >
                          Cancel
                        </Button>
                      )}

                      {(userRoles.includes('doctor') || userRoles.includes('clinic')) && (
                        <>
                          {appointment.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                            >
                              Confirm
                            </Button>
                          )}
                          
                          {appointment.status === 'confirmed' && (
                            <Button
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                            >
                              Complete
                            </Button>
                          )}
                          
                          {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                            >
                              Cancel
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No appointments found</h3>
            <p className="text-muted-foreground mb-4">
              {userRoles.includes('patient') 
                ? "You don't have any appointments scheduled yet."
                : "No appointments scheduled with you yet."
              }
            </p>
            {userRoles.includes('patient') && (
              <div className="space-x-2">
                <Button asChild>
                  <a href="/doctors">Book with Doctor</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/clinics">Book with Clinic</a>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}