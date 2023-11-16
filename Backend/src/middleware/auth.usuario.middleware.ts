/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { IToken } from '../interfaces/IUsuario'

export const autorizado = (req: Request, res: Response, next: NextFunction): void => {
  const authorizationHeader = req.headers.authorization
  if (authorizationHeader !== undefined) {
    try {
      const token = authorizationHeader.split(' ')[1] // Bearer <token>
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IToken
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
