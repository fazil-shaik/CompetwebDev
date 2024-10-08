import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import clientPromise from '@/lib/mongodb'
import { createUser, User } from '@/models/User'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('competitor-finder')

    // Check if user already exists
    const existingUser = await db.collection<User>('users').findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = createUser(name, email, hashedPassword)

    // Insert new user
    const result = await db.collection<User>('users').insertOne(newUser)

    if (!result.acknowledged) {
      throw new Error('Failed to insert user into database')
    }

    return NextResponse.json({ message: 'User created successfully', userId: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ message: 'An error occurred during signup', error }, { status: 500 })
  }
}