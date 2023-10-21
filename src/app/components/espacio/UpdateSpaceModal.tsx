import InputValidated from '@/components/common/inputValidated';
import { SpaceContext } from '@/context/SpaceContext';
import { updateSpace } from '@/services/spaceService';
import { useContext, useEffect } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import Select from 'react-select'
import { useStore } from 'zustand';

export const UpdateSpaceModal = ({ show, handleClose, id }: any) => {

    const store = useContext(SpaceContext)
    const { miembros, opciones, nombre, setName, setUsers  } = useStore(store, (s) => s)
    
    const methods = useForm({
        reValidateMode: 'onChange',
        defaultValues: { nombre: '', usuarios: [], selectData: [] }
    })

    useEffect(() => {
        const usuarios = miembros.map((miembro) => ({value: miembro.id, label: miembro.email}))
        methods.setValue('usuarios',usuarios)
        methods.setValue('selectData', opciones)
        methods.setValue('nombre',nombre)
    }, [miembros, opciones, nombre])

    const handleChange = (e: any) => {
        methods.setValue('usuarios', e)
    }
    
    const onSubmit = async(submitData: any) => {
        const usuarios = submitData.usuarios.map((usuario) => usuario.value)
        console.log(usuarios)
        console.log(submitData)
        const fetchData = { 
            nombre: submitData.nombre,
            usuarios: usuarios
        }
        const { data  } = await updateSpace(fetchData, id)
        const newUsers = submitData.usuarios.map((user) => ({id: user.value, email: user.label}))
        setName(submitData.nombre)
        setUsers(newUsers)
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
                    <Modal.Title>Edit Espacio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <InputValidated label="Nombre" {...methods.register('nombre', { required: "Nombre es obligatorio" })} />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Row><Col>Usuarios</Col></Row>
                        <Col>
                            <Select isMulti defaultValue={methods.getValues('usuarios')} options={methods.getValues('selectData')}
                                {...methods.register('usuarios')} onChange={handleChange} />
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


