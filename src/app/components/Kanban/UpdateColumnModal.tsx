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

export const UpdateColumnModal = ({
    show,
    handleClose,
    deleteColumn
}: ICreateColumnModal) => {

    const store = useContext(SpaceContext)
    const { boardActive, setNewColumn } = useStore(store, (s) => s)

    const methods = useForm({
        reValidateMode: 'onChange',
        defaultValues: {nombre: }
    })


    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Actualizar Columna</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <FormControl />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={deleteColumn}>Actualizar</Button>
            </Modal.Footer>
        </Modal>
    )
}