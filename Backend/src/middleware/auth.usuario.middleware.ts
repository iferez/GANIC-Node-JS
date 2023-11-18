/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response, NextFunction } from 'express'
import { verificarJWT } from '../services/auth.service'

export const autorizado = (req: Request, res: Response, next: NextFunction): void => {
  const authorizationHeader = req.headers.authorization
  if (authorizationHeader !== undefined) {
    try {
      const token = authorizationHeader.split(' ')[1] // Bearer <token>
      const decoded = verificarJWT(token)
      if (decoded.rol !== 'Administrador') {
        res.status(401).json({ message: 'No permitido el acceso' })
      } else {
        next()
      }
    } catch (error) {
      res.status(401).json({ message: 'Error al parsear el token' })
    }
  }
}
