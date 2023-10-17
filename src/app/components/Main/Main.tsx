"use client";
// import { createSpace } from "@/services/spaceService";
// import Link from "next/link";
// import { useRef, useState } from "react";
// import { Button, Col, Container, Row } from "react-bootstrap";
// import { CreateSpaceModal } from "./Modal";
// import { useForm, FormProvider } from "react-hook-form";
import SideBar from "../SideBar";
import Encabezado from "@/app/head/page";

export default function MainPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Encabezado />
      <div>
        <SideBar />
        <div className="p-5 py-20 left-40  fixed inset-y-16 w-full h-ful justify-between">
          {children}
        </div>
      </div>
    </>
  );
}
