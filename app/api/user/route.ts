// import { NextResponse } from 'next/server'
// import { cookies } from 'next/headers'
// import jwt from 'jsonwebtoken'
// import clientPromise from '@/lib/mongodb'
// import { ObjectId } from 'mongodb'

// export async function GET() {
//   const cookieStore = cookies()
//   const token = cookieStore.get('token')

//   if (!token) {
//     return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
//   }

//   try {
//     const decoded = jwt.verify(token.value, process.env.JWT_SECRET || 'fallback_secret') as { userId: string, email: string }
    
//     const client = await clientPromise
//     const db = client.db('competitor-finder')
//     const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) })

//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 })
//     }

//     // Don't send the password hash to the client
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { password, ...userWithoutPassword } = user

//     return NextResponse.json({
//       _id: userWithoutPassword._id.toString(),
//       name: userWithoutPassword.name,
//       email: userWithoutPassword.email,
//       createdAt: userWithoutPassword.createdAt.toISOString()
//     })
//   } catch (error) {
//     console.error('Error fetching user:', error)
//     return NextResponse.json({ message: 'Error fetching user data' }, { status: 500 })
//   }
// }


import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET || 'fallback_secret') as { name: string, email: string }
    return NextResponse.json({ name: decoded.name, email: decoded.email })
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }
}