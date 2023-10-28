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
}

export const UpdateTaskModal = ({
    show,
    handleClose,
}: IUpdateTaskModal) => {

    const methods = useForm<ITask>({
        reValidateMode: 'onChange',
        defaultValues: {
            titulo: '',
            descripcion: '',
            usuarioId: null,
            etiquetaId: null,
            fechaVencimiento: ''
        }
    })

    const store = useContext(SpaceContext)
    const { boardActive, setBoardActive, miembros  } = useStore(store, (s) => s)

    const createTask:SubmitHandler<ITask>  = async (fetchData) => {
        // const {data} =  await create(fetchData)
        // const newTask = data
        // const newTasks = boardActive.columnas.find((col) => col.id == columnId)?.tareas.concat(newTask)
        // const newColumns = boardActive.columnas.map((col) => {
        //      if(col.id == columnId){
        //          return {...col, tareas: newTasks as ITask[]}
        //      }else{
        //          return {...col}
        //      }
        // })
        // const updatedBoard = {...boardActive, columnas: newColumns }
        // setBoardActive(updatedBoard)
        // handleClose()
    }


    const handleChange = (e: any) => {
        const target = e.target
        const value = target.value == 0 ? null : target.value
        methods.setValue('usuarioId', value)
    }




    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(createTask)}>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Tarea</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Col>Titulo</Col>
                                <Col>
                                    <FormControl {...methods.register('titulo', { required: true })} />
                                </Col>
                            </Col>
                            <Col>
                                <Col>Descripcion</Col>
                                <Col>
                                    <FormControl {...methods.register('descripcion', { required: true })} />
                                </Col>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Col>Fecha Vencimiento</Col>
                                <Col>
                                    <FormControl type="date" {...methods.register('fechaVencimiento', { required: true })} />
                                </Col>
                            </Col>
                            <Col>
                                <Col>Usuario Asignado</Col>
                                <Col>
                                    <FormSelect {...methods.register('usuarioId', { required: true })}>
                                        <option value={0}>NO DEFINIDO</option>
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
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={methods.handleSubmit(createTask)} type="submit">Crear Tarea</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </FormProvider>
    )
}