import { apiClient } from "@/helpers/validations/login/apiClient";
import { ITask } from "@/store/space";

export const create = (data:ITask):Promise<{data:ITask}> => {
    const url = `tasks`
    return apiClient.post(url, data)
}

export const deleteTask = (data: any) => {
    const url = `tasks`
    return apiClient.put(url, data)
}

export const getTask = (id:string):Promise<{data:ITask}> => {
    const url = `tasks/${id}`
    return apiClient.get(url)
}