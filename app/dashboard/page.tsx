// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { BarChart, Users, Search, TrendingUp } from 'lucide-react'

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   createdAt: string;
// }

// export default function DashboardPage() {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   // const [slackConnected, setSlackConnected] = useState(false)
//   const router = useRouter()

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch('/api/user')
//         if (response.ok) {
//           const userData: User = await response.json()
//           setUser(userData)
//           // Check if user has Slack connected (you'll need to add this to your user model)
//           // setSlackConnected(!!userData.slackAccessToken)
//         } else {
//           // If not authenticated, redirect to login
//           router.push('/login')
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error)
//         setError('Failed to fetch user data. Please try again.')
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchUser()
//   }, [router])

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('/api/logout', { method: 'POST' })
//       if (response.ok) {
//         router.push('/login')
//       } else {
//         throw new Error('Logout failed')
//       }
//     } catch (error) {
//       console.error('Logout error:', error)
//       setError('Failed to logout. Please try again.')
//     }
//   }

//   // const handleSlackConnect = () => {
//   //   // Redirect to Slack OAuth route
//   //   window.location.href = '/api/slack/auth'
//   // }  

//   // const handleSlackChannelRedirect = () => {
//   //   // Redirect to specific Slack channel
//   //   // Replace 'CXXXXXXXX' with your actual Slack channel ID
//   //   window.open('https://slack.com/app_redirect?channel=C07RWR7JSM6', '')
//   // }

//   if (isLoading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
//   }

//   if (!user) {
//     return <div className="flex justify-center items-center h-screen">No user data available</div>
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex">
//               <div className="flex-shrink-0 flex items-center">
//                 <span className="text-2xl font-bold text-blue-600">CompetitorFinder</span>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <span className="text-gray-700 mr-4">Welcome, {user.name}</span>
//               <Button onClick={handleLogout}>Logout</Button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Competitors</CardTitle>
//                 <Users className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">24</div>
//                 <p className="text-xs text-muted-foreground">+10% from last month</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Searches Performed</CardTitle>
//                 <Search className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">145</div>
//                 <p className="text-xs text-muted-foreground">+20% from last month</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Market Share</CardTitle>
//                 <BarChart className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">32%</div>
//                 <p className="text-xs text-muted-foreground">+2% from last month</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
//                 <TrendingUp className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">+15%</div>
//                 <p className="text-xs text-muted-foreground">+5% from last month</p>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="mt-8">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Recent Competitor Activity</CardTitle>
//                 <CardDescription>Your competitors latest moves</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {[1, 2, 3].map((_, index) => (
//                     <div key={index} className="flex items-center">
//                       <div className="ml-4">
//                         <p className="text-sm font-medium text-gray-900">Competitor {index + 1}</p>
//                         <p className="text-sm text-gray-500">Launched a new product line</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* <div className="mt-8"> */}
//             {/* {slackConnected ? (
//               <Button onClick={handleSlackChannelRedirect} className="flex items-center">
//                 <Slack className="mr-2 h-4 w-4" />
//                 Open Slack Channel
//               </Button>
//             ) : (
//               <Button onClick={handleSlackConnect} className="flex items-center">
//                 <Slack className="mr-2 h-4 w-4" />
//                 Connect to Slack
//               </Button>
//             )} */}
//           {/* </div> */}
          
//           <div className="mt-8">
//           <a
//   href="https://slack.com/oauth/v2/authorize?scope=chat:write,channels:read,users:read&redirect_uri=https%3A%2F%2F5d26-2409-40f0-1187-da05-c8cf-3464-e5ff-c889.ngrok-free.app%2Fapi%2Fslack%2Fcallback&client_id=7716016482321.7869856956595"
//   style={{
//     alignItems: "center",
//     color: "#fff",
//     backgroundColor: "#4A154B",
//     border: 0,
//     borderRadius: "48px",
//     display: "inline-flex",
//     fontFamily: "Lato, sans-serif",
//     fontSize: "16px",
//     fontWeight: 600,
//     height: "48px",
//     justifyContent: "center",
//     textDecoration: "none",
//     width: "48px",
//   }}
// >
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     style={{ height: "24px", width: "24px", marginRight: 0 }}
//     viewBox="0 0 122.8 122.8"
//   >
//     <path
//       d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
//       fill="#e01e5a"
//     />
//     <path
//       d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
//       fill="#36c5f0"
//     />
//     <path
//       d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
//       fill="#2eb67d"
//     />
//     <path
//       d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
//       fill="#ecb22e"
//     />
//   </svg>
// </a>


//           </div>

//         </div>
//       </main>
//     </div>
//   )
// }



// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// export default function DashboardPage() {
//   const [userName, setUserName] = useState('')
//   const router = useRouter()

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const response = await fetch('/api/user')
//       if (response.ok) {
//         const data = await response.json()
//         setUserName(data.name)
//       } else {
//         // If not authenticated, redirect to login
//         router.push('/login')
//       }
//     }

//     fetchUserData()
//   }, [router])

//   const handleSlackRedirect = () => {
//     window.location.href = 'https://datateam-lue4672.slack.com/archives/C07RKRN7VS7'
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           <Card>
//             <CardHeader>
//               <CardTitle>Welcome, {userName}!</CardTitle>
//               <CardDescription>Your CompetitorFinder Dashboard</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p>Here you can manage your competitor analysis and join our Slack workspace.</p>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full" onClick={handleSlackRedirect}>
//                 Join Slack Workspace
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }


// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { LogOut } from 'lucide-react'

// export default function DashboardPage() {
//   const [userName, setUserName] = useState('')
//   const router = useRouter()

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const response = await fetch('/api/user')
//       if (response.ok) {
//         const data = await response.json()
//         console.log(data)
//         setUserName(data.name)
//       } else {
//         // If not authenticated, redirect to login
//         router.push('/login')
//       }
//     }

//     fetchUserData()
//   }, [router])

//   const handleSlackRedirect = () => {
//     window.location.search = 'https://datateam-lue4672.slack.com/archives/C07RKRN7VS7'
//   }

//   const handleLogout = async () => {
//     const response = await fetch('/api/logout', { method: 'POST' })
//     if (response.ok) {
//       // Redirect to login page after successful logout
//       router.push('/login')
//     } else {
//       console.error('Logout failed')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//           <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
//             <LogOut className="h-4 w-4" />
//             Logout
//           </Button>
//         </div>
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           <Card>
//             <CardHeader>
//               <CardTitle>Welcome, {userName}!</CardTitle>
//               <CardDescription>Your CompetitorFinder Dashboard</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p>Here you can manage your competitor analysis and join our Slack workspace.</p>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full" onClick={handleSlackRedirect}>
//                 Join Slack Workspace
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { LogOut, ExternalLink } from 'lucide-react'

// export default function DashboardPage() {
//   const [userData, setUserData] = useState<{ name: string } | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch('/api/user')
//         if (response.ok) {
//           const data = await response.json()
//           setUserData(data)
//         } else {
//           // If not authenticated, redirect to login
//           router.push('/login')
//         }
//       } catch (err) {
//         setError('Failed to fetch user data')
//         console.error('Error fetching user data:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUserData()
//   }, [router])

//   const handleSlackRedirect = () => {
//     window.open('https://datateam-lue4672.slack.com/archives/C07RKRN7VS7', '_blank', 'noopener,noreferrer')
//   }

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('/api/logout', { method: 'POST' })
//       if (response.ok) {
//         // Redirect to login page after successful logout
//         router.push('/login')
//       } else {
//         throw new Error('Logout failed')
//       }
//     } catch (err) {
//       console.error('Logout error:', err)
//       setError('Failed to logout. Please try again.')
//     }
//   }

//   if (loading) {
//     return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>
//   }

//   if (error) {
//     return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-red-500">{error}</div>
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//           <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
//             <LogOut className="h-4 w-4" />
//             Logout
//           </Button>
//         </div>
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           <Card>
//             <CardHeader>
//               <CardTitle>Welcome, {userData?.name || 'User'}!</CardTitle>
//               <CardDescription>Your CompetitorFinder Dashboard</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p>Here you can manage your competitor analysis and join our Slack workspace.</p>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full flex items-center justify-center gap-2" onClick={handleSlackRedirect}>
//                 Join Slack Workspace
//                 <ExternalLink className="h-4 w-4" />
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }


// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { LogOut, ExternalLink, Save } from 'lucide-react'

// export default function DashboardPage() {
//   const [userData, setUserData] = useState<{ name: string } | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [companyName, setCompanyName] = useState('')
//   const [webhookUrl, setWebhookUrl] = useState('')
//   const [slackInvitation, setSlackInvitation] = useState('')
//   const router = useRouter()

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch('/api/user')
//         if (response.ok) {
//           const data = await response.json()
//           setUserData(data)
//           // Fetch existing data from Pinecone
//           const pineconeResponse = await fetch('/api/pinecone', {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' },
//           })
//           if (pineconeResponse.ok) {
//             const pineconeData = await pineconeResponse.json()
//             setCompanyName(pineconeData.companyName || '')
//             setWebhookUrl(pineconeData.webhookUrl || '')
//             setSlackInvitation(pineconeData.slackInvitation || '')
//           }
//         } else {
//           // If not authenticated, redirect to login
//           router.push('/login')
//         }
//       } catch (err) {
//         setError('Failed to fetch user data')
//         console.error('Error fetching user data:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUserData()
//   }, [router])

//   const handleSlackRedirect = () => {
//     window.open('https://datateam-lue4672.slack.com/archives/C07RKRN7VS7', '_blank', 'noopener,noreferrer')
//   }

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('/api/logout', { method: 'POST' })
//       if (response.ok) {
//         // Redirect to login page after successful logout
//         router.push('/login')
//       } else {
//         throw new Error('Logout failed')
//       }
//     } catch (err) {
//       console.error('Logout error:', err)
//       setError('Failed to logout. Please try again.')
//     }
//   }

//   const handleSave = async () => {
//     try {
//       const response = await fetch('/api/pinecone', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ companyName, webhookUrl, slackInvitation }),
//       })
//       if (response.ok) {
//         alert('Data saved successfully!')
//       } else {
//         throw new Error('Failed to save data')
//       }
//     } catch (err) {
//       console.error('Save error:', err)
//       setError('Failed to save data. Please try again.')
//     }
//   }

//   if (loading) {
//     return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>
//   }

//   if (error) {
//     return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-red-500">{error}</div>
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//           <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
//             <LogOut className="h-4 w-4" />
//             Logout
//           </Button>
//         </div>
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           <Card>
//             <CardHeader>
//               <CardTitle>Welcome, {userData?.name || 'User'}!</CardTitle>
//               <CardDescription>Your CompetitorFinder Dashboard</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="mb-4">Here you can manage your competitor analysis and join our Slack workspace.</p>
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="companyName">Company Name</Label>
//                   <Input
//                     id="companyName"
//                     value={companyName}
//                     onChange={(e) => setCompanyName(e.target.value)}
//                     placeholder="Enter your company name"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="webhookUrl">Slack Webhook URL</Label>
//                   <Input
//                     id="webhookUrl"
//                     value={webhookUrl}
//                     onChange={(e) => setWebhookUrl(e.target.value)}
//                     placeholder="Enter your Slack webhook URL"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="slackInvitation">Slack Invitation Link</Label>
//                   <Input
//                     id="slackInvitation"
//                     value={slackInvitation}
//                     onChange={(e) => setSlackInvitation(e.target.value)}
//                     placeholder="Enter your Slack invitation link"
//                   />
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex flex-col space-y-4">
//               <Button className="w-full" onClick={handleSave}>
//                 <Save className="mr-2 h-4 w-4" /> Save Settings
//               </Button>
//               <Button className="w-full" onClick={handleSlackRedirect}>
//                 Join Our Slack Workspace
//                 <ExternalLink className="ml-2 h-4 w-4" />
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogOut, Plus } from 'lucide-react'

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
        </div>
      </div>
    </div>
  )
}