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


export default function Home() {
  const { handleLogout } = useLoginForm()

  const email = useUserStore((state) => state.email);

  return (
    <>
    <div className="barra-superior">
        <h1>TaskBoard</h1>

        <Button className='cerrar' onClick={handleLogout}>Cerrar Sesión</Button>

        <a href="#modal1">
              <Button className='crear'>Crear</Button>
        </a>
      </div>

      <Container className="barra-izquierda">
        <h2 className="form-title" > Proyectos</h2>
        <div id="modal1" class="modalmask">
          <div class="modalbox movedown">
            <h2>Proyecto</h2>
              
              Nombre del Espacio
              <input className='caja' />
              Descripción
              <input className='caja'/>
              Miembros
              <input className='caja'/>
              
              <Button className='boton' >
                ACEPAR
              </Button >
              <a href="#close" title="Close" >
                <Button className='boton'>
                  CERRAR
                </Button>
              </a>
             
          </div>
        </div>
        <div id="tarea" className="modalmask">
          <div className="modalboards movedown">

            <table>
              <tr>
                <th> 
                    Nombre de la tarea
                    <input className='caja2' />
                </th>
              </tr>

              <tr>
                <th rowSpan={7}>
                    Descripción
                    <textarea className='cajita'/>
                </th>
                 <th>
                    Fecha Inicio
                    <input className='caja2' />
                </th>
              </tr>

              <tr>
                
                 <th>
                    Fecha de vencimiento
                     <input className='caja2' />
                </th>
              </tr>
              <tr>
                
                 <th>
                     Usuario Asignado
                    <input className='caja2'/>
                </th>
              </tr>
              <tr>
               
                 <th>
                     Etiqueta
                    <input  className='caja2'/>
                </th>
              </tr>
              <tr><th>Estado</th> </tr>

              <tr>
                <th><input type ="radio"checked name ="estado"/>Pendiente</th>
              </tr>
              <tr>
                <th><input type ="radio" name ="estado"/>En Proceso</th>
              </tr>
            </table>

              <Button className='boton' >
                ACEPAR
              </Button >
              <a href="#close" title="Close" >
                <Button className='boton'>
                  CERRAR
                </Button>
              </a>
             
          </div>
        </div>
      </Container>

      <div className="principal">
        <div className='barra-superior'>
          <h1 className="form-title" id="signup">Nombre del tablero</h1>
          <a href="#tarea">
            <Button className='cerrar'>Crear Tarea</Button>
          </a>
        </div>
        
      </div>
      </>
  );
}
