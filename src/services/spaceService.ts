import { apiClient } from "@/helpers/validations/login/apiClient";

export const getSpace = (id:string) => {
    const url = `work-space/${id}`
    return apiClient.get(url)
}

export const createSpace = (data: any) => {
    const url = `work-space/create/`
    console.log(data)
    return apiClient.post(url,data)
}