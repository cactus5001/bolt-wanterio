'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { mockUsers, User } from '@/lib/mock-data'
import { PageLoadingSpinner } from '@/components/loading-spinner'
import { Navbar } from '@/components/navbar'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Search, Send, User as UserIcon, Stethoscope, Building2 } from 'lucide-react'
import { toast } from 'sonner'

interface Chat {
  id: string
  participant: User
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
}

export default function ChatsPage() {
  const { user, userRoles, loading: authLoading } = useAuth()
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadChats()
    }
  }, [user])

  const loadChats = () => {
    // Simulate loading chats
    setTimeout(() => {
      const mockChats: Chat[] = []
      
      // Add some sample chats based on user role
      if (userRoles.includes('patient')) {
        mockChats.push({
          id: 'chat1',
          participant: mockUsers.find(u => u.id === 'doctor1')!,
          lastMessage: 'Your test results look good. Let me know if you have any questions.',
          lastMessageTime: '2 hours ago',
          unreadCount: 1
        })
        mockChats.push({
          id: 'chat2',
          participant: mockUsers.find(u => u.id === 'clinic1')!,
          lastMessage: 'Your appointment is confirmed for tomorrow at 2 PM.',
          lastMessageTime: '1 day ago',
          unreadCount: 0
        })
      }
      
      if (userRoles.includes('doctor')) {
        mockChats.push({
          id: 'chat3',
          participant: mockUsers.find(u => u.id === 'patient1')!,
          lastMessage: 'Thank you doctor, I feel much better now.',
          lastMessageTime: '30 minutes ago',
          unreadCount: 2
        })
        mockChats.push({
          id: 'chat4',
          participant: mockUsers.find(u => u.id === 'patient2')!,
          lastMessage: 'When should I take the medication?',
          lastMessageTime: '3 hours ago',
          unreadCount: 1
        })
      }

      setChats(mockChats)
      setLoading(false)
    }, 500)
  }

  const loadMessages = (chat: Chat) => {
    // Simulate loading messages for selected chat
    const mockMessages: Message[] = [
      {
        id: '1',
        senderId: chat.participant.id,
        content: 'Hello! How are you feeling today?',
        timestamp: '10:30 AM'
      },
      {
        id: '2',
        senderId: user!.id,
        content: 'Hi doctor, I\'m feeling much better after taking the medication.',
        timestamp: '10:35 AM'
      },
      {
        id: '3',
        senderId: chat.participant.id,
        content: 'That\'s great to hear! Continue taking the medication as prescribed.',
        timestamp: '10:40 AM'
      },
      {
        id: '4',
        senderId: chat.participant.id,
        content: chat.lastMessage,
        timestamp: chat.lastMessageTime
      }
    ]
    
    setMessages(mockMessages)
  }

  const selectChat = (chat: Chat) => {
    setSelectedChat(chat)
    loadMessages(chat)
    
    // Mark as read
    setChats(prev => prev.map(c => 
      c.id === chat.id ? { ...c, unreadCount: 0 } : c
    ))
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return

    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: user!.id,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Update last message in chat list
    setChats(prev => prev.map(chat =>
      chat.id === selectedChat.id
        ? { ...chat, lastMessage: newMessage, lastMessageTime: 'now' }
        : chat
    ))

    toast.success('Message sent')
  }

  const getUserIcon = (userId: string) => {
    const userRole = mockUsers.find(u => u.id === userId)
    if (userId === 'doctor1' || userId === 'doctor2') {
      return <Stethoscope className="h-4 w-4" />
    }
    if (userId === 'clinic1' || userId === 'clinic2') {
      return <Building2 className="h-4 w-4" />
    }
    return <UserIcon className="h-4 w-4" />
  }

  if (authLoading || loading) {
    return <PageLoadingSpinner />
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">Please login to access chat.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Navbar />
      
      <div className="container py-8">
        <BreadcrumbNav items={[
          { label: 'Messages' }
        ]} />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Messages</h1>
              <p className="text-muted-foreground">Secure communication with healthcare providers</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Chat List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <CardDescription>Your recent chats</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => selectChat(chat)}
                    className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b ${
                      selectedChat?.id === chat.id ? 'bg-muted' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {getUserIcon(chat.participant.id)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium truncate">{chat.participant.full_name}</h4>
                          {chat.unreadCount > 0 && (
                            <Badge variant="default" className="ml-2">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {chat.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {chat.lastMessageTime}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {chats.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No conversations yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Start chatting with healthcare providers
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <Card className="lg:col-span-2">
            {selectedChat ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      {getUserIcon(selectedChat.participant.id)}
                    </div>
                    <div>
                      <CardTitle>{selectedChat.participant.full_name}</CardTitle>
                      <CardDescription>
                        {selectedChat.participant.email}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex flex-col h-[400px]">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 py-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderId === user.id ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.senderId === user.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === user.id
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t pt-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">
                    Choose a chat from the list to start messaging
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}