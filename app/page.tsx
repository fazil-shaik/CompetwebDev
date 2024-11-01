'use client'

import { useState, useEffect } from 'react'
import { Analytics } from "@vercel/analytics/react"
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Search, BarChart, Zap } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [text, setText] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [competitors, setCompetitors] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fullText = "Dominate Your Market"
  const controls = useAnimation()
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const router = useRouter()

  useEffect(() => {
    const typeText = async () => {
      await controls.start({ opacity: 1, y: 0 })
      for (let i = 0; i <= fullText.length; i++) {
        setText(fullText.slice(0, i))
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
    typeText()
  }, [])

  const fetchCompetitors = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/analyze-competitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company: companyName }),
      })
      if (!response.ok) {
        throw new Error('Failed to fetch competitors')
      }
      const data = await response.json()
      setCompetitors(data.competitors)
      setIsDialogOpen(true)
    } catch (error) {
      console.error('Error fetching competitors:', error)
      setError('Failed to fetch competitors. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 text-white">
      <nav className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-white">CompetitorFinder</span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link href="/features">
                <Button variant="ghost" className="text-white">Features</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost" className="text-white">Pricing</Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="text-white">About</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="ml-4 text-white border-white">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button className="ml-4 bg-white text-purple-900 hover:bg-purple-100">Sign up</Button>
              </Link>
            </div>
            <div className="flex items-center sm:hidden">
              <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm:hidden"
          >
            <div className="pt-2 pb-3 space-y-1">
              <Link href="/features">
                <Button variant="ghost" className="w-full text-left text-white">Features</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost" className="w-full text-left text-white">Pricing</Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="w-full text-left text-white">About</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="w-full mt-4 text-white border-white">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button className="w-full mt-2 bg-white text-purple-900">Sign up</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            style={{ opacity, scale }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                {text}
              </span>
              <span className="block mt-2 text-white">with CompetitorFinder</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl sm:text-2xl text-gray-300">
              Uncover hidden opportunities, outsmart your rivals, and conquer your industry with our cutting-edge competitor analysis tools.
            </p>
            <div className="mt-10 flex justify-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Input 
                  className="w-64 mr-2 text-black" 
                  placeholder="Enter your company's name" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={fetchCompetitors}
                  disabled={isLoading || !companyName.trim()}
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isLoading ? 'Analyzing...' : 'Analyze Competitors'}
                </Button>
              </motion.div>
            </div>
            {error && (
              <p className="mt-4 text-red-400">{error}</p>
            )}
          </motion.div>
        </section>
        <Analytics/>
        
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-extrabold text-center mb-12">
            Why Choose CompetitorFinder?
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-gradient-to-br from-purple-800 to-indigo-900 border-none">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Search className="w-5 h-5 mr-2 text-pink-400" />
                    AI-Powered Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    Our advanced AI algorithms uncover hidden patterns and opportunities in your competitive landscape.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-gradient-to-br from-blue-800 to-indigo-900 border-none">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <BarChart className="w-5 h-5 mr-2 text-blue-400" />
                    Real-time Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    Stay ahead with up-to-the-minute data on your competitors strategies and market movements.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-gradient-to-br from-indigo-800 to-purple-900 border-none">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                    Actionable Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    Transform insights into action with our customized strategy recommendations and competitive playbooks.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to outperform your rivals?</span>
                  <span className="block text-indigo-200">Start your competitive journey today.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-100">
                  Join thousands of industry leaders who trust CompetitorFinder to stay ahead in the game.
                </p>
              </div>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/signup">
                      <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                        Get started
                      </Button>
                    </Link>
                  </motion.div>
                </div>
                <div className="ml-3 inline-flex rounded-md shadow">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/about">
                      <Button size="lg" variant="outline" className="text-white border-white hover:bg-purple-700">
                        Learn more
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gradient-to-br from-purple-900  to-indigo-900 text-white">
          <DialogHeader>
            <DialogTitle>Top Competitors for {companyName}</DialogTitle>
            <DialogDescription className="text-gray-300">
              Here are the top competitors we ve identified:
            </DialogDescription>
          </DialogHeader>
          <ul className="mt-4 space-y-2">
            {competitors.map((competitor, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2 text-pink-400">{index + 1}.</span>
                <span>{competitor}</span>
              </li>
            ))}
          </ul>
          <Button className="mt-4 bg-white text-purple-900 hover:bg-purple-100" onClick={() => setIsDialogOpen(false)}>
            Close
          </Button>
          <Button 
            className="mt-4 ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600" 
            onClick={() => {
              setIsDialogOpen(false)
              router.push('/signup')
            }}
          >
            Know more
          </Button>
        </DialogContent>
      </Dialog>

      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2024 CompetitorFinder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}