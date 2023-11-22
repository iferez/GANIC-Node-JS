/* eslint-disable @typescript-eslint/promise-function-async */
import transporter from '../config/mail'

const enviarEmail = (obj: any): void => {
  console.log('Enviando email a ', obj.email)
  transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: obj.email, // list of receivers
    subject: obj.subject, // Subject line
    html: obj.html // html body
  }).then(() => console.log('Email enviado correctamente'))
    .catch((error) => {
      console.log(error.message)
      throw new Error('Error al enviar el email')
    })
}

export { enviarEmail }
