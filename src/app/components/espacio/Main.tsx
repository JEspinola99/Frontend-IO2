"use client";
import Encabezado from "@/app/head/page";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FormProvider, useForm } from "react-hook-form";
import { CreateSpaceModal } from "../Main/SpaceModal";
import { useState } from "react";
import {
  createBoard,
  createSpace,
  getSpace,
  updateSpace,
} from "@/services/spaceService";
import { getSpaceUsers } from "@/services/spaceUserService";
import { CreateBoardModal } from "./BoardModal";
import Link from "next/link";
import { number, string } from "yup";
//import { createBoards } from "@/services/boardsService";

export const Main = ({ data, id, users, usersInSpace }: any) => {
  const methods = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      creadorId: Number(id),
      usuarios: [],
      nombre: [data.nombre],
      options: users,
    },
  });

  const [spaceData, setSpaceData] = useState({
    nombre: data.nombre,
    miembros: usersInSpace,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {
    methods.reset();
    setShow(() => false);
  };

  const handleOpen = async () => {
    const { data } = await getSpaceUsers(id);
    methods.setValue("nombre", data.nombre);
    const users = data.usuarios
      ?.map((user: any) => ({ value: user.id, label: user.email }))
      .filter((user: any) => user.value != id);
    methods.setValue("usuarios", users ?? []);
    setShow(() => true);
  };

  const handleSubmit = async (data: any) => {
    const fetchData = {
      creadorId: data.creadorId,
      nombre: data.nombre,
      usuarios: data.usuarios || [],
    };
    const res = await updateSpace(fetchData, id);
    const newUsers = await getSpaceUsers(id);
    const users = newUsers?.data?.usuarios.filter((user: any) => user.id != id);
    setSpaceData(() => ({ nombre: res.data.nombre, miembros: users }));
    handleClose();
  };

  //este es del model del tablero

  const [boardModalShow, setBoardModalShow] = useState(false);
  const [currentDate, setCurrentDate] = useState(getDate());

  const boardMethod = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      nombre: "",
      fecha: currentDate,
      boardId: data.id,
    },
  });

  const handleCloseBoardModal = () => {
    boardMethod.reset();
    setBoardModalShow(false);
  };

  const handleSubmitBoardModal = async (data: any) => {
    const fetchData = {
      nombre: data.nombre,
      boardid: data.boardId,
    };
    console.log(fetchData);
    const res = await createBoard(fetchData);
    handleCloseBoardModal();
  };

  const handleOpenBoardModal = () => {
    setBoardModalShow(true);
  };

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return date + "/" + month + "/" + year;
  }

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <CreateSpaceModal
          show={show}
          handleClose={handleClose}
          onSubmit={handleSubmit}
          handleSubmit={methods.handleSubmit}
          edit={true}
        />

        <h1>Espacio: {spaceData.nombre}</h1>
        <Button onClick={handleOpen}>Editar</Button>
        <h2>Miembros</h2>
        {spaceData.miembros?.map((miembro: any) => (
          <div key={miembro.id}>{miembro.email}</div>
        ))}
        <h2>Tableros</h2>
        {data.Tablero?.map((item: any) => (
          <div key={item.id}>
            <Link href={`/boards/`}>{item.nombre}</Link>
          </div>
        ))}
      </FormProvider>
      <FormProvider {...boardMethod}>
        <CreateBoardModal
          show={boardModalShow}
          handleClose={handleCloseBoardModal}
          onSubmit={handleSubmitBoardModal}
          handleSubmit={boardMethod.handleSubmit}
          edit={true}
        />
        <Button onClick={handleOpenBoardModal}>crear tablero</Button>
      </FormProvider>
    </div>
  );
};
