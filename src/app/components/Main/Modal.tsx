import InputValidated from '@/components/common/inputValidated';
import { Button, Col, FormControl, Modal, Row } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select'

export const CreateSpaceModal = ({ show, handleClose, onSubmit, SpaceName, users, handleSubmit }: any) => {

    const { register, setValue } = useFormContext()

    const handleChange = (e: any) => {
        const users = e.map((user:any) => user.value)
        setValue('usuarios', users)
    }   

    return (
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
                        <InputValidated label="Nombre" {...register('nombre', { required: "Nombre es obligatorio" })} />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Row><Col>Usuarios</Col></Row>
                    <Col>
                        <Select isMulti options={users} {...register('usuarios',)} onChange={handleChange} />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit(onSubmit)}>Crear</Button>
            </Modal.Footer>
        </Modal>
    )
}


