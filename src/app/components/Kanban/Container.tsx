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

export const ContainerColumn = ({
    id,
    children,
    title,
    onAddItem
}) => {

    const [titleValue, setTitleValue] = useState(title)

    const store = useContext(SpaceContext)
    const { setNewColumn, boardActive } = useStore(store, (e) => e)

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

    return (
        <>
            <DeleteColumnModal
                show={show}
                handleClose={handleClose}
                deleteColumn={handleDeleteColumn}
            />

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
                <Button variant='secondary' size="sm" onClick={onAddItem}>Agregar Tarea</Button>
            </div>
        </>
    )
}