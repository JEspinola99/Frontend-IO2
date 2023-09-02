"use client"
import FormValidationError from '@/components/common/FormValidationError'
import { useLoginForm } from '@/hooks/useLoginForm'
import { useRegisterForm } from '@/hooks/useRegisterForm'
import { ErrorMessage } from '@hookform/error-message'
import { Button, Card, CardContent, CardHeader, Container, TextField } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Toaster } from 'react-hot-toast';

export default function Index() {

  const { handleSubmit, methods } = useRegisterForm()


  return (
    <Container maxWidth={'sm'} sx={{ marginTop: '5rem' }}>
      <Toaster position="top-right" />
      <Card>
        <CardContent>
          <form className='loginForm' onSubmit={methods.handleSubmit(handleSubmit)} >
            <h1>Registrarte</h1>
            <Container sx={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column' }}>

              <Controller name='email' control={methods.control} render={({ field }) => (
                <TextField
                  {...field}
                  label="Email" />
              )} />

              <ErrorMessage
                errors={methods.formState.errors}
                name="email"
                render={({ message }) => <FormValidationError message={message} />}
              />
            </Container>

            <Container  sx={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column' }}>
              <Controller name='password' control={methods.control} render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña"
                  type="password" />
              )} />

              <ErrorMessage
                errors={methods.formState.errors}
                name="password"
                render={({ message }) => <FormValidationError message={message} />}
              />
            </Container>


            <Button variant="contained" type='submit' color="primary">
              Registrarte
            </Button>
            <Link href={"/login"}>Iniciar Sesion</Link>

          </form>
        </CardContent>
      </Card>
    </Container>
  )
}
