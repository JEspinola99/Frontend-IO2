import { apiClient } from "@/helpers/validations/login/apiClient"
import { JWTVerifyResult, jwtVerify } from 'jose';
import { JWT_SECRET } from "./constants/constants";
import { cookies } from 'next/headers';
import MainPage from "./components/Main";



export default async function Home() {

  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value as string
  const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET)).catch(() => {}) as JWTVerifyResult
  const id = payload.id
  const nombre:string = payload.nombre as string;

  const url = `work-space-user/getSpaces/${id}`
  const { data } = await apiClient.get(url)

  return (
    <h1>Hola</h1>
    // <MainPage data={data} nombre={nombre} id={id} />
  ) 
}
