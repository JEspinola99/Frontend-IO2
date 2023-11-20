import { apiClient } from "@/helpers/validations/login/apiClient";

export const getBoard = (id:string) => {
    const url = `boards/${id}`
    return apiClient.get(url)
}

export const createBoard = (data: any) => {
    const url = `boards/create/`
    console.log(data)
    return apiClient.post(url,data)
}
