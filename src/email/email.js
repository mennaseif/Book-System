import nodemailer from "nodemailer"
import { emailHtml } from "./email.Html.js";
import jwt from "jsonwebtoken"

export const sendEmails = async (email) =>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: "menna.seif.122@gmail.com",
          pass: "xbtzirmdpetzubbh",
        },
      });

      jwt.sign({email}, 'menna', async (err,token) =>{
        if(err) return res.json(err)
        const info = await transporter.sendMail({
          from: '"Book System👻" <menna.seif.122@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Hello ✔", // Subject line
          html: emailHtml(token), // html body
        });
        console.log("Message sent: %s", info.messageId);
        
      })

     
}