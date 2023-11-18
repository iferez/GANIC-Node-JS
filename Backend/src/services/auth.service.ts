import jsonwebtoken from 'jsonwebtoken'
import { IToken } from '../interfaces/IUsuario'

const generarJWT = (email: string, rol: string): string => {
  const payload = { email, rol }
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h'
  })
}

const verificarJWT = (token: string): IToken => {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET as string) as IToken
}

export { generarJWT, verificarJWT }
