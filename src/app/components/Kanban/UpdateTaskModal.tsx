import { SpaceContext } from "@/context/SpaceContext"
import { deleteColumn } from "@/services/columnService"
import { create } from "@/services/taskService"
import { ITask } from "@/store/space"
import { useContext } from "react"
import { Button, Col, FormControl, FormSelect, Modal, Row, Form } from "react-bootstrap"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useStore } from "zustand"


interface IUpdateTaskModal {
    show: boolean
    handleClose: () => void
    taskData: ITask
}

export const UpdateTaskModal = ({
    show,
    handleClose,
    taskData
}: IUpdateTaskModal) => {

    const store = useContext(SpaceContext)
    const { miembros, etiquetas } = useStore(store, (s) => s)




    return (
        <Form >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{taskData?.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Col>Etiqueta</Col>
                            <Col>
                                <FormSelect defaultValue={taskData?.etiquetaId as number} disabled>
                                    {
                                        etiquetas?.map((etiqueta) => (
                                            <option value={etiqueta.id} key={etiqueta.id}>{etiqueta.nombre}</option>
                                        ))
                                    }
                                </FormSelect>
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Col>Descripcion</Col>
                            <Col>
                                <FormControl value={taskData?.descripcion} disabled />
                            </Col>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Col>Fecha Vencimiento</Col>
                            <Col>
                                <FormControl type="date" value={taskData?.fechaVencimiento} disabled />
                            </Col>
                        </Col>
                        <Col>
                            <Col>Usuario Asignado</Col>
                            <Col>
                                <FormSelect defaultValue={taskData?.usuarioId as number} disabled>
                                    {
                                        miembros?.map((item) => (
                                            <option value={item.id} key={item.id} >{item.email}</option>
                                        ))
                                    }
                                </FormSelect>
                            </Col>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    )
}