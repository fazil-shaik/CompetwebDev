import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const requiredEnvVars = [
  'EMAIL_HOST',
  'EMAIL_PORT',
  'EMAIL_USER',
  'EMAIL_PASS',
  'EMAIL_FROM',
  'NEXT_PUBLIC_APP_URL'
]

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`)
    process.exit(1)
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('competitor-finder')

    // Find user
    const user = await db.collection('users').findOne({ email })
    if (!user) {
      // We don't want to reveal if the email exists or not for security reasons
      return NextResponse.json({ message: 'If an account exists for that email, we have sent password reset instructions.' }, { status: 200 })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex')
    const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now

    // Update user with reset token and expiry
    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { resetToken, resetTokenExpiry } }
    )

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`

    // Send email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      })
      console.log(`Password reset email sent to ${user.email}`)
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      return NextResponse.json({ message: `An error occurred while sending the password reset email: ${emailError}` }, { status: 500 })
    }

    return NextResponse.json({ message: 'If an account exists for that email, we have sent password reset instructions.' }, { status: 200 })
  } catch (error) {
    console.error('Forgot password error:', error)
    let errorMessage = 'An error occurred during the password reset process'
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}