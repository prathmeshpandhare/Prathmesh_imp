import { sendWhatsappMessage } from "../utils/sendWhatsappMessage.js";
import Company from "../models/Company.js";
import Driver from "../models/Driver.js";

// Example usage
const company = await Company.findById(companyId);
const driver = await Driver.findById(driverId);

const message = `New Transport Record added. Details:\nStation: ${station}\nAmount: ₹${amount}`;

if (company?.contact) await sendWhatsappMessage(company.contact, message);
if (driver?.contact) await sendWhatsappMessage(driver.contact, message);
