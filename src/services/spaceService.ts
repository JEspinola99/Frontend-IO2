import { apiClient } from "@/helpers/validations/login/apiClient";

export const getSpace = (id: string) => {
  const url = `work-space/${id}`;
  return apiClient.get(url);
};

export const createSpace = (data: any) => {
  const url = `work-space`;
  return apiClient.post(url, data);
};

export const updateSpace = (data: any, id:number) => {
    const url = `work-space/${id}`
    return apiClient.put(url, data)
}

export const createBoard = (data:any) => {
    const url = `boards`
    return apiClient.post(url, data)
}

export const getBoard = (id: number, usuarioId?: number|null) => {
  const url = `boards/${id}?usuarioId=${usuarioId}`
  return apiClient.get(url)
}