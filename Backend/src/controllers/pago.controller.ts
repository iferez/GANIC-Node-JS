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
      <p>El pago se ha realizado correctamente</p>
      <p>Los productos comprados son:</p>
      <table style="width: 100%; border-collapse: collapse;">
          <thead>
              <tr>
                  <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Nombre</th>
                  <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Precio</th>
                  <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Total</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  ${datosValidos.listaProductos
                .map(
                  (producto) => `
                  <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;">${producto.nombre}</td>
                      <td style="padding: 8px; border: 1px solid #ddd;">$${producto.precio}</td>
                      <td style="padding: 8px; border: 1px solid #ddd;"> </td>
                  </tr>`
                )
                .join('')}
                  <td colspan="2" style="padding: 8px; border: 1px solid #ddd; text-align: right;">Total:</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">$${datosValidos.monto}</td>
              </tr>
          </tbody>
      </table>
      `
    })
    return res.status(200).json({ message: 'Pago realizado correctamente' })
  } catch (error: any) {
    return res.status(401).json({ error: error.errors })
  }
}

export { pagarOrdenDePago }