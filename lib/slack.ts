/* eslint-disable @typescript-eslint/no-unused-vars */
import { App } from '@slack/bolt';

if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_SIGNING_SECRET) {
  throw new Error('Missing Slack bot token or signing secret');
}

export const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true,
});

slackApp.command('/update', async ({ command, ack, respond }) => {
  await ack();
  try {
    await respond({
      response_type: 'in_channel',
      text: 'Welcome to the updates channel'
    });
  } catch (error) {
    console.error('Error responding to /update command:', error);
    await respond({
      response_type: 'ephemeral',
      text: 'Sorry, there was an error processing your command. Please try again later.'
    });
  }
});

// Handle message events
slackApp.message('hello', async ({ message, say }) => {
  await say(`Hey there <@${message}>!`);
});