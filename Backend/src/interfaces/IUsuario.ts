export interface IUsuario {
    id: number
    email: string
    username: string
    password: string
    nombre: string
    apellido: string
    direccion: string
  }
  
  export type UsuarioInput = Omit<IUsuario, 'id'>