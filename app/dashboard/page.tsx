'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogOut, Plus } from 'lucide-react'
import Chatbot from '@/app/components/Chatbot'

export default function DashboardPage() {
  const [userData, setUserData] = useState<{ name: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [companyName, setCompanyName] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [invitationLink, setInvitationLink] = useState('')
  const [showThankYou, setShowThankYou] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/user')
        if (response.ok) {
          const data = await response.json()
          setUserData(data)
        } else {
          router.push('/login')
        }
      } catch (err) {
        setError('Failed to fetch user data')
        console.error('Error fetching user data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleAddWebhook = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, webhookUrl }),
      })
      if (response.ok) {
        setCompanyName('')
        setWebhookUrl('')
        setShowThankYou(true)
      } else {
        throw new Error('Failed to add webhook')
      }
    } catch (err) {
      console.error('Error adding webhook:', err)
      setError('Failed to add webhook. Please try again.')
    }
  }

  const handleAddSlackInvitation = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/slack-invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, invitationLink }),
      })
      if (response.ok) {
        setCompanyName('')
        setInvitationLink('')
        setShowThankYou(true)
      } else {
        throw new Error('Failed to add Slack invitation')
      }
    } catch (err) {
      console.error('Error adding Slack invitation:', err)
      setError('Failed to add Slack invitation. Please try again.')
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'POST' })
      if (response.ok) {
        router.push('/login')
      } else {
        throw new Error('Logout failed')
      }
    } catch (err) {
      console.error('Logout error:', err)
      setError('Failed to logout. Please try again.')
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {userData?.name || 'User'}!</CardTitle>
              <CardDescription>Your CompetitorFinder Dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Here you can manage your Slack webhooks and invitations.</p>
            </CardContent>
          </Card>
          {showThankYou ? (
            <Card>
              <CardHeader>
                <CardTitle>Thank You!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Thank you for your response. We will look over it.</p>
                {/* <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Congratulations"
                  width={300}
                  height={300}
                  className="mx-auto"
                /> */}
                <div style={{ width: '100%', height: 0, paddingBottom: '56%', position: 'relative' }}>
  <iframe
    src="https://giphy.com/embed/UzQ2PG1Mt9OpelQWz2"
    width="100%"
    height="100%"
    style={{ position: 'absolute' }}
    frameBorder="0"
    className="giphy-embed"
    allowFullScreen
  ></iframe>
</div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Add Slack Webhook</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddWebhook}>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="webhookUrl">Webhook URL</Label>
                        <Input
                          id="webhookUrl"
                          value={webhookUrl}
                          onChange={(e) => setWebhookUrl(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="mt-4">
                      <Plus className="mr-2 h-4 w-4" /> Add Webhook
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Add Slack Invitation</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddSlackInvitation}>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="invitationCompanyName">Company Name</Label>
                        <Input
                          id="invitationCompanyName"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="invitationLink">Invitation Link</Label>
                        <Input
                          id="invitationLink"
                          value={invitationLink}
                          onChange={(e) => setInvitationLink(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="mt-4">
                      <Plus className="mr-2 h-4 w-4" /> Add Invitation
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </>
          )}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Get help with competitor analysis and market research</CardDescription>
              </CardHeader>
              <CardContent>
                <Chatbot />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}