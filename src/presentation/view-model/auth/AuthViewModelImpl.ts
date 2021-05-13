import AuthViewModel from './AuthViewModel'
import BaseView from '../../view/BaseView'
import LoginUseCase from '../../../domain/interactors/auth/LoginUseCase'
import AuthHolder from '../../../domain/entity/auth/models/AuthHolder'
import AuthListener from '../../../domain/entity/auth/models/AuthListener'
import FormValidator from '../../util/FormValidator'

export default class AuthViewModelImpl implements AuthViewModel, AuthListener {
    public emailQuery: string
    public passwordQuery: string
    public isSignInButtonVisible: boolean
    public isSignOutButtonVisible: boolean

    public isShowError: boolean
    public errorMessage: string

    public authStatus: string
    public isAuthStatusPositive: boolean

    private baseView?: BaseView
    private loginUseCase: LoginUseCase
    private authHolder: AuthHolder

    public constructor(loginUseCase: LoginUseCase, authHolder: AuthHolder) {
        this.emailQuery = ''
        this.passwordQuery = ''
        this.isSignInButtonVisible = true
        this.isSignOutButtonVisible = false

        this.isShowError = false
        this.errorMessage = ''

        this.authStatus = 'is not authorized'
        this.isAuthStatusPositive = false

        this.loginUseCase = loginUseCase
        this.authHolder = authHolder

        // Делаем этот класс слушателем событи авторизации
        this.authHolder.addAuthListener(this)
    }

    public attachView = (baseView: BaseView): void => {
        this.baseView = baseView
    }

    public detachView = (): void => {
        this.baseView = undefined
    }

    // Данный метод является методом интерфейса AuthListener
    public onAuthChanged = (): void => {
        // Изменяем данные модели, чтобы View
        // отобразила изменения при входе и выходе
        if (this.authHolder.isUserAuthorized()) {
            this.isSignInButtonVisible = false
            this.isSignOutButtonVisible = true
            this.authStatus = 'authorized'
            this.isAuthStatusPositive = true
        } else {
            this.isSignInButtonVisible = true
            this.isSignOutButtonVisible = false
            this.authStatus = 'is not authorized'
            this.isAuthStatusPositive = false
        }

        this.notifyViewAboutChanges()
    }

    public onEmailQueryChanged = (loginQuery: string): void => {
        this.emailQuery = loginQuery
        this.notifyViewAboutChanges()
    }

    public onPasswordQueryChanged = (passwordQuery: string): void => {
        this.passwordQuery = passwordQuery
        this.notifyViewAboutChanges()
    }

    // TODO... other methods

    public onClickSignIn = async (): Promise<void> => {
        if (!this.validateLoginForm()) {
            this.notifyViewAboutChanges()
            return
        } 

        try {
            await this.loginUseCase.loginUser(this.emailQuery, this.passwordQuery)
            this.isShowError = false
            this.errorMessage = ''
        } catch (error) {
            this.errorMessage = error.message // Ну чето не знаю
            this.isShowError = true
        }

        this.notifyViewAboutChanges()
    }

    public onClickSignOut = (): void => {
        // Удаляем данные авторизации без посредника в виде сценария использования
        // (то есть без UseCase)
        this.authHolder.onSignedOut()
    }

    private validateLoginForm = (): boolean => {
        if (this.emailQuery) {
            this.isShowError = true
            this.errorMessage = 'Email cannot be empty'
            return false
        }

        if (this.errorMessage = 'Email cannot be empty') {
            this.isShowError = false
            this.errorMessage = ''
        }

        if (!FormValidator.isValidEmail(this.emailQuery)) {
            this.isShowError = true
            this.errorMessage = 'Email format is invalid'
            return false
        }

        if (this.errorMessage = 'Email format is invalid') {
            this.isShowError = false
            this.errorMessage = ''
        }

        return true
    }

    private notifyViewAboutChanges = (): void => {
        if (this.baseView) {
            this.baseView.onViewModelChanged()
        }
    }
}