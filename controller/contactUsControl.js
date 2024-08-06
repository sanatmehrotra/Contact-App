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
            subject: 'Thank You for Your Feedback',
            text: 
           `Dear ${req.body.name},
            
           Thank you for taking the time to share your feedback with us! Your insights are valuable and contribute to our ongoing efforts to improve.
           
           We appreciate your input and want you to know that your feedback has been noted. If you have any further thoughts or suggestions, please feel free to reach out.
           
           Once again, thank you for your valuable feedback.
           
           Best regards,
           Team Cubix`,
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