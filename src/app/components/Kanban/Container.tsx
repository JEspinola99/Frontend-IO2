import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import clsx from 'clsx';
import { useState } from "react";
import { Button, Col, FormControl } from "react-bootstrap";
import { BiTrash } from "react-icons/bi"

export const ContainerColumn = ({
    id,
    children,
    title,
    onAddItem
}) => {

    const [titleValue, setTitleValue] = useState(title)

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

    const handleChange = (e) => {
        const value = e.target.value
        setTitleValue(() => value)
    }


    return (
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
            <div className="flex align-middle justify-center">
                <FormControl className="text-gray-800" size="sm" onChange={handleChange} value={titleValue} />
                <BiTrash size={20} />
            </div>
            {children}
            <Button variant='ghost' onClick={onAddItem}>Add Item</Button>
        </div>
    )
}