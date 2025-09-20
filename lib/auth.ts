import { mockUsers, mockUserRoles, mockCredentials, User, UserRole } from './mock-data'

export interface AuthUser {
  id: string
  email: string
  user_metadata: {
    full_name: string
  }
}

export class MockAuthService {
  private static instance: MockAuthService
  private currentUser: AuthUser | null = null
  private listeners: ((user: AuthUser | null) => void)[] = []

  static getInstance(): MockAuthService {
    if (!MockAuthService.instance) {
      MockAuthService.instance = new MockAuthService()
    }
    return MockAuthService.instance
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser
  }

  async signUp(email: string, password: string, fullName: string): Promise<{ user: AuthUser | null; error: Error | null }> {
    try {
      // Check if user already exists
      if (mockCredentials[email as keyof typeof mockCredentials]) {
        throw new Error('User already exists')
      }

      // Create new user
      const newUserId = `user_${Date.now()}`
      const newUser: User = {
        id: newUserId,
        email,
        full_name: fullName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // Add to mock data
      mockUsers.push(newUser)
      mockUserRoles.push({
        id: `role_${Date.now()}`,
        user_id: newUserId,
        role: 'patient',
        created_at: new Date().toISOString()
      })

      // Add credentials
      ;(mockCredentials as any)[email] = { password, userId: newUserId }

      const authUser: AuthUser = {
        id: newUserId,
        email,
        user_metadata: { full_name: fullName }
      }

      this.currentUser = authUser
      this.notifyListeners(authUser)

      return { user: authUser, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  }

  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: Error | null }> {
    try {
      const credentials = mockCredentials[email as keyof typeof mockCredentials]
      
      if (!credentials || credentials.password !== password) {
        throw new Error('Invalid email or password')
      }

      const user = mockUsers.find(u => u.id === credentials.userId)
      if (!user) {
        throw new Error('User not found')
      }

      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        user_metadata: { full_name: user.full_name }
      }

      this.currentUser = authUser
      this.notifyListeners(authUser)

      return { user: authUser, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  }

  async signOut(): Promise<{ error: Error | null }> {
    this.currentUser = null
    this.notifyListeners(null)
    return { error: null }
  }

  onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
    this.listeners.push(callback)
    
    // Call immediately with current state
    callback(this.currentUser)
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback)
    }
  }

  private notifyListeners(user: AuthUser | null) {
    this.listeners.forEach(listener => listener(user))
  }

  getUserRoles(userId: string): UserRole['role'][] {
    return mockUserRoles
      .filter(role => role.user_id === userId)
      .map(role => role.role)
  }
}

export const authService = MockAuthService.getInstance()