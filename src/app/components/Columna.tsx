import React from "react";
import { useState } from "react";

interface Props {
  items: string[];
}
function Columna({ items }: Props) {
  return (
    <>
      {items.map((item) => (
        <div
          key={item}
          className="bg-sky- p-3 w-80  hover:bg-sky-400 rounded-md"
        >
          <h4 className="flex justify-between items-center">
            <span className="text-2xl text-sky-950">{item}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </h4>
          <div className="bg-white rounded-md">
            <input
              id="addTask"
              type="text"
              placeholder="Agregar Tarea"
              className="bg-transparent border-0 placeholder-gray-300 text-black outline-1 focus:ring-0 text-lg"
            />
          </div>
        </div>
      ))}
      ;
    </>
  );
}

export default Columna;
