'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Webhook {
  _id: string
  userId: string
  companyName: string
  webhookUrl: string
}

export default function AdminDashboard() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [webhooks, setWebhooks] = useState<Webhook[]>([])
  const [selectedWebhook, setSelectedWebhook] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        router.push('/admin/login')
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  useEffect(() => {
    const fetchWebhooks = async () => {
      try {
        const response = await fetch('/api/webhooks')
        if (!response.ok) {
          throw new Error('Failed to fetch webhooks')
        }
        const data = await response.json()
        setWebhooks(data)
      } catch (error) {
        console.error('Error fetching webhooks:', error)
        setStatus({ type: 'error', message: 'Failed to load webhooks. Please try again.' })
      }
    }
    fetchWebhooks()
  }, [])

  const handleSend = async () => {
    if (!selectedWebhook || !message) {
      setStatus({ type: 'error', message: 'Please select a webhook and enter a message.' })
      return
    }

    setIsLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/send-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhookUrl: selectedWebhook, message }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' })
        setMessage('')
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' })
      }
    } catch (error) {
      console.error('Error sending webhook:', error)
      setStatus({ type: 'error', message: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Welcome to the admin area</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <p>This is a protected admin area. Only authenticated admins can access this page.</p> */}
          <Button 
            className="mt-4" 
            onClick={handleLogout} 
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </CardContent>
      </Card>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Webhook Dashboard</CardTitle>
          <CardDescription>Select a webhook and send a message</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select onValueChange={setSelectedWebhook}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a webhook" />
            </SelectTrigger>
            <SelectContent>
              {webhooks.map((webhook) => (
                <SelectItem key={webhook._id} value={webhook.webhookUrl}>
                  {webhook.webhookUrl} ({webhook.companyName})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <Button onClick={handleSend} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </Button>
          {status && (
            <Alert variant={status.type === 'error' ? 'destructive' : 'default'}>
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}