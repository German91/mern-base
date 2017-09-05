'use strict';

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
});

const options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: 'views/email/',
    defaultLayout : 'base',
    partialsDir : 'views/partials/'
  },
    viewPath: 'views/email/',
    extName: '.hbs'
 };

transporter.use('compile', hbs(options));

/**
 * Send email
 * @param  {String}  from       Email
 * @param  {[type]}  to         recipies
 * @param  {[type]}  subject    Email subject
 * @param  {[type]}  template   Html template
 * @param  {[type]}  ctx        data
 */
exports.sendEmail = async (from, to, subject, template, ctx) => {
  const mail = { from, to, subject, template, ctx };

  try {
    await transporter.sendMail(mail);
  } catch (e) {
    return e;
  }
};
