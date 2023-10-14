import { apiClient } from "@/helpers/validations/login/apiClient"

export const getAllUsers = () => {
    const url = "users"
    return apiClient.get(url)
}