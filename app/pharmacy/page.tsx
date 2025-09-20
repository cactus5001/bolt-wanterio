'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { supabase } from '@/lib/supabase/client'
import { mockMedicines } from '@/lib/mock-data'
import { PageLoadingSpinner } from '@/components/loading-spinner'
import { Navbar } from '@/components/navbar'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Pill, Search, ShoppingCart, Plus, Minus } from 'lucide-react'
import { toast } from 'sonner'

interface Medicine {
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

interface CartItem extends Medicine {
  quantity: number
}

export default function PharmacyPage() {
  const { user, loading: authLoading } = useAuth()
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadMedicines()
  }, [])

  const loadMedicines = async () => {
    try {
      const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .order('name')

      if (error) {
        if (error.message.includes('does not exist') || error.code === 'PGRST205') {
          console.warn('Database tables not found. Using mock data. Please apply the database schema from supabase/migrations/')
          setMedicines(mockMedicines)
        } else {
          console.error('Error loading medicines:', error)
          toast.error('Failed to load medicines')
        }
      } else {
        setMedicines(data || [])
      }
    } catch (error) {
      console.warn('Database not configured. Using mock data.')
      setMedicines(mockMedicines)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (medicine: Medicine) => {
    if (!user) {
      toast.error('Please login to add items to cart')
      return
    }

    setCart(prev => {
      const existingItem = prev.find(item => item.id === medicine.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...medicine, quantity: 1 }]
    })
    toast.success(`${medicine.name} added to cart`)
  }

  const updateQuantity = (medicineId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== medicineId))
      return
    }

    setCart(prev =>
      prev.map(item =>
        item.id === medicineId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user!.id,
          total_amount: getTotalPrice(),
          status: 'pending',
          payment_method: 'cod',
          shipping_address: 'Default Address' // You can add address form later
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        medicine_id: item.id,
        quantity: item.quantity,
        price: item.price
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      toast.success('Order placed successfully! You will receive a confirmation email shortly.')
      setCart([])
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order. Please try again.')
    }
  }

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (authLoading || loading) {
    return <PageLoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      
      <div className="container py-8">
        <BreadcrumbNav items={[
          { label: 'Pharmacy' }
        ]} />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Pill className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Online Pharmacy</h1>
              <p className="text-muted-foreground">Order medicines with fast delivery</p>
            </div>
          </div>

          {/* Search and Cart */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {cart.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({getTotalItems()})
                  <Badge className="ml-2">
                    ${getTotalPrice().toFixed(2)}
                  </Badge>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredMedicines.map((medicine) => {
            const cartItem = cart.find(item => item.id === medicine.id)
            
            return (
              <Card key={medicine.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <img 
                      src={medicine.image_url} 
                      alt={medicine.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                    <Pill className="h-12 w-12 text-gray-400 hidden" />
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{medicine.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {medicine.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">
                        ${medicine.price.toFixed(2)}
                      </span>
                      {medicine.category && (
                        <Badge variant="secondary">{medicine.category}</Badge>
                      )}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Stock: {medicine.stock_quantity} available
                    </div>

                    {cartItem ? (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(medicine.id, cartItem.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-3 py-1 bg-muted rounded text-sm font-medium">
                          {cartItem.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(medicine.id, cartItem.quantity + 1)}
                          disabled={cartItem.quantity >= medicine.stock_quantity}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => addToCart(medicine)}
                        disabled={medicine.stock_quantity === 0}
                        className="w-full"
                      >
                        {medicine.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredMedicines.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No medicines found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms
            </p>
          </div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <Card className="sticky bottom-4">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Cart Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    {getTotalItems()} items • Total: ${getTotalPrice().toFixed(2)}
                  </p>
                </div>
                <Button size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}