import React from 'react'
import './auth-component.css'
import AuthViewModel from '../../view-model/auth/AuthViewModel'
import BaseView from '../BaseView'

export interface AuthComponentProps {
    authViewModel: AuthViewModel
}

export interface AuthComponentState {
    emailQuery: string
    passwordQuery: string
    isSignInButtonVisible: boolean
    isSignOutButtonVisible: boolean

    isShowError: boolean
    errorMessage: string

    authStatus: string
    isAuthStatusPositive: boolean
}

export default class AuthComponent 
extends React.Component<AuthComponentProps, AuthComponentState>
implements BaseView {
    private authViewModel: AuthViewModel

    public constructor(props: AuthComponentProps) {
        super(props)

        const { authViewModel } = this.props
        this.authViewModel = authViewModel

        this.state = {
            emailQuery: authViewModel.emailQuery,
            passwordQuery: authViewModel.passwordQuery,
            isSignInButtonVisible: authViewModel.isSignInButtonVisible,
            isSignOutButtonVisible: authViewModel.isSignOutButtonVisible,

            isShowError: authViewModel.isShowError,
            errorMessage: authViewModel.errorMessage,

            authStatus: authViewModel.authStatus,
            isAuthStatusPositive: authViewModel.isAuthStatusPositive 
        }
    }


    public componentDidMount(): void {
        this.authViewModel.attachView(this)
    }

    public componentWillUnmount(): void {
        this.authViewModel.detachView()
    }

    public onViewModelChanged(): void {
        this.setState({
            emailQuery: this.authViewModel.emailQuery,
            passwordQuery: this.authViewModel.passwordQuery,
            isSignInButtonVisible: this.authViewModel.isSignInButtonVisible,
            isSignOutButtonVisible: this.authViewModel.isSignOutButtonVisible,

            isShowError: this.authViewModel.isShowError,
            errorMessage: this.authViewModel.errorMessage,

            authStatus: this.authViewModel.authStatus,
            isAuthStatusPositive: this.authViewModel.isAuthStatusPositive 
        })
    }

    public render() {
        const {
            emailQuery,
            passwordQuery,
            isSignInButtonVisible,
            isSignOutButtonVisible,

            isShowError,
            errorMessage,

            authStatus,
            isAuthStatusPositive
        } = this.state

        return (
            <div>TODO</div>
        )
    }
}