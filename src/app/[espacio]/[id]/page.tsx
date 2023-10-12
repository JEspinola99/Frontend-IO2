// "use client"
import FormValidationError from '@/components/common/FormValidationError'
import InputValidated from '@/components/common/inputValidated'
import { apiClient } from '@/helpers/validations/login/apiClient'
import { useLoginForm } from '@/hooks/useLoginForm'
import { useUserStore } from '@/store/user'
import { ErrorMessage } from '@hookform/error-message'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Dropdown, Button, Card, Container, Form, Offcanvas, FormLabel } from 'react-bootstrap'
import { Controller, FormProvider } from 'react-hook-form'
import { Toaster } from 'react-hot-toast';
import Modal from 'react-bootstrap/Modal';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import { PageProps } from '../../../../.next/types/app/layout'
import { getSpace } from '@/services/spaceService'
import Encabezado from "../../head/page";




export default async function Page({ params }: PageProps) {
  const id = params.id
  const { data } = await getSpace(id)
  console.log(data)
  // const { handleLogout } = useLoginForm()

  // const state = useUserStore((state) => state)
  // const [spaces, setSpaces] = useState([])

  // const email = useUserStore((state) => state.email)

  // const [smShow, setSmShow] = useState(false);

  // const [lgShow, setLgShow] = useState(false);
  // const handleClose = () => setLgShow(false);
  // const handleShow = () => setLgShow(true);

  // const [show, setShow] = useState(false);

  // const Close = () => setShow(false);
  // const Showw = () => setShow(true);

  return (
    <>
      <Encabezado/>
      <h1>Espacio: {data.nombre}</h1>
      <h1>Tableros</h1>
      {
        data.Tablero?.map((item) => (
          <div key={item.id}>{item.nombre}</div>
        ))
      }
      {/* <div className="barra-superior">
        <h1>TaskBoard</h1>
          

          <Button className="crear"onClick={() => setLgShow(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </Button>


          <Dropdown className="cerrar">
      <Dropdown.Toggle variant="secondary"  id="dropdown-basic">
       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
      </Dropdown.Toggle>

      <Dropdown.Menu >
        <Dropdown.Item ><Button variant="secondary" onClick={handleLogout}>
            Cerrar Sesión
          </Button></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

         


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
              controlId="exampleForm.Controlmiembros1"
            >
              <Form.Label>Miembros</Form.Label>
              <Form.Control as="textarea"  />
            </Form.Group>
          </Form>
            </Modal.Body>
              <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Save 
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
               
              </Modal.Footer>
          </Modal>
      </div>

      <div className="principal">
        
      
        

      </div> */}
    </>
  )
}

/*
<Button className="boton" variant="primary" onClick={Showw}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
          </svg>
        </Button>
        <center>
          <h2 > ESPACIOS DE TRABAJO</h2>
        </center>
       
        <Offcanvas show={show} onHide={Close}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>

*/