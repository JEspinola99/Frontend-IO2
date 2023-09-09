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

export default function Espacio() {
  const { handleSubmit, methods } = useLoginForm()

  const  email = useUserStore((state) => state.email)

  return (
    <FormProvider {...methods}>

        <div className="barra-superior">
          <h1>TaskBoard</h1>
          
          <Button className='cerrarsexion'>Cerrar Seción</Button>
          
        </div>

      <Container className ="barra-izquierda">
          <h2 className="form-title" id="signup"> TaskBoard</h2>


      </Container>

      <Container className ="principal">
          <h2 className="form-title" id="signup"> ESPACIO DE TRABAJO</h2>
          <Button className='submit-btn'>
            Crear un tablero nuevo
          </Button>

      </Container>
     
    </FormProvider >
    
  )
}