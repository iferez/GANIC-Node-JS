import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import { IUsuarioCognito } from '../interfaces/IUsuario'

const poolData = {
  UserPoolId: process.env.USER_POOL_ID as string,
  ClientId: process.env.CLIENT_ID as string
}

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

const registrarUsuario = async (usuarioCognito: IUsuarioCognito): Promise<any> => {
  const attributeList: any[] = []
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'preferred_username', Value: usuarioCognito.username }))
  return await new Promise<string>((resolve, reject) => {
    userPool.signUp(usuarioCognito.email, usuarioCognito.password, attributeList, [], (err, result) => {
      if (err !== null) {
        reject(new Error(err?.message))
      }
      resolve(result?.user.getUsername() as string)
    })
  })
}

const logearUsuario = async (email: string, password: string): Promise<any> => {
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: email,
    Password: password
  })
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: email,
    Pool: userPool
  })
  return await new Promise<string>((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve(result.getIdToken().getJwtToken()) // <== Token de Acceso Cognito
      },
      onFailure: (err) => {
        reject(new Error(err.message))
      }
    })
  })
}

const confirmarUsuario = async (email: string, codigo: string): Promise<any> => {
  const userData = {
    Username: email,
    Pool: userPool
  }
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
  return await new Promise<string>((resolve, reject) => {
    cognitoUser.confirmRegistration(codigo, true, (err, result) => {
      if (err !== null) {
        reject(new Error(err?.message))
      }
      resolve(result?.toString() as string)
    })
  })
}

const olvidarContrasenia = async (email: string): Promise<any> => {
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: email,
    Pool: userPool
  })
  return await new Promise<string>((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: (result) => {
        console.log(result)
        resolve(result.toString())
      },
      onFailure: (err) => {
        reject(new Error(err.message))
      }
    })
  })
}

export { registrarUsuario, logearUsuario, confirmarUsuario, olvidarContrasenia }
