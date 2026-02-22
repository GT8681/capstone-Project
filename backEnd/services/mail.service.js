import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // La tua email (es. gianni@gmail.com)
    pass: process.env.EMAIL_PASS  // La password per le app generata da Google
  }
});

export const sendWelcomeEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: '"Soccer Scout Pro" <noreply@soccerscout.com>',
    to: userEmail,
    subject: 'Benvenuto in Soccer Scout Pro!',
     html : `
       <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
    <div style="background-color: #007bff; padding: 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0;">Benvenuto in Soccer Scout Pro! ⚽</h1>
    </div>
    <div style="padding: 30px; background-color: #ffffff;">
      <p style="font-size: 18px; color: #333;">Ciao <strong>${userName}</strong>,</p>
      <p style="line-height: 1.6; color: #555;">
        Siamo entusiasti di averti con noi! La tua registrazione è stata completata con successo. 
        Ora hai accesso a tutti i nostri strumenti per scoprire e gestire i migliori talenti del calcio.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="http://localhost:4545/login" style="background-color: #28a745; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Accedi alla tua Dashboard</a>
      </div>
      <p style="font-size: 14px; color: #888;">Se non hai creato tu questo account, puoi ignorare questa email.</p>
    </div>
    <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #aaa;">
      &copy; 2024 Soccer Scout Pro - Tutti i diritti riservati
    </div>
  </div>

    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email inviata con successo a: " + userEmail);
  } catch (error) {
    console.error("Errore invio email:", error);
  }
};
