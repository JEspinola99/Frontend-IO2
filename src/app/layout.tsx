"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar, Container, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TaskBoard',
  description: 'TaskBoard es un sistema que utiliza el tablero Kanban',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
       <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">TaskBoard</Navbar.Brand>
          <Nav className="me-auto">
          </Nav>
        </Container>
      </Navbar>
        {children}
      </body>
    </html>
  )
}
