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
import KanbanBoard from "../components/KanbanBoard";
import Espacio from "../espacio/page";

export default function Boards() {
  const { handleLogout } = useLoginForm()
  const email = useUserStore((state) => state.email);

  const [smShow, setSmShow] = useState(false);

  const [lgShow, setLgShow] = useState(false);
  const handleClose = () => setLgShow(false);
  const handleShow = () => setLgShow(true);

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
    
      <Espacio/>
        <div className="principal">
        <div className='barra-superior'>
        
            
          <h1>Nombre</h1>
          
            <Button className = "task-btn"  onClick={() => setModalShow(true)}>
              Crear Tarea
            </Button>
          


            <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />


            <KanbanBoard />

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
    <Modal {...props} size="lg" aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
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

