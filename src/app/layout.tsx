"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar, Container, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
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
        {children}
      </body>
    </html>
  )
}
