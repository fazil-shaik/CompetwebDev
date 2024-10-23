/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, BarChart, TrendingUp, Zap, Globe, Shield, Users } from 'lucide-react'
import Link from 'next/link'

export default function FeaturesPage() {
  const features = [
    { icon: Search, title: "AI-Powered Insights", description: "Uncover hidden patterns and opportunities in your competitive landscape with our advanced AI algorithms." },
    { icon: BarChart, title: "Real-time Analytics", description: "Stay ahead with up-to-the-minute data on your competitors' strategies and market movements." },
    { icon: Zap, title: "Actionable Strategies", description: "Transform insights into action with our customized strategy recommendations and competitive playbooks." },
    { icon: Globe, title: "Global Market Coverage", description: "Access data from markets worldwide to expand your business globally." },
    { icon: Shield, title: "Data Security", description: "Your data is protected with enterprise-grade security and compliance measures." },
    { icon: Users, title: "Collaboration Tools", description: "Work seamlessly with your team using our built-in collaboration features." },
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
          Powerful Features to Supercharge Your Competitive Edge
        </motion.h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-purple-800 to-indigo-900 border-none h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <feature.icon className="w-6 h-6 mr-2 text-pink-400" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/signup">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Start Your Free Trial
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}