import { apiClient } from "@/helpers/validations/login/apiClient"

export const getSpaceUsers = (id: number) => {
    const url = `work-space-user/getUsers/${id}`
    return apiClient.get(url)
}