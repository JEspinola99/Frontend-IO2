import { apiClient } from "@/helpers/validations/login/apiClient";
import { ITask } from "@/interfaces/task";

export const create = (data:ITask) => {
    const url = `tasks`
    return apiClient.post(url, data)
}