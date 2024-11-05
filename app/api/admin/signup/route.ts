import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import clientPromise from '@/lib/mongodb'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    const client = await clientPromise
    const db = client.db("competitor-finder")
    const adminCollection = db.collection('admins')

    const existingAdmin = await adminCollection.findOne({ email })

    if (existingAdmin) {
      return NextResponse.json({ message: 'Email already in use' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await adminCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })

    return NextResponse.json({ message: 'Admin created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}