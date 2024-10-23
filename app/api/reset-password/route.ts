import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      console.log('Missing token or password')
      return NextResponse.json({ message: 'Token and password are required' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('competitor-finder')

    console.log('Searching for user with token:', token)

    // Find user with the reset token
    const user = await db.collection('users').findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      console.log('No user found with the provided token or token expired')
      return NextResponse.json({ message: 'Invalid or expired reset token' }, { status: 400 })
    }

    console.log('User found:', user._id)

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update user's password and remove reset token fields
    const updateResult = await db.collection('users').updateOne(
      { _id: new ObjectId(user._id) },
      {
        $set: { password: hashedPassword },
        $unset: { resetToken: "", resetTokenExpiry: "" }
      }
    )

    console.log('Update result:', updateResult)

    if (updateResult.modifiedCount === 0) {
      console.log('Failed to update user password')
      return NextResponse.json({ message: 'Failed to update password' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Password has been reset successfully' }, { status: 200 })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ message: 'An error occurred during the password reset process' }, { status: 500 })
  }
}