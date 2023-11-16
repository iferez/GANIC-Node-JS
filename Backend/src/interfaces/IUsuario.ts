export interface IUsuario {
  id: number
  email: string
  username: string
  password: string
  nombre: string
  apellido: string
  direccion: string
  rol: string
}

export type IUsuarioInput = Omit<IUsuario, 'id' | 'habilitado'>

export type IUsuarioLogin = Pick<IUsuario, 'email' | 'password'>

export type IUsuarioCognito = Pick<IUsuario, 'email' | 'password' | 'username'>

export type IToken = Pick<IUsuario, 'email' | 'rol'>
