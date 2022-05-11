import sgMail from '@sendgrid/mail';

sgMail.setApiKey("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");

const sendEmail = async (email, subject, message) => {
    const msg = {
        to: email,
        from: "tarifulislamfahim12@gmail.com",
        subject: subject,
        text: message,
    }

    try{
        await sgMail.send(msg);
    }catch(error){
        console.log(error.response.body.errors);
    }
}

export default sendEmail;