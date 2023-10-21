import { apiClient } from "@/helpers/validations/login/apiClient";

export interface ICreateColumn {
    nombre: string;
    tableroId: number
}

export const createColumn = (data: ICreateColumn) => {
    const url = `column`;
    return apiClient.post(url, data)
}