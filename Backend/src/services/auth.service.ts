import jsonwebtoken from 'jsonwebtoken'

const generarJWT = (email: string, rol: string): string => {
  const payload = { email, rol }
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1 day'
  })
}

export { generarJWT }
