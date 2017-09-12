'use strict';

const Nodemailer = require('nodemailer');
const path = require('path');
const EmailTemplate = require('email-templates').EmailTemplate;

const transporter = Nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
});

/**
 * Rende a template and send an email
 * @param  {Object}   user          User's email and data to send
 * @param  {String}   subject       Email subject
 * @param  {String}   templateName  Templane to render
 * @param  {Function} callback      Callback
 * @return {Response}
 */
exports.sendMail = async (user, subject, templateName) => {
  const templatesDir = path.resolve(__dirname, '..', 'templates');
  const template = new EmailTemplate(path.join(templatesDir, templateName));

  try {
    let results = await template.render(user);
    let response = transporter.sendMail({ from: process.env.EMAIL_USER, to: user.email, subject, html: results.html });

    return response.message;
  } catch (err) {
    return err;
  }
};
