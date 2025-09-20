'use client'

import { useState } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { PageLoadingSpinner } from '@/components/loading-spinner'
import { Navbar } from '@/components/navbar'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Ambulance, MapPin, Phone, Clock, AlertTriangle, Navigation } from 'lucide-react'
import { toast } from 'sonner'

export default function AmbulancePage() {
  const { user, loading: authLoading } = useAuth()
  const [formData, setFormData] = useState({
    pickupLocation: '',
    destination: '',
    emergencyType: '',
    additionalNotes: ''
  })
  const [requesting, setRequesting] = useState(false)
  const [activeRequest, setActiveRequest] = useState<any>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleEmergencyRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error('Please login to request ambulance service')
      return
    }

    if (!formData.pickupLocation) {
      toast.error('Please provide pickup location')
      return
    }

    setRequesting(true)

    // Simulate emergency request
    setTimeout(() => {
      const request = {
        id: `req_${Date.now()}`,
        status: 'pending',
        pickupLocation: formData.pickupLocation,
        destination: formData.destination,
        emergencyType: formData.emergencyType,
        estimatedArrival: '8-12 minutes',
        ambulanceId: 'AMB-001',
        driverName: 'Robert Driver',
        driverPhone: '+1-234-567-8907'
      }

      setActiveRequest(request)
      setRequesting(false)
      toast.success('Emergency request submitted! Ambulance is being dispatched.')

      // Simulate status updates
      setTimeout(() => {
        setActiveRequest((prev: any) => ({ ...prev, status: 'assigned' }))
        toast.info('Ambulance assigned and en route to your location')
      }, 3000)
    }, 2000)
  }

  const cancelRequest = () => {
    setActiveRequest(null)
    setFormData({
      pickupLocation: '',
      destination: '',
      emergencyType: '',
      additionalNotes: ''
    })
    toast.info('Emergency request cancelled')
  }

  if (authLoading) {
    return <PageLoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Navbar />
      
      <div className="container py-8">
        <BreadcrumbNav items={[
          { label: 'Emergency Ambulance' }
        ]} />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Ambulance className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Emergency Ambulance</h1>
              <p className="text-muted-foreground">24/7 emergency medical transport service</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
              Service Available
            </Badge>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              <Clock className="h-3 w-3 mr-1" />
              Avg Response: 8-12 min
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Request Form */}
          {!activeRequest ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span>Request Emergency Ambulance</span>
                </CardTitle>
                <CardDescription>
                  Fill out the form below for immediate medical transport
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmergencyRequest} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupLocation">Pickup Location *</Label>
                    <Input
                      id="pickupLocation"
                      name="pickupLocation"
                      placeholder="Enter your current location"
                      value={formData.pickupLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination Hospital</Label>
                    <Input
                      id="destination"
                      name="destination"
                      placeholder="Preferred hospital (optional)"
                      value={formData.destination}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyType">Emergency Type</Label>
                    <Input
                      id="emergencyType"
                      name="emergencyType"
                      placeholder="e.g., Heart attack, Accident, etc."
                      value={formData.emergencyType}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      placeholder="Any additional information for the medical team"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={requesting}
                  >
                    {requesting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Requesting Ambulance...
                      </>
                    ) : (
                      <>
                        <Ambulance className="h-4 w-4 mr-2" />
                        Request Emergency Ambulance
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            /* Active Request Status */
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Ambulance className="h-5 w-5 text-red-600" />
                  <span>Active Emergency Request</span>
                </CardTitle>
                <CardDescription>
                  Request ID: {activeRequest.id}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status:</span>
                    <Badge 
                      variant={activeRequest.status === 'pending' ? 'secondary' : 'default'}
                      className={activeRequest.status === 'assigned' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {activeRequest.status === 'pending' && 'Finding Ambulance'}
                      {activeRequest.status === 'assigned' && 'Ambulance Assigned'}
                      {activeRequest.status === 'en_route' && 'En Route'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Estimated Arrival:</span>
                    <span className="text-red-600 font-semibold">{activeRequest.estimatedArrival}</span>
                  </div>

                  {activeRequest.status !== 'pending' && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Ambulance:</span>
                        <span>{activeRequest.ambulanceId}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium">Driver:</span>
                        <span>{activeRequest.driverName}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium">Contact:</span>
                        <a href={`tel:${activeRequest.driverPhone}`} className="text-blue-600 hover:underline">
                          {activeRequest.driverPhone}
                        </a>
                      </div>
                    </>
                  )}

                  <div className="pt-4 border-t">
                    <div className="flex items-start space-x-2 text-sm mb-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <span className="font-medium">Pickup:</span>
                        <p className="text-muted-foreground">{activeRequest.pickupLocation}</p>
                      </div>
                    </div>
                    
                    {activeRequest.destination && (
                      <div className="flex items-start space-x-2 text-sm">
                        <Navigation className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <span className="font-medium">Destination:</span>
                          <p className="text-muted-foreground">{activeRequest.destination}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button 
                    variant="outline" 
                    onClick={cancelRequest}
                    className="w-full"
                  >
                    Cancel Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emergency Information */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Information</CardTitle>
              <CardDescription>
                Important information about our ambulance service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">24/7 Availability</h4>
                    <p className="text-sm text-muted-foreground">
                      Our ambulance service is available round the clock for all emergencies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Emergency Hotline</h4>
                    <p className="text-sm text-muted-foreground">
                      For immediate assistance, call: <strong>911</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Navigation className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">GPS Tracking</h4>
                    <p className="text-sm text-muted-foreground">
                      Track your ambulance in real-time once dispatched.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Qualified Paramedics</h4>
                    <p className="text-sm text-muted-foreground">
                      All ambulances are equipped with certified paramedics and medical equipment.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}