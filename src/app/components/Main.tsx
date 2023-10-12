"use client"
import { createSpace } from "@/services/spaceService";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button, Col, Container, FormControl, Modal, Row,  Navbar, Nav } from "react-bootstrap";

import Encabezado from "../head/page";

export default function MainPage({ data, nombre, id }: any) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(() => false)
    const handleOpen = () => setShow(() => true)
    const [boards, setBoards] = useState(data)

    const handleSubmit = async() => {
        const data = {nombre: SpaceName.current.value, creadorId: id}
        const res = await createSpace(data)
        setBoards((current)=> current.concat(res?.data))
        handleClose()
    }

    const SpaceName = useRef(null)

    return (
        <>
        <Encabezado/>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nuevo Espacio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <FormControl placeholder="Nombre" ref={SpaceName} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Crear</Button>
                </Modal.Footer>
            </Modal>
            <main>
                <Container fluid>
                    <Row>
                        <h1>Bienvenido a TaskBoard {nombre}</h1>
                    </Row>
                    <Row>
                        <Col>
                            <h2>Tus Espacios de trabajo</h2>
                            {
                                boards?.map(space => (
                                    <div key={space.id}>
                                        <Link href={`/espacio/${space.id}`}>{space.nombre}</Link>
                                    </div>
                                ))
                            }
                        </Col>
                        <Col>
                            <Button onClick={handleOpen}>Crear Espacio</Button>
                        </Col>

                    </Row>

                </Container>
            </main>

        </>
    )
}
