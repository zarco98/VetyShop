const { SchemaTypeOptions } = require("mongoose");
const nodemailer= require("nodemailer")

const sendEmail= async options =>{
    const transport= nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "aab2923abaec78",
          pass: "7c527a62039056"
        }
      });
      const mensaje={
        from:"VetyShop Store <noreply@vetyshop.com>",
        to: options.email,
        subject: options.subject,
        text: options.mensaje
      }

      await transport.sendMail(mensaje)
}

module.exports=sendEmail;