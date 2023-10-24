import { apiClient } from "@/helpers/validations/login/apiClient";
import { ITask } from "@/store/space";

export const create = (data:ITask):Promise<{data:ITask}> => {
    const url = `tasks`
    return apiClient.post(url, data)
}