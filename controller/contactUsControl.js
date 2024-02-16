import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

const contactUs = asyncHandler(async (req, res) => {
    res.render("contactUs.ejs");
});

const Data = asyncHandler(async (req, res) => {

        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            auth: {
                user: 'hero.sanat.rishit2016@gmail.com',
                pass:  'tBXLnWIY6Gs50b4T'
                      
            }
        });
    
        // Message object
        let message = {
            from: req.body.email,
            to: "mehrotrasanat2006@gmail.com",
            subject: 'Feedback',
            text: req.body.name + " - " + req.body.message ,
        };

        let message_2= {
            from: "mehrotrasanat2006@gmail.com",
            to: req.body.email,
            subject: 'Thank You for Contacting SeaBirds!',
            text: 
           `Dear ${req.body.name},
            Thank you for reaching out to SeaBirds! Your message has been received loud and clear, and we're excited to assist you with any questions or concerns you may have.
            
            Our dedicated team is already hard at work addressing your inquiry. Rest assured, we'll provide you with the best possible assistance and guidance to ensure your experience with SeaBirds is nothing short of exceptional.
            
            While we work on resolving your query, feel free to explore more about SeaBirds on our website or through our social media channels.
            
            Thank you once again for choosing SeaBirds. We truly appreciate your trust and look forward to serving you.
            
            Warm regards,
            SeaBirds Team`,
        };
    
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
    
            console.log('Message sent: %s', info.messageId); 
        });

        transporter.sendMail(message_2, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
    
            console.log('Message sent: %s', info.messageId); 
        });

        
    });
   
export  {contactUs,Data};