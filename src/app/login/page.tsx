"use client"
import FormValidationError from '@/components/common/FormValidationError'
import InputValidated from '@/components/common/inputValidated'
import { useLoginForm } from '@/hooks/useLoginForm'
import { ErrorMessage } from '@hookform/error-message'
import Link from 'next/link'
import React from 'react'
import { Button, Card, Container, Form, FormControl, FormLabel } from 'react-bootstrap'
import { FormProvider } from 'react-hook-form'
import { Toaster } from 'react-hot-toast';

export default function Index() {

  const { handleSubmit, methods } = useLoginForm()


  return (
    <FormProvider {...methods}>
      <Container className='form-structor' fluid>
        <div className="signup">
          <h2 className="form-title" id="signup"> TaskBoard</h2>
          <h2 className="form-title" id="signup" > Login</h2>
          <Form   onSubmit={methods.handleSubmit(handleSubmit)} >
              
                <InputValidated 
                  label='Email'
                  type="text"  
                  name='email' />
                <InputValidated 
                  label='Contraseña'
                  name='password' 
                  type='password'/>

                <Button 
                  type='submit' 
                  className='submit-btn'>
                  Iniciar Sesión
                </Button>
          </Form> 
              Crear una cuenta 
              <Link href={"/register"}> Sign Up</Link>
        </div>
      </Container>
    </FormProvider>
  )
}
