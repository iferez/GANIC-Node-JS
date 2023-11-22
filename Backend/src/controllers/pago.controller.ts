/* eslint-disable @typescript-eslint/promise-function-async */
import { Request, Response } from 'express'
import * as pagoValido from '../validators/pago.validators'
import { enviarEmail } from '../services/email.service'

const pagarOrdenDePago = (req: Request, res: Response): Response => {
  try {
    const datosValidos = pagoValido.obtenerPagoSchema.parse(req.body)
    console.table(datosValidos.listaProductos)
    enviarEmail({
      email: datosValidos.email,
      subject: 'Pago realizado correctamente',
      html: `<h1>Gracias por su compra</h1>
      <p>El monto pagado es: $${datosValidos.monto}</p>
      <p>Los productos comprados son:</p>
      <ul>
          ${datosValidos.listaProductos.map((producto) => `<li>${producto.nombre}</li>`).join('')}
      </ul>
      `
    })
    return res.status(200).json({ message: 'Pago realizado correctamente' })
  } catch (error: any) {
    return res.status(401).json({ error: error.errors })
  }
}

export { pagarOrdenDePago }