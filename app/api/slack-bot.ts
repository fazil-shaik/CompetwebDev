import { App, LogLevel } from '@slack/bolt';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize the Slack app with Socket Mode and more verbose logging
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  logLevel: LogLevel.DEBUG,
});

app.command('/update', async ({ command, ack, respond, logger }) => {
  await ack();

  try {
    logger.info('Received /update command', command);

    await respond({
      response_type: 'in_channel',
      text: 'Welcome to the updates channel'
    });

    logger.info('Successfully responded to /update command');
  } catch (error) {
    logger.error('Error responding to /update command:', error);
    try {
      await respond({
        response_type: 'ephemeral',
        text: 'Sorry, there was an error processing your command. Please try again later.'
      });
    } catch (respondError) {
      logger.error('Failed to send error message:', respondError);
    }
  }
});

// Handle message events
app.message('hello', async ({ message, say, logger }) => {
  try {
    if ('user' in message) {
      await say(`Hey there <@${message.user}>!`);
      logger.info('Responded to hello message', { user: message.user });
    }
  } catch (error) {
    logger.error('Error responding to hello message:', error);
  }
});

// Error handler
app.error(async (error) => {
  console.error('An error occurred:', error);
});

// Start the app
(async () => {
  try {
    await app.start();
    console.log('⚡️ Bolt app is running with Socket Mode!');
  } catch (error) {
    console.error('Failed to start app:', error);
  }
})();

// Export a dummy handler to satisfy Next.js API route requirements
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Slack bot is running with Socket Mode' });
}