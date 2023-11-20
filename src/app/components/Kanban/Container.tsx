"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { Button, Col, FormControl, Row } from "react-bootstrap";
import { DeleteColumnModal } from "./DeleteColumnModal";
import { deleteColumn, updateColumn } from "@/services/columnService";
import { SpaceContext } from "@/context/SpaceContext";
import { useStore } from "zustand";
import { CreateTaskModal } from "./CreateTaskModal";
import { useDroppable } from "@dnd-kit/core";
import { debounce } from "lodash";

export const ContainerColumn = ({
  id,
  children,
  title,
  onAddItem,
  tasks,
  maxTareas,
}: any) => {
  const [titleValue, setTitleValue] = useState(title);

  const store = useContext(SpaceContext);
  const { setNewColumn, boardActive, boards } = useStore(store, (e) => e);

  const {
    // attributes,
    setNodeRef,
    // listeners,
    // transform,
    // transition,
    // isDragging
  } = useDroppable({
    id,
    data: {
      type: "container",
    },
  });

  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(() => true);
  const handleClose = () => setShow(() => false);

  const handleDeleteColumn = async () => {
    const res = await deleteColumn(id);
    const newColums = boardActive.columnas.filter((col) => col.id != id);
    setNewColumn(newColums);
    handleClose();
  };

  const handleSubmit = debounce(async () => {
    const res = await updateColumn(titleValue, id);
  }, 1000);

  const [showTask, setShowTask] = useState(false);
  const handleOpenTask = () => setShowTask(() => true);
  const handleCloseTask = () => setShowTask(() => false);

  useEffect(() => {
    handleSubmit();
    return () => {
      handleSubmit.cancel();
    };
  }, [titleValue]);

  return (
    <>
      <DeleteColumnModal
        show={show}
        handleClose={handleClose}
        deleteColumn={handleDeleteColumn}
      />

      <CreateTaskModal
        show={showTask}
        handleClose={handleCloseTask}
        columnId={id}
      />

      <div
        // {...attributes}
        ref={setNodeRef}
        style={
          {
            // transition,
            // transform: CSS.Translate.toString(transform)
          }
        }
        className={clsx(
          `hover:bg-sky-400 rounded-md p-2 gap-3 flex flex-col containerBoard ${
            tasks >= maxTareas ? "maxTasks" : ""
          }`
          // isDragging && 'opacity-50'
        )}
      >
        <div className="flex flex-row items-stretch gap-2">
          <FormControl
            className="border break-word d-flex items-center justify-center"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <div className="d-flex items-center">
            <span className="p-0">
              <button
                title="Eliminar Columna"
                className="p-1 gap-1"
                onClick={handleOpen}
              >
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
        {children}
        <Button variant="secondary" size="sm" onClick={handleOpenTask}>
          Agregar Tarea
        </Button>
      </div>
    </>
  );
};
