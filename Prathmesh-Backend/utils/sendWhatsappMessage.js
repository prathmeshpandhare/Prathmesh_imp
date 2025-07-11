import twilio from "twilio";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromWhatsapp = "whatsapp:+14155238886"; // Twilio sandbox number

const client = new twilio(accountSid, authToken);

export const sendWhatsappMessage = async (toNumber, message) => {
  try {
    await client.messages.create({
      body: message,
      from: fromWhatsapp,
      to: `whatsapp:${toNumber}`,
    });
  } catch (error) {
    console.error("WhatsApp message failed:", error.message);
  }
};
