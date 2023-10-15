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
import { Main } from '@/app/components/espacio/Main'
import { getAllUsers } from '@/services/userService'
import { getSpaceUsers } from '@/services/spaceUserService'




export default async function Page({ params }: PageProps) {
  const id = params.id
  const { data } = await getSpace(id)

  const usersResponse = await getAllUsers()

  const users = usersResponse.data.map((user:any) =>({ value: user.id, label: user.email })).filter((user:any) => user.value != id)
  
  const usersInSpace = await getSpaceUsers(id)

  return (
    <Main data={data} id={id} users={users} usersInSpace={usersInSpace?.data.usuarios} />
  )
}