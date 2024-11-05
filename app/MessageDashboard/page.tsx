/* eslint-disable @typescript-eslint/no-unused-vars */
// app/dashboard/page.tsx
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedWebhook, setSelectedWebhook] = useState('')
  const [message, setMessage] = useState('')

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  const webhooks = [
    { id: '1', url: 'https://webhook1.example.com' },
    { id: '2', url: 'https://webhook2.example.com' },
    { id: '3', url: 'https://webhook3.example.com' },
  ]

  const handleSendMessage = async () => {
    if (!selectedWebhook || !message) {
      alert('Please select a webhook and enter a message')
      return
    }

    try {
      const response = await fetch('/api/send-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          webhookUrl: selectedWebhook,
          message,
        }),
      })

      if (response.ok) {
        alert('Message sent successfully')
        setMessage('')
      } else {
        alert('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('An error occurred while sending the message')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="webhook" className="block text-sm font-medium text-gray-700">Select Webhook</label>
          <Select onValueChange={setSelectedWebhook}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a webhook" />
            </SelectTrigger>
            <SelectContent>
              {webhooks.map((webhook) => (
                <SelectItem key={webhook.id} value={webhook.url}>
                  {webhook.url}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here"
            rows={4}
          />
        </div>
        <Button onClick={handleSendMessage}>Send Message</Button>
      </div>
    </div>
  )
}