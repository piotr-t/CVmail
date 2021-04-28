var express = require('express');
var router = express.Router();
var smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require("nodemailer");
require ('dotenv').config();



const createTransporter = async () => {
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  return nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD
    }
  }));
  
}

const genMessageEmail = (mailAdress, mailText) =>{

  return `<div>
  <h1>Otrzymałeś wiadonosć od ${mailAdress}</h1>
  <p>${mailText}</p>
  </div>`

}

let transporter = createTransporter();

router.post('/message', function(req, res, next) {
    // send mail with defined transport object
    console.log(req.body ,'body');
    let info = transporter.then(v=>{
      v.sendMail({
        from: `${req.body.emailName}`, // sender address
        to: process.env.EMAIL, // list of receivers
        subject: `${req.body.textareaName}?`, // Subject line
        text: `${req.body.textareaName}?`, // plain text body
        html: genMessageEmail(req.body.emailName, req.body.textareaName) // html body
      },(v)=>{});
    })
    res.send({message:'wiadomość została wysłana'});
});

router.get('/message',(req, res)=>{
  res.send('https://piotrt.ct8.pl/CV')
})


module.exports = router;
