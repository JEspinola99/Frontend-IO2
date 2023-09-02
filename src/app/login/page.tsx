"use client"
import FormValidationError from '@/components/common/FormValidationError'
import InputValidated from '@/components/common/inputValidated'
import { useLoginForm } from '@/hooks/useLoginForm'
import { ErrorMessage } from '@hookform/error-message'
import Link from 'next/link'
import React from 'react'
import { Button, Card, Container, Form, FormControl, FormLabel } from 'react-bootstrap'
import { Controller, FormProvider } from 'react-hook-form'
import { Toaster } from 'react-hot-toast';

export default function Index() {

  const { handleSubmit, methods } = useLoginForm()


  return (
    <FormProvider {...methods}>
      <Container className='containerForm' fluid>
        <Toaster position="top-right" />
        <Card className='cardForm'>
          <Card.Header>
            <h2>Iniciar Sesion</h2>
          </Card.Header>
          <Card.Body>

            <Form className='loginForm' onSubmit={methods.handleSubmit(handleSubmit)} >
              <Container>
                <InputValidated name='email' label='Correo Electrónico' />
              </Container>

              <Container>
                <InputValidated name='password' type='password' label='Contraseña' />
              </Container>

              <Button type='submit'>
                Iniciar Sesion
              </Button>
              <Link href={"/register"}>Registrarte</Link>

            </Form>
          </Card.Body>
        </Card>
      </Container>
    </FormProvider>
  )
}
