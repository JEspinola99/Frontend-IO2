import { apiClient } from "@/helpers/validations/login/apiClient";
import { ITask } from "@/store/space";

export interface ICreateColumn {
    nombre: string;
    tableroId: number
}

export interface IUpdateColumns {
    columnId1: number
    tasksColumn1: ITask[]
    columnId2: number
    tasksColumn2: ITask[]
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

export const updateColums = (data: IUpdateColumns) => {
    const url = `column/update`
    return apiClient.patch(url, data)
}