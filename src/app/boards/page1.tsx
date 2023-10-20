import React from "react";
import { PageProps } from "../../../.next/types/app/layout";
import Tablero from "./Tablero";

export default function Page({ params }: PageProps) {
  return (
    <div>
      <Tablero></Tablero>
    </div>
  );
}
