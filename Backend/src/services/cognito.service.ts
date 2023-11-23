/* eslint-disable @typescript-eslint/promise-function-async */
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import { IUsuarioCognito } from '../interfaces/IUsuario'

const poolData = {
  UserPoolId: process.env.USER_POOL_ID as string,
  ClientId: process.env.CLIENT_ID as string
}

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

const registrarUsuario = (usuarioCognito: IUsuarioCognito): Promise<any> => {
  const attributeList: any[] = []
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'preferred_username', Value: usuarioCognito.username }))

  return new Promise<string>((resolve, reject) => {
    userPool.signUp(usuarioCognito.email, usuarioCognito.password, attributeList, [], (err, result) => {
      if (err !== null) {
        reject(new Error(err?.message))
      }
      resolve(result?.user.getUsername() as string)
    })
  })
}

const logearUsuario = (email: string, password: string): Promise<any> => {
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: email,
    Password: password
  })
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: email,
    Pool: userPool
  })

  return new Promise<string>((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => resolve(result.isValid() as unknown as string),
      onFailure: (err) => reject(new Error(err.message))
    })
  })
}

const confirmarUsuario = (email: string, codigo: string): Promise<any> => {
  const userData = {
    Username: email,
    Pool: userPool
  }
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

  return new Promise<string>((resolve, reject) => {
    cognitoUser.confirmRegistration(codigo, true, (err, result) => {
      if (err !== null) {
        reject(new Error(err?.message))
      }
      resolve(result?.toString() as string)
    })
  })
}

const olvidarContrasenia = (email: string): Promise<any> => {
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: email,
    Pool: userPool
  })
  return new Promise<string>((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: (result) => resolve(result.toString()),
      onFailure: (err) => reject(new Error(err.message))
    })
  })
}

const restablecerContrasenia = (email: string, codigo: string, password: string): Promise<any> => {
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: email,
    Pool: userPool
  })
  return new Promise<string>((resolve, reject) => {
    cognitoUser.confirmPassword(codigo, password, {
      onSuccess: (result) => resolve(result.toString()),
      onFailure: (err) => reject(new Error(err.message))
    })
  })
}

export { registrarUsuario, logearUsuario, confirmarUsuario, olvidarContrasenia, restablecerContrasenia }
