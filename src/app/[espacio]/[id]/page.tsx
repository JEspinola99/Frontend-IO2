import React from 'react'
import { getSpace } from '@/services/spaceService'
import Encabezado from "../../head/page";
import { getAllUsers } from "@/services/userService";
import { MainWrapper } from '@/app/components/espacio/board/MainWrapper';
import { ISpaceValues } from '@/store/space';

export default async function Page({ params }: any) {
  const id = params.id

  const { data } = await getSpace(id)

  const miembros = data.usuarios.map((usuario:any) => (usuario.usuario))

  const firstBoard = data?.tablero[0]

  const firstBoardData = {
    id: firstBoard.id,
    espacioDeTrabajoId: firstBoard.espacioDeTrabajoId,
    columnas: firstBoard.columnas,
    nombre: firstBoard.nombre
  }

  const usersResponse = await getAllUsers();

  const users = usersResponse.data.map((user: any) => ({ value: user.id, label: user.email })).filter((user: any) => user.value != id)

  const nombre = data?.nombre;
  const boards = data?.tablero
  const opciones = users

  const spaceData: ISpaceValues = {
    nombre,
    miembros,
    boards,
    opciones,
    boardActive: firstBoardData,
    id,
    loadingKanban: false
  }

  return (
    <MainWrapper {...spaceData} />
  )
}
