const { SchemaTypeOptions } = require("mongoose");
const nodemailer= require("nodemailer")

const sendEmail= async options =>{
    const transport= nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        auth: {
          user: "kevinscott26@hotmail.com",
          pass: "Scotty102030"
        }
      });
      const mensaje={
        from:"VetyShop Store <kevinscott26@hotmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.mensaje
      }

      await transport.sendMail(mensaje)
}

module.exports=sendEmail;