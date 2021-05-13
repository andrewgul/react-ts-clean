import BaseViewModel from '../BaseViewModel'

// Интерфейс, который будет доступен во View
// Тут объявляются все публичные поля, которые будут 
// использованы во View
export default interface AuthViewModel extends BaseViewModel {
    emailQuery: string
    passwordQuery: string
    isSignInButtonVisible: boolean
    isSignOutButtonVisible: boolean

    isShowError: boolean
    errorMessage: string

    authStatus: string
    isAuthStatusPositive: boolean

    onEmailQueryChanged: (loginQuery: string) => void
    onPasswordQueryChanged: (passwordQuery: string) => void
    onClickSignIn: () => void
    onClickSignOut: () => void
}