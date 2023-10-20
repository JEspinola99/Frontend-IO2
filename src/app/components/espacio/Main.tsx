"use client"
import Encabezado from "@/app/head/page"
import { Button } from "react-bootstrap"
import { CreateSpaceModal } from "../Main/Modal"
import { useState, useEffect } from "react"
import { createBoard, createSpace, getSpace, updateSpace } from "@/services/spaceService"
import { getSpaceUsers } from "@/services/spaceUserService"
import { CreateBoardModal } from "./CreateBoardModal"
import { UpdateSpaceModal } from "./UpdateSpaceModal"
import { useSpaceStore } from "@/store/space"

export const Main = ({ data, id, users, usersInSpace, tablero }: any) => {

  const { setSpaceData, nombre, miembros, tableros  } = useSpaceStore()


  useEffect(() => {
    setSpaceData({nombre: data.nombre, miembros: usersInSpace, opciones: users, tableros: tablero})
  }, [])


  const [showBoardModal, setShowBoardModal] = useState(false)
  const handleOpenBoardModal = () => setShowBoardModal(() => true)
  const handleCloseBoardModal = () => setShowBoardModal(() => false)

  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(() => false)
  }

  const handleOpen = async () => {
    // const { data } = await getSpaceUsers(id)
    // const users = data.usuarios?.map((user: any) => ({ value: user.id, label: user.email })).filter((user: any) => user.value != id)
    // setUsers(users)
    setShow(() => true)
  }


  const editSpace = async (data: any) => {
    console.log(data)
    // const fetchData = { creadorId: data.creadorId, nombre: data.nombre, usuarios: data.usuarios || [] }
    // const res = await updateSpace(fetchData, id)
    // const newUsers = await getSpaceUsers(id)
    // const users = newUsers?.data?.usuarios.filter((user: any) => user.id != id)
    // handleClose()
  }

  const createBoardHandler = (data: any) => {
    const fetchData = {
      nombre: data.nombre,
      espacioDeTrabajoId: Number(id)
    }
    return createBoard(fetchData)
  }



  return (
    <>
      <CreateBoardModal
        show={showBoardModal}
        handleClose={handleCloseBoardModal}
        createBoard={createBoardHandler}
      />

      <UpdateSpaceModal
        show={show}
        handleClose={handleClose}
        editSpace={editSpace}
        edit={true}
        id={id}
      />
      <Encabezado />
      <h1>Espacio: {nombre}</h1>
      <Button onClick={handleOpen}>Editar</Button>
      <h2>Miembros</h2>
      {
        miembros?.map((miembro: any) => (
          <div key={miembro.id}>{miembro.email}</div>
        ))
      }
      <h2>Tableros <Button onClick={handleOpenBoardModal}>Crear Tablero</Button></h2>
      {
        tableros?.map((item: any) => (
          <div key={item.id}>{item.nombre}</div>
        ))
      }
    </>
  )
}