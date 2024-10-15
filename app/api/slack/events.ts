/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextApiRequest, NextApiResponse } from 'next'
// import { App, ExpressReceiver,LogLevel } from '@slack/bolt'
// import { WebClient } from '@slack/web-api'
// import Excel from 'exceljs'
// import path from 'path'
// if (!process.env.SLACK_SIGNING_SECRET || !process.env.SLACK_BOT_TOKEN) {
//   throw new Error('Missing required environment variables')
// }

// const receiver = new ExpressReceiver({
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   processBeforeResponse: true,
// })

// const app = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   receiver,
// })

// const web = new WebClient(process.env.SLACK_BOT_TOKEN)

// app.error(async (error) => {
//   console.error('An error occurred:', error)
// })

// app.command('/update', async ({ command, ack, respond }) => {
//   await ack()

//   try {
//     const workbook = new Excel.Workbook()
//     const filePath = path.resolve('./data/update.xlsx')
//     await workbook.xlsx.readFile(filePath)

//     const worksheet = workbook.getWorksheet(1)
//     if (!worksheet) {
//       throw new Error('Worksheet not found')
//     }

//     let output = ''
//     worksheet.eachRow((row, rowNumber) => {
//       output += `Row ${rowNumber}: `
//       row.eachCell((cell, colNumber) => {
//         output += `${cell.value} | `
//       })
//       output += '\n'
//     })

//     await web.chat.postMessage({
//       channel: command.channel_id,
//       text: 'Here is the update from the Excel sheet:',
//       blocks: [
//         {
//           type: 'section',
//           text: {
//             type: 'mrkdwn',
//             text: '```' + output + '```'
//           }
//         }
//       ]
//     })
//   } catch (error) {
//     console.error('Error processing /update command:', error)
//     await respond({
//       response_type: 'ephemeral',
//       text: 'Sorry, there was an error processing your request. Please try again later.'
//     })
//   }
// })
// app.command('/yolo', async ({ command, ack, say }) => {
//   // Acknowledge command request
//   await ack();
  
//   // Send the command text back as a message
//   await say(`${command.text}`);
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     console.log('Received Slack request:', JSON.stringify(req.body, null, 2))
//     try {
//       await (receiver as any).handleRequest(req, res)
//     } catch (error) {
//       console.error('Error handling Slack event:', error)
//       res.status(500).json({ error: 'Internal Server Error' })
//     }
//   } else {
//     res.setHeader('Allow', ['POST'])
//     res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// }



// import { NextApiRequest, NextApiResponse } from 'next'
// import { App } from '@slack/bolt'
// import Excel from 'exceljs'
// import path from 'path'
// import crypto from 'crypto'

// // Initialize the Slack app
// const app = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
// })

// // Function to verify Slack signature
// function verifySlackSignature(req: NextApiRequest) {
//   const slackSignature = req.headers['x-slack-signature'] as string
//   const slackTimestamp = req.headers['x-slack-request-timestamp'] as string

//   const baseString = `v0:${slackTimestamp}:${JSON.stringify(req.body)}`
//   const hmac = crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET as string)
//   const calculatedSignature = 'v0=' + hmac.update(baseString).digest('hex')

//   return crypto.timingSafeEqual(Buffer.from(slackSignature), Buffer.from(calculatedSignature))
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' })
//   }

//   const { body } = req

//   // Handle Slack URL verification
//   if (body.type === 'url_verification') {
//     return res.status(200).json({ challenge: body.challenge })
//   }

//   // Check for valid Slack command
//   if (body.command !== '/update') {
//     return res.status(400).json({ error: 'Invalid command' })
//   }

//   try {
//     // Verify the Slack request signature
//     if (!verifySlackSignature(req)) {
//       return res.status(401).json({ error: 'Invalid request signature' })
//     }

//     // Acknowledge the command immediately
//     res.status(200).send("Good working")

//     // Process the command asynchronously
//     processUpdateCommand(body)
//   } catch (error) {
//     console.error('Error processing Slack command:', error)
//     return res.status(500).json({ error: 'Internal server error' })
//   }
// }

// async function processUpdateCommand(body: any) {
//   try {
//     const workbook = new Excel.Workbook()
//     const filePath = path.resolve('../../utils/MIRO_Competitors_Data-4.xlsx')
//     await workbook.xlsx.readFile(filePath)

//     const worksheet = workbook.getWorksheet(1)

//     if (!worksheet) {
//       throw new Error('Worksheet not found')
//     }

//     let output = ''
//     worksheet.eachRow((row, rowNumber) => {
//       output += `Row ${rowNumber}: `
//       row.eachCell((cell, colNumber) => {
//         output += `${cell.value} | `
//       })
//       output += '\n'
//     })

//     // Send the response back to Slack
//     await app.client.chat.postMessage({
//       token: process.env.SLACK_BOT_TOKEN,
//       channel: body.channel_id,
//       text: 'Here is the update from the Excel sheet:',
//       blocks: [
//         {
//           type: 'section',
//           text: {
//             type: 'mrkdwn',
//             text: '```' + output + '```'
//           }
//         }
//       ]
//     })
//   } catch (error) {
//     console.error('Error processing update command:', error)
//     await app.client.chat.postMessage({
//       token: process.env.SLACK_BOT_TOKEN,
//       channel: body.channel_id,
//       text: 'Sorry, there was an error processing the update command. Please check the server logs for more information.'
//     })
//   }
// }
import { NextApiRequest, NextApiResponse } from 'next'
import { App, ExpressReceiver } from '@slack/bolt'

// Initialize the ExpressReceiver
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
  processBeforeResponse: true,
})

// Initialize the Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver,
})

// Handle the /update command
app.command('/update', async ({ command, ack, respond }) => {
  // Acknowledge the command request
  await ack()

  try {
    // Respond to the slash command
    await respond({
      response_type: 'in_channel', // This makes the response visible to all users in the channel
      text: 'Welcome to the updates channel'
    })
  } catch (error) {
    console.error('Error responding to /update command:', error)
    await respond({
      response_type: 'ephemeral', // This makes the response only visible to the user who issued the command
      text: 'Sorry, there was an error processing your command. Please try again later.'
    })
  }
})

// Handle Slack events
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Pass the request to the receiver
      await receiver.app(req, res)
    } catch (error) {
      console.error('Error processing Slack event:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}