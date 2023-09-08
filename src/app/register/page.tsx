"use client"
import FormValidationError from '@/components/common/FormValidationError'
import InputValidated from '@/components/common/inputValidated'
import { useLoginForm } from '@/hooks/useLoginForm'
import { useRegisterForm } from '@/hooks/useRegisterForm'
import { ErrorMessage } from '@hookform/error-message'
import Link from 'next/link'
import React from 'react'
import { Button, Card, Col, Container, Form, FormControl, FormLabel, Row } from 'react-bootstrap'
import { Controller, FormProvider } from 'react-hook-form'
import { Toaster } from 'react-hot-toast';

export default function Index() {

  const { handleSubmit, methods } = useRegisterForm()


  return (
    <FormProvider {...methods}>
      <Container className='containerForm' fluid>
        <Toaster position="top-right" />
        <Card className='cardForm'>
          <Card.Header>
            <h2>Registrarse</h2>
          </Card.Header>
          <Card.Body>

            <Form className='loginForm' onSubmit={methods.handleSubmit(handleSubmit)} >

              <Row>
                <Col>
                  <InputValidated name='name' label='Nombre' />
                </Col>
                {/* <Col>
                  <InputValidated name='lastName' label='Apellido' />
                </Col> */}

              </Row>

              <Row>
                <Col>
                  <InputValidated name='email' label='Correo Electrónico' />
                </Col>
                <Col>
                  <InputValidated name='password' type='password' label='Contraseña' />
                </Col>
              </Row>

              <Button type='submit'>
                Registrarse
              </Button>
              <Link href={"/login"}>Iniciar Sesión</Link>

            </Form>
          </Card.Body>
        </Card>
      </Container>
    </FormProvider>
  )
}
