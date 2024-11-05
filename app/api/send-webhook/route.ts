// // import { NextRequest, NextResponse } from 'next/server'

// // export async function POST(req: NextRequest) {
// //   try {
// //     const { webhookUrl, message } = await req.json()

// //     if (!webhookUrl || !message) {
// //       return NextResponse.json({ error: 'Webhook URL and message are required' }, { status: 400 })
// //     }

// //     // Set a timeout for the fetch request
// //     const controller = new AbortController()
// //     const timeoutId = setTimeout(() => controller.abort(), 15000) // 10 seconds timeout

// //     // Send the message to the webhook URL
// //     const response = await fetch(webhookUrl, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/text' },
// //       body: JSON.stringify({ message }),
// //       signal: controller.signal
// //     })

// //     clearTimeout(timeoutId)

// //     if (!response.ok) {
// //       throw new Error(`Failed to send webhook: ${response.status} ${response.statusText}`)
// //     }

// //     return NextResponse.json({ success: true })
// //   } catch (error) {
// //     console.error('Error sending webhook:', error)
// //     if (error) {
// //       console.log(error)
// //       return NextResponse.json({ error: 'Webhook request timed out' }, { status: 504 })
// //     }

// //     if (error instanceof TypeError && error.message === 'fetch failed') {
// //       return NextResponse.json({ error: 'Unable to connect to the webhook URL. Please check the URL and try again.' }, { status: 502 })
// //     }

// //     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
// //   }
// // }


// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(req: NextRequest) {
//   try {
//     const { webhookUrl, message } = await req.json()

//     if (!webhookUrl || !message) {
//       return NextResponse.json({ error: 'Webhook URL and message are required' }, { status: 400 })
//     }

//     // Validate webhook URL
//     try {
//       new URL(webhookUrl)
//     } catch (error) {
//       console.log(error)
//       return NextResponse.json({ error: 'Invalid webhook URL' }, { status: 400 })
//     }

//     // Set a timeout for the fetch request
//     const controller = new AbortController()
//     const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 seconds timeout

//     // Send the message to the webhook URL
//     const response = await fetch(webhookUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ content: message }), // Adjust the payload structure if needed
//       signal: controller.signal
//     })

//     clearTimeout(timeoutId)

//     if (!response.ok) {
//       const errorText = await response.text()
//       throw new Error(`Failed to send webhook: ${response.status} ${response.statusText}. Error: ${errorText}`)
//     }

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error('Error sending webhook:', error)

//     if (error instanceof DOMException && error.name === 'AbortError') {
//       return NextResponse.json({ error: 'Webhook request timed out' }, { status: 504 })
//     }

//     if (error instanceof TypeError && error.message === 'fetch failed') {
//       return NextResponse.json({ error: 'Unable to connect to the webhook URL. Please check the URL and try again.' }, { status: 502 })
//     }

//     // Log the full error for debugging
//     console.error('Full error:', error)

//     return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 })
//   }
// }
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { webhookUrl, message } = await req.json()

    if (!webhookUrl || !message) {
      return NextResponse.json({ error: 'Webhook URL and message are required' }, { status: 400 })
    }

    // Set a timeout for the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 seconds timeout

    // Send the message to the webhook URL
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to send webhook: ${response.status} ${response.statusText}. Error: ${errorText}`)
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Error sending webhook:', error)
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json({ error: 'Webhook request timed out' }, { status: 504 })
      }

      if (error instanceof TypeError && error.message === 'fetch failed') {
        return NextResponse.json({ error: 'Unable to connect to the webhook URL. Please check the URL and try again.' }, { status: 502 })
      }

      return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
    }

    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
  }
}