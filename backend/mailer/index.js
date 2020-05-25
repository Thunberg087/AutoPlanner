const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "send.one.com",
  port: 465,
  secure: true,
  auth: {
    user: 'AutoPlanner@aviliax.com',
    pass: 'Mhzu@vimk9+z8jm'
  }
});



module.exports = transporter