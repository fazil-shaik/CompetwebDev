'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'

// Competitor Analysis Component
export default function CompetitorAnalysis() {
  const [company, setCompany] = useState('')
  const [competitors, setCompetitors] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!company.trim()) {
      setError('Please enter a company name')
      return
    }

    setError('')
    setIsLoading(true)
    try {
      const response = await fetch('/api/analyze-competitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company }),
      })

      // Check if response is OK
      if (!response.ok) {
        const errorText = await response.text()
        console.error("API response error:", errorText)
        throw new Error(errorText || 'Failed to analyze competitors')
      }

      // Parse JSON response
      const data = await response.json()
      setCompetitors(data.competitors)
      setIsDialogOpen(true)
    } catch (err) {
      console.error("Error in handleAnalyze:", err)
      setError(`Failed to analyze competitors. Please try again. ${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Competitor Analysis</h1>
      <div className="flex items-center space-x-2 bg-[#2F2E8B] p-4 rounded-md">
        <Input
          type="text"
          placeholder="Enter your competitor's name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-2 text-gray-700 placeholder-gray-500 rounded-md focus:outline-none"
        />
        <Button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="flex items-center justify-center px-4 py-2 text-white font-semibold rounded-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <span className="mr-1">🔍</span>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Competitors'
          )}
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Top 3 Competitors for {company}</DialogTitle>
            <DialogDescription>
              Here are the top competitors based on our analysis:
            </DialogDescription>
          </DialogHeader>
          <ul className="list-disc pl-6 mt-4">
            {competitors.map((competitor, index) => (
              <li key={index} className="mb-2">{competitor}</li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  )
}
