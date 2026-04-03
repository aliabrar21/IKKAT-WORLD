import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    try {
        // Creates an ethereal test account on the fly if no SMTP provided
        // This is extremely helpful for local dev without environment variables!
        let transporter;
        if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
            transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT || 587,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
        } else {
            // Using a persistent dummy ethereal account for dev if none provided
            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'krista.batz@ethereal.email',
                    pass: 'YEqtQjX29rR3yT87X5'
                }
            });
        }

        const mailOptions = {
            from: '"Pochampally Ikkat" <noreply@pochampallyikkat.com>',
            to: options.email,
            subject: options.subject,
            html: options.html,
        };

        const info = await transporter.sendMail(mailOptions);
        
        console.log("-----------------------------------------");
        console.log("✉️ EMAIL SENT TO:", options.email);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        console.log("-----------------------------------------");

    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default sendEmail;
