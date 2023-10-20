export interface IUsuario{
    nombre: string;
    apellido: string;
    email: string;
    username: string;
    password: string;
    direccion: string;
}

export interface IUsuarioLogin{
    username: string;
    password: string;
}

export interface IUsuarioRegistro{
    username: string;
    password: string;
    email: string;
}