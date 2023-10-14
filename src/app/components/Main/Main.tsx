"use client"
import { createSpace } from "@/services/spaceService";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CreateSpaceModal } from "./Modal";
import { useForm, FormProvider } from "react-hook-form";

export default function MainPage({ data, nombre, id, users }: any) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(() => false)
    const handleOpen = () => setShow(() => true)
    const [boards, setBoards] = useState(data)

    const methods = useForm({
        reValidateMode: 'onChange',
        defaultValues: {creadorId: id, usuarios: [], nombre: ''}
    })


    const handleSubmit = async (data:any) => {
        const res = await createSpace(data)
        setBoards((current:any) => current.concat(res?.data))
        handleClose()
    }


    const SpaceName = useRef(null)


    return (
        <FormProvider {...methods}>
            <CreateSpaceModal
                show={show}
                handleClose={handleClose}
                onSubmit={handleSubmit}
                handleSubmit={methods.handleSubmit}
                SpaceName={SpaceName}
                users={users}
            />
            <main>
                <Container fluid>
                    <Row>
                        <h1>Bienvenido a TaskBoard {nombre}</h1>
                    </Row>
                    <Row>
                        <Col>
                            <h2>Tus Espacios de trabajo</h2>
                            {
                                boards?.map((space:any) => (
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

        </FormProvider>
    )
}
