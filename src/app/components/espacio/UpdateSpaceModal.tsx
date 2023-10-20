import InputValidated from '@/components/common/inputValidated';
import { updateSpace } from '@/services/spaceService';
import { IBoard, useSpaceStore } from '@/store/space';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button, Col, FormControl, Modal, Row } from 'react-bootstrap';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import Select from 'react-select'

export const UpdateSpaceModal = ({ show, handleClose, editSpace, edit, id }: any) => {

    
    const { miembros, opciones, nombre, setUsers, setName } = useSpaceStore()
    
    const methods = useForm({
        reValidateMode: 'onChange',
        defaultValues: { nombre: '', usuarios: [], selectData: [] }
    })

    useEffect(() => {
        const usuarios = miembros.map((miembro) => ({value: miembro.id, label: miembro.email}))
        console.log(miembros)
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


