import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET || 'fallback_secret') as { userId: string }
    const client = await clientPromise
    const db = client.db('competitor-finder')

    const webhooks = await db.collection('webhooks').find({ userId: new ObjectId(decoded.userId) }).toArray()

    return NextResponse.json(webhooks)
  } catch (error) {
    console.error('Error fetching webhooks:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET || 'fallback_secret') as { userId: string }
    const { companyName, webhookUrl } = await request.json()

    if (!companyName || !webhookUrl) {
      return NextResponse.json({ message: 'Company name and webhook URL are required' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('competitor-finder')

    const result = await db.collection('webhooks').insertOne({
      userId: new ObjectId(decoded.userId),
      companyName,
      webhookUrl,
      createdAt: new Date(),
    })

    return NextResponse.json({ message: 'Webhook added successfully', id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error('Error adding webhook:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}