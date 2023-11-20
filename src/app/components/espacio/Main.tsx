"use client";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { CreateBoardModal } from "./CreateBoardModal";
import { UpdateSpaceModal } from "./UpdateSpaceModal";
import { IBoard } from "@/store/space";
import { Toaster } from "react-hot-toast";
import { BoardList } from "./BoardsList";
import { MemberList } from "./MemberList";
import { useSpaceComponent } from "@/hooks/useSpaceComponent";
import { SpaceContext } from "@/context/SpaceContext";
import { useStore } from "zustand";
import { CreateColumnModal } from "./CreateColumnModal";
import { Kanban } from "../Kanban/Kanban";

export interface IMain {
  data: any;
  id: number;
  usersInSpace: any;
  boardsDefault: any;
  users: any;
  firstBoardData: IBoard;
}

export const Main = () => {
  const store = useContext(SpaceContext);
  const { id, nombre, boardActive } = useStore(store, (s) => s);

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
      <Col className="mainContainer">
        <Row className="h-20 w-full flex flex-col gap-2 p-3">
          <div className="p-2 h-10 flex flex-row gap-3 items-center">
            <h2 className="text-lg">Espacio: {nombre}</h2>
            <button
              title="Editar Nombre"
              onClick={handleOpen}
              className="h-8 w-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6 stroke-sky-500 group-hover:stroke-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-row gap-3">
            <div className="p-2 w-80 border-4 border-spacing-3 rounded-md">
              <h6>Miembros</h6>
              <MemberList />
            </div>
            <div className="p-2 border-4 w-full h-full flex flex-col rounded-md ">
              <div className="flex flex-row gap-2 items-center">
                <h6>Tableros </h6>
                <button title="Agregar Tablero" onClick={handleOpenBoardModal}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
                  </svg>
                </button>
              </div>
              <BoardList />
            </div>
          </div>
        </Row>
        <Row className="p-2 h-full w-full flex flex-col gap-2">
          <div className=" ">
            <div className="h-20 w-full flex flex-row gap-2 items-center text-2xl">
              <h1>Tablero: </h1>
              <span>{boardActive.nombre}</span>
            </div>
            <div className="p-2 gap-2 flex flex-row">
              <Kanban />
              <span className="">
                <button
                  title="Crear Columna"
                  onClick={handleOpenCreateColumnModal}
                  className="p-2 bg-[#123755] border-1 rounded-md w-10 h-10 hover:bg-sky-400"
                >
                  <div className="flex flex-row align-middle items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                    Agregar Columna
                  </div>
                </button>
              </span>
            </div>
          </div>
        </Row>
      </Col>
    </Container>
  );
};
