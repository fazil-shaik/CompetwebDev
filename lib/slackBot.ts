// import { App } from '@slack/bolt';
// import { ReadingOrder } from 'exceljs';

// const app = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   socketMode: true,
//   appToken: process.env.SLACK_APP_TOKEN,
// });

// app.command('/update', async ({ command, ack, say }) => {
//   await ack();

//   try {
//     const excelData = await readExcelFile();
//     let message = "Here's the latest update from the Excel sheet:\n\n";

//     excelData.forEach((row, index) => {
//       message += `${index + 1}. ${row.join(' | ')}\n`;
//     });

//     await say(message);
//   } catch (error) {
//     console.error(error);
//     await say('Sorry, there was an error reading the Excel file.');
//   }
// });

// export default app;