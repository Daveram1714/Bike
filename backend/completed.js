// completed.js
import nodemailer from 'nodemailer';

export const Completed = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "Enter your G-email",
    pass: "Enter your pass key",
  },
});
