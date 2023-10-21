import { SpaceContext } from "@/context/SpaceContext"
import { ICreateColumn, createColumn } from "@/services/columnService"
import { useContext } from "react"
import { Button, Col, FormControl, Modal, Row } from "react-bootstrap"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useStore } from "zustand"


interface ICreateColumnModal {
    show: boolean
    handleClose: () => void
}

export const CreateColumnModal = ({
    show,
    handleClose,
}: ICreateColumnModal) => {

    const methods = useForm({
        reValidateMode: 'onChange',
        defaultValues: {nombre: '', tableroId: null}
        
    })

    const store = useContext(SpaceContext)
    const { boardActive, setNewColumn } = useStore(store, (s) => s)

    const submitHandler = async({nombre}:any) => {
        const fetchData:ICreateColumn = {
            nombre,
            tableroId: boardActive.id
        }
        const { data } = await createColumn(fetchData)
        const newColumns = boardActive.columnas.concat({id: data.id, nombre: data.nombre, tableroId: boardActive.id})
        console.log(newColumns)
        setNewColumn(newColumns)
        handleClose()
    }

    return (
        <FormProvider {...methods}>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nueva Columna</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <FormControl {...methods.register("nombre", { required: "Nombre es obligatorio" })} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={methods.handleSubmit(submitHandler)}>Crear</Button>
                </Modal.Footer>
            </Modal>
        </FormProvider>
    )
}