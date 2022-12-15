const nodemailer = require("nodemailer");

module.exports = {
    sendEmail: async (to, name, password) => {

        var transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });


        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: `${to}`,
            subject: 'Property Management',
            text: 'One Time Password',
            html: `<!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet">
            </head>
            <style>
                body {
                    font-family: 'Ubuntu', sans-serif;
                    background-color: #f5f5f5;
                }
            
                * {
                    box-sizing: border-box;
                }
            
                p:last-child {
                    margin-top: 0;
                }
            
                img {
                    max-width: 100%;
                }
            </style>
            
            <body style="margin: 0; padding: 0;">
                <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="padding: 20px 0 30px 0;">
                            <table align="center" cellpadding="0" cellspacing="0" width="600" style=" border-collapse: collapse; border: 1px solid #ececec; background-color: #fff;">
                                <tr>
                                    <td align="center" style="position: relative;">
                                        <div
                                        class="company-logo-align"
                                        style=" padding: 2rem 2rem 1rem 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto;"
                                        align="center">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="user-information" 
                                        style="padding: 25px; background-image: linear-gradient(156deg, #144337, #144337, #144337)"
                                        >
                                        <h1 align="center" style="color: #fff; font-size: 35px; font-weight: 500; margin: 0 0 0.1rem 0;">Welcome to GERMEN REAL ESTATE</h1>
                                        <p align="center" style="color: #fff; font-size: 30px; font-weight: 500; margin: 0 0 0 0;">Hi, ${name} </p>
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td style="padding: 3rem 2rem 1rem 2rem;">
                                      <h2 align="center" style="color: #585d6a; font-size: 30px; ">Thanks very much!</h2>
                                      <h2 align="center" style="color: #585d6a; font-size: 30px; ">Your password to login is: </br>'${password}'</h2>
                                      <p align="center" style="color: #585d6a; font-size: 14px;">Don't share with anyone else!</p>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="padding: 2rem;">
                                      <p align="center" style="color: #585d6a; font-size: 14px; margin: 0;">
                                                     </p>
                                    </td>
                                </tr>
                              
                        
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            
            </html>`,
        };

        try {
            await transporter.sendMail(mailOptions)
        } catch (error) {
            console.log("🚀 ~ file: mail.service.js:102 ~ sendEmail: ~ error", error)
            return new Error('mail not sent, plase try again later');
        }
    },
}
