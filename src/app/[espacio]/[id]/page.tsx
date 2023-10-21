import React from 'react'
import { getBoard, getSpace } from '@/services/spaceService'
import Encabezado from "../../head/page";
import { Main } from "@/app/components/espacio/Main";
import { getAllUsers } from "@/services/userService";
import { getSpaceUsers } from "@/services/spaceUserService";
import { MainWrapper } from '@/app/components/espacio/board/MainWrapper';
import { ISpace, ISpaceValues } from '@/store/space';

export default async function Page({ params }: any) {
  const id = params.id

  const { data } = await getSpace(id)


  const firstBoard = data?.tablero[0]

  const res = await getBoard(firstBoard.id)
  const firstBoardData = res?.data


  const usersResponse = await getAllUsers();

  const users = usersResponse.data.map((user: any) => ({ value: user.id, label: user.email })).filter((user: any) => user.value != id)

  const usersInSpace = await getSpaceUsers(id)


  const nombre = data?.nombre;
  const miembros = usersInSpace?.data?.usuarios;
  const boards = data?.tablero;
  const opciones = usersResponse?.data 


  const spaceData: ISpaceValues = {
    nombre,
    miembros,
    boards,
    opciones,
    boardActive: firstBoardData,
    id
  }

  return (
    <MainWrapper {...spaceData} />
  )
}
