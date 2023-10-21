"use client"
import Encabezado from "@/app/head/page"
import { Button, Container, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { createBoard, createSpace, getBoard, getSpace, updateSpace } from "@/services/spaceService"
import { getSpaceUsers } from "@/services/spaceUserService"
import { CreateBoardModal } from "./CreateBoardModal"
import { UpdateSpaceModal } from "./UpdateSpaceModal"
import { IBoard, useSpaceStore } from "@/store/space"
import { Toaster } from "react-hot-toast"
import { BoardList } from "./BoardsList"
import { MemberList } from "./MemberList"
import { useSpaceComponent } from "@/hooks/useSpaceComponent"
import { Kanban } from "../Kanban/Kanban"

interface IMain {
  data: any;
  id: number;
  usersInSpace: any;
  boardsDefault: any;
  users: any;
  firstBoardData: IBoard;
}

export const Main = ({ data, id, users, usersInSpace, boardsDefault, firstBoardData }: IMain) => {
  const { setSpaceData, nombre, miembros, boards, boardActive } =
    useSpaceStore();

  const {
    createBoardHandler,
    handleClose,
    handleCloseBoardModal,
    show,
    showBoardModal,
    handleOpenBoardModal,
    handleOpen,
  } = useSpaceComponent(id);

  useEffect(() => {
    setSpaceData({
      nombre: data.nombre,
      miembros: usersInSpace,
      opciones: users,
      boards: boardsDefault,
      boardActive: firstBoardData
    });
  }, []);


  useEffect(() => {
    (async () => {
      const { data } = await getBoard(boardActive.id)
    })()
}, [boardActive])

return (
  <Container fluid>
    <Toaster position="top-right" />
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
    <Row className="mainContainer">
      <Col className="leftColumn">
        <h5>
          Espacio: {nombre} <Button onClick={handleOpen}>Editar</Button>
        </h5>
        <h6>Miembros</h6>
        <MemberList miembros={miembros} />
        <h6>
          Tableros{" "}
          <Button onClick={handleOpenBoardModal}>Crear Tablero</Button>
        </h6>
        <BoardList tableros={boards} />
      </Col>

      <Col className="rightColumn" sm={9}>
        <span>{boardActive.nombre}</span>
        <Kanban />
      </Col>
    </Row>
  </Container>
);
};
