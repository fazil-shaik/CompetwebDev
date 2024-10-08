import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const slackError = searchParams.get('error')

  if (slackError) {
    console.error('Slack OAuth error:', slackError)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=slack_auth_failed&reason=${encodeURIComponent(slackError)}`)
  }

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=slack_auth_failed&reason=no_code`)
  }

  try {
    const response = await fetch('https://slack.com/api/oauth.v2.access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.SLACK_CLIENT_ID!,
        client_secret: process.env.SLACK_CLIENT_SECRET!,
        code: code,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/slack/callback`,
      }),
    })

    const data = await response.json()

    if (!data.ok) {
      console.error('Slack API error:', data.error)
      throw new Error(data.error)
    }

    // Save the access token to the user's document in the database
    const client = await clientPromise
    const db = client.db('competitor-finder')
    
    // Assuming you have the user's ID stored in the session or JWT
    // You'll need to implement a way to get the current user's ID here
    const userId = 'current_user_id'

    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { slackAccessToken: data.access_token } }
    )

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?slackConnected=true`)
  } catch (error: unknown) {
    console.error('Error exchanging code for token:', error)
    
    let errorMessage = 'An unknown error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }
    
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=slack_auth_failed&reason=${encodeURIComponent(errorMessage)}`)
  }
}