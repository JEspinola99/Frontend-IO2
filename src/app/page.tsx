import { apiClient } from "@/helpers/validations/login/apiClient"
import { JWTVerifyResult, jwtVerify } from 'jose';
import { JWT_SECRET } from "./constants/constants";
import { cookies } from 'next/headers';
import Link from "next/link";
import Espacio from "./espacio/page";


export default async function Home() {
/*
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value as string
  const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET)).catch(() => {}) as JWTVerifyResult
  const id = payload.id
  const nombre:string = payload.nombre as string;

  const url = `work-space-user/getSpaces/${id}`
  const { data:spaces } = await apiClient.get(url)
*/
  return (
    <>
    <Espacio/>
    <div className="principal">

      
      


      <MydModal  />
    </div>

    </>
  );
}


async function MydModal() {

  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value as string
  const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET)).catch(() => {}) as JWTVerifyResult
  const id = payload.id
  const nombre:string = payload.nombre as string;

  const url = `work-space-user/getSpaces/${id}`
  const { data:spaces } = await apiClient.get(url)

  

  return (
    <main>
      
        <h2>Tus Espacios de trabajo {nombre}</h2>
        {
          spaces?.map(space => (
            <ul>
              <li>{space.nombre}
                  

              </li>
              <li><Link href={`/espacio`}>{space.nombre}</Link></li>
            </ul>
          ))
        }
             
      </main>
  );
}