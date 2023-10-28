import { apiClient } from "@/helpers/validations/login/apiClient";
import { IEtiqueta } from "@/store/space";

export const getAll = ():Promise<{data: IEtiqueta[]}> => {
    const url = 'label';
    return apiClient.get(url)
}