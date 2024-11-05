// index.js
require('dotenv').config();
const cron = require('node-cron');
const twilio = require('twilio');

// Twilio client initialization
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send SMS
const sendSMS = () => {
  client.messages.create({
    body: 'Reminder: Please fill out the bot!',
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.YOUR_PHONE_NUMBER,
  })
  .then(message => console.log(`SMS sent: ${message.sid}`))
  .catch(error => console.error('Error sending SMS:', error));
};

// Cron job to run every day at 5 PM IST
cron.schedule('30 11 * * *', () => { // 5 PM IST = 11:30 AM UTC
  const today = new Date();
  const endDate = new Date('2025-01-08');

  if (today <= endDate) {
    sendSMS();
  } else {
    console.log('Cron job end date reached. No SMS sent.');
  }
}, {
  timezone: "Asia/Kolkata"
});

// For testing: send an SMS right now
if (process.env.TEST_MODE === 'true') {
  console.log("TEST_MODE is ON: Sending test SMS now...");
  sendSMS();
}

console.log("Cron job set up to send daily SMS at 5 PM IST.");
