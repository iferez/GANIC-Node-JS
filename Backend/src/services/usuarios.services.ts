import listaUsuarios from '../data/usuarios.json'
import { IUsuario, UsuarioInput } from '../interfaces/IUsuario'
import fs from 'fs'

const arrayUsuarios: IUsuario[] = listaUsuarios as IUsuario[]

const obtenerUsuarios = (): IUsuario[] => {
  return arrayUsuarios
}

const agregarUsuario = (usuario: UsuarioInput): IUsuario => {
  const nuevoUsuario: IUsuario = {
    id: Math.max(...listaUsuarios.map((usuario) => usuario.id)) + 1,
    email: usuario.email,
    username: usuario.username,
    password: usuario.password,
    nombre: 'usuario.nombre',
    apellido: 'usuario.apellido',
    direccion: 'usuario.direccion'
  }
  let jsonData = []
  try {
    jsonData = JSON.parse(fs.readFileSync('/home/cris/Documents/backend/src/data/usuarios.json', 'utf8'))
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error)
  }

  // Agrega el nuevo sandwich al arreglo existente
  jsonData.push(nuevoUsuario)

  // Guarda los datos en el archivo JSON
  try {
    fs.writeFileSync('/home/cris/Documents/backend/src/data/usuarios.json', JSON.stringify(jsonData, null, 2))
  } catch (error) {
    console.error('Error al guardar los datos en el archivo JSON:', error)
  }
  return nuevoUsuario
}

const obtenerUsuarioPorId = (id: number): IUsuario | undefined => {
  return arrayUsuarios.find((usuario) => usuario.id === id)
}

const obtenerUsuarioPorUsernameYPassword = (user: string, pass: string): IUsuario | undefined => {
  console.log(user, pass)
  return arrayUsuarios.find((usuario) => usuario.username === user && usuario.password === pass)
}

const obtenerUsuarioPorUsername = (user: string): IUsuario | undefined => {
  return arrayUsuarios.find((usuario) => usuario.username === user)
}

export { obtenerUsuarios, agregarUsuario, obtenerUsuarioPorId, obtenerUsuarioPorUsernameYPassword, obtenerUsuarioPorUsername }