import { NextResponse } from 'next/server'

export async function GET() {
  const clientId = process.env.SLACK_CLIENT_ID
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/slack/callback`
  const scope = 'channels:read,chat:write'

  const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}`

  return NextResponse.redirect(slackAuthUrl)
}