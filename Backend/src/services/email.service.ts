/* eslint-disable @typescript-eslint/promise-function-async */
import transporter from '../config/mail'

const enviarEmail = (obj: any): void => {
  console.info('Enviando email a ', obj.email)
  transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: obj.email, // list of receivers
    subject: obj.subject, // Subject line
    html: obj.html // html body
  }).catch((error) => { throw new Error(error.message) })
}

export { enviarEmail }
