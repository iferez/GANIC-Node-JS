import { Request, Response } from 'express'

const obtenerIngredientes = (_req: Request, res: Response): Response => {
  return res.send('Bienvenido a la API de Sandwiches')
}

export { obtenerIngredientes }
