"use client";
import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { CreateSpaceModal } from "./Main/SpaceModal";
import Link from "next/link";
import { createSpace } from "@/services/spaceService";

export default function Spaces({ data, nombre, id, users }: any) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    methods.reset();
    setShow(() => false);
  };
  const handleOpen = () => setShow(() => true);
  const [boards, setBoards] = useState(data);

  const methods = useForm({
    reValidateMode: "onChange",
    defaultValues: { creadorId: id, usuarios: [], nombre: "", options: users },
  });

  const handleSubmit = async (data: any) => {
    console.log(data);
    const res = await createSpace(data);
    setBoards((current: any) => current.concat(res?.data));
    handleClose();
  };

  return (
    <div>
      <FormProvider {...methods}>
        <CreateSpaceModal
          show={show}
          handleClose={handleClose}
          onSubmit={handleSubmit}
          handleSubmit={methods.handleSubmit}
        />
        <Container fluid>
          <Row>
            <h1 className="text-6xl">Bienvenido a TaskBoard {nombre}</h1>
          </Row>
          <div>
            <h2 className="text-2xl">Tus Espacios de trabajo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-self-center">
              {boards?.map((space: any) => (
                <a key={space.id} href={`/espacio/${space.id}`}>
                  <div className="w-auto h-28 bg-cyan-500 p-3  hover:bg-cyan-700 rounded-md">
                    <h4 className="flex justify-between items-center">
                      <span className="text-2xl text-white">
                        {space.nombre}
                      </span>
                    </h4>
                  </div>
                </a>
              ))}
            </div>

            <Col>
              <Button onClick={handleOpen}>Crear Espacio</Button>
            </Col>
          </div>
        </Container>
      </FormProvider>
    </div>
  );
}
