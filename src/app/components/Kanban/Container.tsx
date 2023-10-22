import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import clsx from 'clsx';
import { useContext, useState } from "react";
import { Button, Col, FormControl, Row } from "react-bootstrap";
import { BiTrash } from "react-icons/bi"
import { DeleteColumnModal } from "./DeleteColumnModal";
import { deleteColumn, updateColumn } from "@/services/columnService";
import { SpaceContext } from "@/context/SpaceContext";
import { useStore } from "zustand";
import { CreateTaskModal } from "./CreateTaskModal";

export const ContainerColumn = ({
    id,
    children,
    title,
    onAddItem
}:any) => {

    const [titleValue, setTitleValue] = useState(title)

    const store = useContext(SpaceContext)
    const { setNewColumn, boardActive, boards } = useStore(store, (e) => e)

    const {
        attributes,
        setNodeRef,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id,
        data: {
            type: 'container'
        }
    })

    const [show, setShow] = useState(false)
    const handleOpen = () => setShow(() => true)
    const handleClose = () => setShow(() => false)

    const handleDeleteColumn = async () => {
        const res = await deleteColumn(id)
        const newColums = boardActive.columnas.filter((col) => col.id != id)
        setNewColumn(newColums)
        handleClose()
    }

    const handleSubmit = async () => {
        const res = await updateColumn(titleValue, id)
    }

    const [showTask, setShowTask] = useState(false)
    const handleOpenTask = () => setShowTask(() => true)
    const handleCloseTask = () => setShowTask(() => false)

    return (
        <>
            {/* <DeleteColumnModal
                show={show}
                handleClose={handleClose}
                deleteColumn={handleDeleteColumn}
            />

            <CreateTaskModal
                show={showTask}
                handleClose={handleCloseTask}
                columnId={id}
             /> */}

            <div
                {...attributes}
                ref={setNodeRef}
                style={{
                    transition,
                    transform: CSS.Translate.toString(transform)
                }}
                className={clsx(
                    ' bg-gray-50 containerBoard',
                    isDragging && 'opacity-50'
                )}
            >
                <div className="d-flex flex-col items-stretch gap-2">
                    <FormControl
                        className="border break-word d-flex items-center justify-center"
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}
                    />
                    <div className="d-flex items-center justify-between">
                        <span className="p-0">
                            <Button size="sm" variant="danger" role="button" onClick={handleOpen}>
                                Eliminar
                            </Button>
                        </span>
                        <span className="p-0">
                            <Button size="sm"  onClick={handleSubmit}>Guardar</Button>
                        </span>
                    </div>
                </div>
                {children}
                <Button variant='secondary' size="sm" onClick={handleOpenTask}>Agregar Tarea</Button>
            </div>
        </>
    )
}