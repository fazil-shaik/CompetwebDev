'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const teamMembers = [
    { name: "Jane Doe", role: "CEO & Founder", image: "/placeholder.svg?height=200&width=200" },
    { name: "John Smith", role: "CTO", image: "/placeholder.svg?height=200&width=200" },
    { name: "Alice Johnson", role: "Head of Data Science", image: "/placeholder.svg?height=200&width=200" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h1 
          className="text-5xl font-extrabold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About CompetitorFinder
        </motion.h1>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xl mb-4">
            CompetitorFinder is on a mission to empower businesses with unparalleled competitive intelligence.
          </p>
          <p className="text-xl">
            Our cutting-edge AI technology and expert team are dedicated to helping you stay ahead in today s fast-paced market.
          </p>
        </motion.div>
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-purple-800 to-indigo-900 border-none overflow-hidden">
                <CardContent className="p-6 text-center">
                  <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-300">{member.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h2 className="text-3xl font-bold mb-4">Join Us in Shaping the Future of Competitive Intelligence</h2>
          <p className="text-xl mb-8">
            We&ambs;re always looking for talented individuals to join our team and help businesses thrive.
          </p>
          <Link href="/careers">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Explore Careers <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}