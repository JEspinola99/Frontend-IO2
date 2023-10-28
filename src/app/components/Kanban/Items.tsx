"use client"
import { UniqueIdentifier, useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import clsx from 'clsx';
import { RiDraggable } from 'react-icons/ri'



type ITemsType = {
    id: UniqueIdentifier
    title: string
    index: number
    parent: UniqueIdentifier
    handleOpenTask: () => void
}

export const Items = ({ id, title, index, parent, handleOpenTask }: ITemsType) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        data: {
            title,
            id,
            parent,
            type: 'item'
        },
    });


    return (
        <div
            ref={setNodeRef}
            {...attributes}
            style={{
                transform: CSS.Translate.toString(transform)
            }}
            className={clsx(
                ' bg-white shadow-md rounded-xl border border-transparent hover:border-white',
            )}
        >
            <div className="d-flex border items-center">
                <span className="border flex-grow-1 user-select-none" onClick={handleOpenTask} >
                    {title}
                </span>
                <span {...listeners} className="icon-grab">
                    <RiDraggable size={25} />
                </span>
            </div>
        </div>
    )
}