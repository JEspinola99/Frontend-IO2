import { SpaceContext } from "@/context/SpaceContext"
import { ICreateColumn, createColumn } from "@/services/columnService"
import { useContext } from "react"
import { Button, Col, FormControl, Modal, Row } from "react-bootstrap"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
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
        defaultValues: { nombre: '', tableroId: null, maxTareas: 0 }

    })

    const store = useContext(SpaceContext)
    const { boardActive, setNewColumn } = useStore(store, (s) => s)

    const submitHandler = async ({ nombre, maxTareas }: any) => {
        const fetchData: ICreateColumn = {
            nombre,
            maxTareas: Number(maxTareas),
            tableroId: boardActive.id
        }
        try {
            const { data } = await createColumn(fetchData)
            const newColumns = boardActive.columnas.concat({
                id: data.id, nombre: data.nombre,
                tableroId: boardActive.id, tareas: [], maxTareas: fetchData.maxTareas
            })
            setNewColumn(newColumns)
        } catch (error: any) {
            const message = error?.response?.data?.message;
            toast.error(message)
        } finally {
            methods.reset()
            handleClose()
        }
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
                        <Row>
                            <Col>Nombre de la Columna</Col>
                        <Col>
                            <FormControl {...methods.register("nombre", { required: "Nombre es obligatorio" })} />
                        </Col>
                        </Row>
                        <Row className="mt-2">
                        <Col>Cantidad de tareas maxima</Col>
                        <Col>
                            <FormControl type="number" {...methods.register("maxTareas",
                                { required: "Cantidad de Tareas maxima" })} />
                        </Col>
                        </Row>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose()
                        methods.reset()
                    }}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={methods.handleSubmit(submitHandler)}>Crear</Button>
                </Modal.Footer>
            </Modal>
        </FormProvider>
    )
}