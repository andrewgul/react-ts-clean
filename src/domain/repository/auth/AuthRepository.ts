import ValidationResult from '../../entity/auth/structures/ValidationResult'
import AuthorizationResult from '../../entity/auth/structures/AuthorizationResult'

// Сначала объявляем интерфейс, который потом реализует класс для доступа к API
export default interface AuthRepository {
    validateCredentials(email: string, password: string): Promise<ValidationResult>

    login(email: string, password: string, validationKey: string): Promise<AuthorizationResult>
}