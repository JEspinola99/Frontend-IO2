"use client"
import Encabezado from "@/app/head/page"
import { Button, Container, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { createBoard, createSpace, getSpace, updateSpace } from "@/services/spaceService"
import { getSpaceUsers } from "@/services/spaceUserService"
import { CreateBoardModal } from "./CreateBoardModal"
import { UpdateSpaceModal } from "./UpdateSpaceModal"
import { useSpaceStore } from "@/store/space"
import { Toaster } from "react-hot-toast"
import { BoardList } from "./BoardsList"
import { MemberList } from "./MemberList"
import { useSpaceComponent } from "@/hooks/useSpaceComponent"

interface IMain {
  data: any
  id: number
  usersInSpace: any
  tablero: any
  users: any
}


export const Main = ({ data, id, users, usersInSpace, tablero }: IMain) => {

  const { setSpaceData, nombre, miembros, tableros, boardActive } = useSpaceStore()

  const {
    createBoardHandler,
    handleClose,
    handleCloseBoardModal,
    show,
    showBoardModal,
    handleOpenBoardModal,
    handleOpen
  } = useSpaceComponent(id)

  useEffect(() => {
    setSpaceData({ nombre: data.nombre, miembros: usersInSpace, opciones: users, tableros: tablero })
  }, [])

  console.log(tableros)

  // useEffect(() => {
  //   (async() => {
  //     const res = await 
  //   })()
  // }, [boardActive])


  return (
    <Container fluid>
      <Toaster
        position="top-right"
      />
      <CreateBoardModal
        show={showBoardModal}
        handleClose={handleCloseBoardModal}
        createBoard={createBoardHandler}
      />

      <UpdateSpaceModal
        show={show}
        handleClose={handleClose}
        edit={true}
        id={id}
      />
      {/* <Encabezado /> */}
      <Row className="d-flex mainContainer">
        <Col className="leftColumn">
          <h5>Espacio: {nombre} <Button onClick={handleOpen}>Editar</Button></h5>
          <h6>Miembros</h6>
          <MemberList miembros={miembros} />
          <h6>Tableros <Button onClick={handleOpenBoardModal}>Crear Tablero</Button></h6>
          <BoardList tableros={tableros} />
        </Col>

        <Col className="rightColumn" sm={8}>
          <span>{boardActive.nombre}</span>
          {/* <h1>Espacio: {nombre} <Button onClick={handleOpen}>Editar</Button></h1>
          <h6>Miembros</h6>
          <MemberList miembros={miembros} />
          <h6>Tableros <Button onClick={handleOpenBoardModal}>Crear Tablero</Button></h6>
          <BoardList tableros={tableros} /> */}
        </Col>
      </Row>
    </Container>
  )
}
