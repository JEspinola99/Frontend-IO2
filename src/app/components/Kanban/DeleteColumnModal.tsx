import { SpaceContext } from "@/context/SpaceContext"
import { ICreateColumn, createColumn } from "@/services/columnService"
import { useContext } from "react"
import { Button, Col, FormControl, Modal, Row } from "react-bootstrap"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useStore } from "zustand"


interface ICreateColumnModal {
    show: boolean
    handleClose: () => void
    deleteColumn: () => void
}

export const DeleteColumnModal = ({
    show,
    handleClose,
    deleteColumn
}: ICreateColumnModal) => {

    const store = useContext(SpaceContext)
    const { boardActive, setNewColumn } = useStore(store, (s) => s)

    const handleDelete = () => {
        console.log('a')
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Columna</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <span>Esta seguro que desea eliminar esta columna?</span>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={deleteColumn}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    )
}