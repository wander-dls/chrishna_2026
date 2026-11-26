


export interface LoginFormProps {
  redirectTo: string;
}

export interface LoginFormState {
    email: string,
    password: string,
    showPassword: boolean,
    isSubmitted: boolean,
    error: string
}

