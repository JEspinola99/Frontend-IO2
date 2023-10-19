import InputValidated from '@/components/common/inputValidated';
// import { createSpaceStore } from '@/store/space';
import { IBoard, useSpaceStore } from '@/store/space';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

export const CreateBoardModal = ({ show, handleClose, createBoard }: any) => {

    const methods = useForm({
        reValidateMode: 'onChange',
        defaultValues: {nombre: ''}
    })

    const { tableros, setNewBoard  } = useSpaceStore()

    const onSubmit = async(fetchData: any) => {
        console.log(tableros)
        const { data  } = await createBoard(fetchData)
        const newBoard:IBoard = {nombre: data.nombre, id: data.id}
        const newBoards = tableros.concat(newBoard)
        setNewBoard(newBoards)
        handleClose()
        methods.reset()
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
                    <Modal.Title>Crear Nuevo Tablero</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <InputValidated label="Nombre" {...methods.register('nombre', { required: "Nombre es obligatorio" })} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={methods.handleSubmit(onSubmit)}>Crear</Button>
                </Modal.Footer>
            </Modal>
        </FormProvider>
    )
}


