import AuthRepository from '../../domain/repository/auth/AuthRepository'
import ValidationResult from '../../domain/entity/auth/stuctures/ValidationResult'
import AuthorizationResult from '../../domain/entity/auth/stuctures/AuthorizationResult'

// Repository implemetation

// Класс, имитируюший доступ к API
export default class AuthFakeApi implements AuthRepository {
    validateCredentials(email: string, password: string): Promise<ValidationResult> {

        return new Promise((resolve, reject) => {
            // Правило, которое должен был бы поддерживать сервер
            if (password.length < 5 || password.length > 40) {
                reject(new Error('Invalid length for password'))

                return
            }

            resolve({
                validationKey: 'A34dZ7'
            })
        })
    }   

    login(email: string, password: string, validationKey: string): Promise<AuthorizationResult> {

        return new Promise((resolve, reject) => {
            if (validationKey = 'A34dZ7') {
                if (email === 'user@email.com' && password === '!QAZ2wsx') {
                    resolve({
                        authorizationToken: 'Bearer 1337amdakd322mkmd'
                    })
                    return
                } else {
                    reject(new Error('Email or password is incorrect'))
                    return
                }
            } else {
                reject(new Error('Validation key is incorrect'))
            }
        })
    }
}