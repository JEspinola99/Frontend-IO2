"use client"
import FormValidationError from '@/components/common/FormValidationError'
import InputValidated from '@/components/common/inputValidated'
import { useLoginForm } from '@/hooks/useLoginForm'
import { useUserStore } from '@/store/user'
import { ErrorMessage } from '@hookform/error-message'
import Link from 'next/link'
import React from 'react'
import { Button, Card, Container, Form, FormControl, FormLabel } from 'react-bootstrap'
import { Controller, FormProvider } from 'react-hook-form'
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Home() {
  const { handleLogout } = useLoginForm()
  const email = useUserStore((state) => state.email);

  const [smShow, setSmShow] = useState(false);

  const [lgShow, setLgShow] = useState(false);
  const handleClose = () => setLgShow(false);
  const handleShow = () => setLgShow(true);

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
    <div className="barra-superior">
        <h1>TaskBoard</h1>

        <Button className="cerrar" onClick={() => setSmShow(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </Button>

          <Button className="crear"onClick={() => setLgShow(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </Button>
          <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Cuenta
              </Modal.Title>
            </Modal.Header>
            <Modal.Body><center><Button variant="primary" onClick={handleLogout}>
            Cerrar Sesión
          </Button></center></Modal.Body>
          </Modal>
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Proyecto
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre del Espacio</Form.Label>
                <Form.Control type="text"/>
               </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.Controlmiembros1"
            >
              <Form.Label>Miembros</Form.Label>
              <Form.Control as="textarea"  />
            </Form.Group>
          </Form>
            </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
          </Modal>
    </div>

      <Container className="barra-izquierda">
        <h2 className="form-title" > Proyectos</h2>
        
      </Container>

      <div className="principal">
        <div className='barra-superior'>
          <h1 className="form-title" id="signup">Nombre del tablero</h1>
          
            <Button className = "cerrar" variant="primary" onClick={() => setModalShow(true)}>
              Crear Tarea
            </Button>

            <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
        </div>
        
      </div>
      </>
  );
}


function MydModalWithGrid(props) {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Tarea
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
      
            <Table striped bordered hover>
      <thead>
        <tr>
          <th colSpan={2}>
              <Form.Group controlId="validationCustomUsername">
                <InputGroup hasValidation>
                  
                  <Form.Control
                    type="text"
                    placeholder="Taskname"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a task name.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
          </th>
          
        </tr>
      </thead>
      <tbody>
        <tr >
          <td rowSpan={5}>
              <Form.Group as={Col} md="8"controlId="validationCustomUsername">
                <Form.Label>Descripción</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control as="textarea" rows={15} />
                  
                  <Form.Control.Feedback type="invalid">
                    Please choose a task name.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
          </td>
          <td>
              <Form.Group controlId="validationCustomUsername">
                <Form.Label>Fecha  Inicio</Form.Label>
                <InputGroup hasValidation>
                  
                  <Form.Control
                    type="text"
                    placeholder="Taskname"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a task name.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>


          </td>
        
        </tr>
        <tr>
          <td>
            <Form.Group controlId="validationCustomUsername">
                <Form.Label>Fecha Vencimiento</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Taskname"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a task name.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
          </td>
          
        </tr>
        <tr>
          <td>
            <Form.Group controlId="validationCustomUsername">
                <Form.Label>Usuario Asignado</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Taskname"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a task name.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
          </td>
          
        </tr>
        <tr>
          <td>
            <Form.Group controlId="validationCustomUsername">
                <Form.Label>Etiqueta</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Taskname"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a task name.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
          </td>
          
        </tr>
        <tr>
          <td>
            <Form.Group controlId="validationCustomUsername">
                <Form.Select aria-label="Estado">
                  <option>Estado</option>
                  <option value="1">Pendiente</option>
                  <option value="2">En Proceso</option>
                </Form.Select>
            </Form.Group>
          </td>
          
        </tr>
      </tbody>
    </Table>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

