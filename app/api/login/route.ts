// import { NextResponse } from 'next/server'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import clientPromise from '@/lib/mongodb'

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json()

//     if (!email || !password) {
//       return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
//     }

//     const client = await clientPromise
//     const db = client.db('competitor-finder')

//     // Find user
//     const user = await db.collection('users').findOne({ email })
//     if (!user) {
//       return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 })
//     }

//     // Check password
//     const isPasswordValid = await bcrypt.compare(password, user.password)
//     if (!isPasswordValid) {
//       return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 })
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.JWT_SECRET || 'fallback_secret',
//       { expiresIn: '1h' }
//     )

//     // Set JWT token in a cookie
//     const response = NextResponse.json({ 
//       message: 'Login successful',
//     }, { status: 200 })
    
//     response.cookies.set('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 3600, // 1 hour
//       path: '/',
//     })

//     return response
//   } catch (error) {
//     console.error('Login error:', error)
//     return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 })
//   }
// }


// import { NextResponse } from 'next/server'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import clientPromise from '@/lib/mongodb'

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json()

//     if (!email || !password) {
//       return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
//     }

//     const client = await clientPromise
//     const db = client.db('competitor-finder')

//     // Find user
//     const user = await db.collection('users').findOne({ email })
//     if (!user) {
//       return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 })
//     }

//     // Check password
//     const isPasswordValid = await bcrypt.compare(password, user.password)
//     if (!isPasswordValid) {
//       return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 })
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email, name: user.name },
//       process.env.JWT_SECRET || 'fallback_secret',
//       { expiresIn: '1h' }
//     )

//     // Set JWT token in a cookie
//     const response = NextResponse.json({ 
//       message: 'Login successful',
//       name: user.name
//     }, { status: 200 })
    
//     response.cookies.set('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 3600, // 1 hour
//       path: '/',
//     })

//     return response
//   } catch (error) {
//     console.error('Login error:', error)
//     return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 })
//   }
// }


import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    let client;
    try {
      client = await clientPromise
    } catch (error) {
      console.error('MongoDB connection error:', error)
      return NextResponse.json({ message: 'Database connection error' }, { status: 500 })
    }

    const db = client.db('competitor-finder')

    // Find user
    const user = await db.collection('users').findOne({ email })
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1h' }
    )

    // Set JWT token in a cookie
    const response = NextResponse.json({ 
      message: 'Login successful',
      redirectUrl: 'https://datateam-lue4672.slack.com/archives/C07RKRN7VS7'
    }, { status: 200 })
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 })
  }
}