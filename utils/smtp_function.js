const nodemailer=require('nodemailer');
async function sendEmail(userEmail,message){
   const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASSWORD
    }
   });
   const mailOptions={
    from:process.env.AUTH_EMAIL,
    to:userEmail,
    subject:"MedApp Verification Code",
    html: 
         `<h1>MedApp E-Mail Verification</h1>
         <p>Your Verification Code is:</p>
<h2 style="color :blue;">${message}  </h2>
<p>Please Enter this code on verification page to complete your registration process</p>  
<p>If you did not request this email,please ignore this email</p>     `
      

   };
   try{
      await transporter.sendMail(mailOptions);
      console.log("Verification Email sent");
   }catch(error){
     console.log("Email sending failed with an error:"+error);
   }

}
module.exports=sendEmail;