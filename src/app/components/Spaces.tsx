"use client";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { CreateSpaceModal } from "./Main/Modal";
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
  console.log(id);

  const methods = useForm({
    reValidateMode: "onChange",
    defaultValues: { creadorId: id, usuarios: [], nombre: "", options: users },
  });

  const handleSubmit = async (data: any) => {
    const res = await createSpace(data);
    setBoards((current: any) => current.concat(res?.data));
    handleClose();
  };

  return (
    <>
      <div>
        <div>
          <FormProvider {...methods}>
            <CreateSpaceModal
              show={show}
              handleClose={handleClose}
              onSubmit={handleSubmit}
              handleSubmit={methods.handleSubmit}
            />
            <main>
              <Container fluid>
                <Row>
                  <h1>Bienvenido a TaskBoard {nombre}</h1>
                </Row>
                <Row>
                  <Col>
                    <h2>Tus Espacios de trabajo</h2>
                    {boards?.map((space: any) => (
                      <div key={space.id}>
                        <Link href={`/espacio/${space.id}`}>
                          {space.nombre}
                        </Link>
                      </div>
                    ))}
                  </Col>
                  <Col>
                    <Button onClick={handleOpen}>Crear Espacio</Button>
                  </Col>
                </Row>
              </Container>
            </main>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
