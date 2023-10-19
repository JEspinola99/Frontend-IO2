"use client";
import Encabezado from "@/app/head/page";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FormProvider, useForm } from "react-hook-form";
import { CreateSpaceModal } from "../Main/SpaceModal";
import { useState } from "react";
import { createSpace, getSpace, updateSpace } from "@/services/spaceService";
import { getSpaceUsers } from "@/services/spaceUserService";
import { CreateBoardModal } from "./BoardModal";
import Link from "next/link";
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

  console.log(usersInSpace);

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
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="p-5 py-20 left-40  fixed inset-y-16 w-full h-ful justify-between">
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
      <FormProvider {...methods}>
        <CreateBoardModal show={modalShow} onHide={() => setModalShow(false)} />
        <Button onClick={() => setModalShow(true)}>crear tablero</Button>
      </FormProvider>
    </div>
  );
};
