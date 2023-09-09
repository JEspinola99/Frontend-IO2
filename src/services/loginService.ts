import { apiClient } from "@/helpers/validations/login/apiClient"
import { loginData } from "@/interfaces/login"

export const login = (data: loginData) => {
    const url = "auth/signin"
    return apiClient.post(url, data)
}

export const signup = (data: loginData) => {
    const url = "auth/signup"
    return apiClient.post(url, data)
}

export const signout = () => {
    const url = "auth/signout"
    return apiClient.get(url)
}