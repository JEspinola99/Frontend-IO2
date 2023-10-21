import { apiClient } from "@/helpers/validations/login/apiClient";

export interface ICreateColumn {
    nombre: string;
    tableroId: number
}

export const createColumn = (data: ICreateColumn) => {
    const url = `column`;
    return apiClient.post(url, data)
}

export const deleteColumn = (id: number) => {
    const url = `column/${id}`
    return apiClient.delete(url)
}

export const updateColumn = (data: any, id:number) => {
    const url = `column/${id}`
    const fetchData = {
        nombre: data
    }
    return apiClient.put(url, fetchData)
}