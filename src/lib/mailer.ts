import nodemailer, { SendMailOptions } from "nodemailer";

// const ses = new aws.SES({
//   apiVersion: "2010-12-01",
//   region: config.awsRegion,
//   credentials: new Credentials({
//     accessKeyId: config.awsAccessKeyId,
//     secretAccessKey: config.awsSecretAccessKey
//   }),
//   endpoint: config.awsEndpoint,
// })

// let transporter = nodemailer.createTransport({
//   SES: { ses, aws }
// })


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "",
  port: Number(process.env.SMTP_PORT) || 1025,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(mailOptions: SendMailOptions): Promise<boolean> {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info: any) {
      if (error) {
        console.log("error is " + error)
        resolve(false) // or use rejcet(false) but then you will have to handle errors
      } else {
        console.log("Email sent: " + info.response)
        resolve(true)
      }
    })
  })
}
