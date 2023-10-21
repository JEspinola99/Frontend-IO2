import  InputValidated  from '@/components/common/inputValidated';
import { SpaceContext } from '@/context/SpaceContext';
import { IBoard } from '@/store/space';
import { useContext } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useStore } from 'zustand';

export const CreateBoardModal = ({ show, handleClose, createBoard }: any) => {

    const methods = useForm({
        reValidateMode: 'onChange',
        defaultValues: {nombre: ''}
    })

    const store = useContext(SpaceContext)
    const { boards, setNewBoard  } = useStore(store, (s) => s)

    const onSubmit = async(fetchData: any) => {
        try{
            const { data  } = await createBoard(fetchData)
            const newBoard:IBoard = {nombre: data.nombre, id: data.id}
            const newBoards = boards.concat(newBoard)
            setNewBoard(newBoards)
            handleClose()
            methods.reset()
        } catch(error: any) {
            const message = error?.response?.data;
            console.log(message)
            toast.error(message)
        } finally {
            handleClose()
            methods.reset()
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


