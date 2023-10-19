"use client";
import { useLoginForm } from "@/hooks/useLoginForm";
import React from "react";
import {
  ButtonGroup,
  Button,
  Col,
  Container,
  FormControl,
  Modal,
  Row,
  Navbar,
  Nav,
  Dropdown,
} from "react-bootstrap";
import "../globals.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";

export default function Encabezado() {
  const { handleLogout } = useLoginForm();

  return (
    <>
      <Navbar className="h-20 w-full" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">TaskBoard</Navbar.Brand>
          <Nav className="me-auto"></Nav>
          <div className="mb-2 ">
            {["start"].map((direction) => (
              <DropdownButton
                as={ButtonGroup}
                key={direction}
                id={`dropdown-button-drop-${direction}`}
                drop={direction}
                variant="secondary"
                title={
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      />
                    </svg>
                  </>
                }
              >
                <Dropdown.Item eventKey="1">
                  <Button
                    className="w-20"
                    variant="secondary"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </Dropdown.Item>
              </DropdownButton>
            ))}
          </div>
        </Container>
      </Navbar>
    </>
  );
}
