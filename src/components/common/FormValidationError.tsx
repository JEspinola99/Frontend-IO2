import React from 'react'


export default function FormValidationError({message}: {message: string}) {
  return (
    <p style={{color: 'red', margin: '0px'}}>{message}</p>
  )
}
