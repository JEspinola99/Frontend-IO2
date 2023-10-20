"use client";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Columna from "../components/Columna";

const Tablero = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = useState("");
  const [titulos, setTitulos] = useState(["Backlog"]);

  const addColumn = () => {
    titulos.push(title);
    setTitulos(titulos);
    setShow(false);
    setTitle("");
  };

  return (
    <>
      <div className="p-5 py-2 left-40  fixed inset-y-16 w-full h-ful justify-between]">
        {/*Encabezado del tablero */}
        <div className="flex justify-between w-full h-20">
          <div className="flex items-center space-x-3">
            <h4 className="text-2xl font-bold text-blue-900">TABLERO</h4>
            <Button variant="primary" onClick={handleShow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-gray-500 rounded-full bg-white p-1 ml-5 shadow-xl"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/*Columnas del tablero */}
        <div className="scroll-smooth md:scroll-auto grid grid-flow-col gap-3 my-3 justify-start">
          <Columna items={titulos} />
        </div>
      </div>

      {/* modal agregar columna  */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Columna</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la "
                autoFocus
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button type="submit" variant="primary" onClick={addColumn}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Tablero;
