"use client"
import '../globals.css'
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
      <Container className='form-structor' fluid>
        <div className="signup">
          <h2 className="form-title" id="signup"> TaskBoard</h2>
          <h2 className="form-title" id="signup" > Sign Up</h2>
          <Form   onSubmit={methods.handleSubmit(handleSubmit)} >
            <InputValidated 
            name='nombre' 
            label='Nombre' />
      
      
    
            <InputValidated 
              name='email' 
              label='Correo Electrónico' />
       
            <InputValidated 
              name='password' 
              type='password' 
              label='Contraseña' />
      
              <Button 
                type='submit' 
                className='submit-btn'>
                Registrarse
              </Button>
          </Form>
            Ya tienes una cuenta
            <Link href={"/login"}> Login</Link>
        </div>
      </Container>
    </FormProvider>
  )
}
