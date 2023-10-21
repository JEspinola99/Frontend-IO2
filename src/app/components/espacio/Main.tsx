"use client"
import Encabezado from "@/app/head/page"
import { Button, Container, Row, Col } from "react-bootstrap"
import { useContext } from "react"
import { CreateBoardModal } from "./CreateBoardModal"
import { UpdateSpaceModal } from "./UpdateSpaceModal"
import { IBoard } from "@/store/space"
import { Toaster } from "react-hot-toast"
import { BoardList } from "./BoardsList"
import { MemberList } from "./MemberList"
import { useSpaceComponent } from "@/hooks/useSpaceComponent"
import { Kanban } from "../Kanban/Kanban"
import { SpaceContext } from "@/context/SpaceContext"
import { useStore } from "zustand"
import { CreateColumnModal } from "./CreateColumnModal"

export interface IMain {
  data: any;
  id: number;
  usersInSpace: any;
  boardsDefault: any;
  users: any;
  firstBoardData: IBoard;
}

export const Main = () => {
  const store = useContext(SpaceContext)
  const { id, nombre, boardActive } = useStore(store, (s) => s)

  const {
    createBoardHandler,
    handleClose,
    handleCloseBoardModal,
    show,
    showBoardModal,
    handleOpenBoardModal,
    handleOpen,
    handleCloseCreateColumnModal,
    handleOpenCreateColumnModal,
    showCreateColumnModal,
  } = useSpaceComponent(id);


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

      <CreateColumnModal
      show={showCreateColumnModal}
      handleClose={handleCloseCreateColumnModal}
      />
      {/* <Encabezado /> */}
      <Row className="mainContainer">
        <Col className="leftColumn">
          <h5>
            Espacio: {nombre} <Button onClick={handleOpen}>Editar</Button>
          </h5>
          <h6>Miembros</h6>
          <MemberList />
          <h6>
            Tableros{" "}
            <Button onClick={handleOpenBoardModal}>Crear Tablero</Button>
          </h6>
          <BoardList />
        </Col>

        <Col className="rightColumn" sm={9}>
          <span>{boardActive.nombre}</span>
          <Button onClick={handleOpenCreateColumnModal}>Crear Columna</Button>
          <Kanban />
        </Col>
      </Row>
    </Container>
  );
};
