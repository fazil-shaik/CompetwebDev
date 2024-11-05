import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const client = await clientPromise
    const db = client.db("competitor-finder")
    const adminCollection = db.collection('admins')

    const admin = await adminCollection.findOne({ email })

    if (!admin) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password)

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    )

    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}