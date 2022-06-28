import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, subject, message) => {
    const msg = {
        to: email,
        from: "tarifulislamfahim12@gmail.com",
        subject: subject,
        text: message,
    }

    try{
        await sgMail.send(msg);
        console.log(`${message} sent to this ${email}`);
    }catch(error){
        console.log(error.response.body.errors);
    }
}

export default sendEmail;