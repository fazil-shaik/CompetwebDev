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

    console.log('Attempting to connect to MongoDB...')
    const client = await clientPromise
    console.log('Connected to MongoDB successfully')

    const db = client.db('competitor-finder')

    console.log('Searching for user...')
    const user = await db.collection('users').findOne({ email })
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 })
    }
    console.log('User found')

    console.log('Checking password...')
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 })
    }
    console.log('Password is valid')

    console.log('Generating JWT token...')
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1h' }
    )
    console.log('JWT token generated')

    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 })
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
    return NextResponse.json({ message: `An error occurred during login: ${error}` }, { status: 500 })
  }
}