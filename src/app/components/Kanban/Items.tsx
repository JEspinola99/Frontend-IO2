"use client"
import { UniqueIdentifier, useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import clsx from 'clsx';
import { RiDraggable } from 'react-icons/ri'



type ITemsType = {
    id: UniqueIdentifier | string
    title: string
    index: number
    parent: UniqueIdentifier
    handleOpenTask: (id:string) => void
    fechaVencimiento: number
}

export const Items = ({ id, title, index, parent, handleOpenTask, fechaVencimiento }: ITemsType) => {
    const { attributes, listeners, setNodeRef, transform, active } = useDraggable({
        id: id,
        data: {
            title,
            id,
            parent,
            type: 'item'
        },
    });

    const date = new Date().getTime()
    const expiredDate = date >= fechaVencimiento;
    const isDragging = active?.id == id
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
            <div className={`d-flex items-center ${expiredDate ? 'userActive': ''} `}>
                <span className="border flex-grow-1 user-select-none" onClick={() =>handleOpenTask(id as string)} >
                    {title}
                </span>
                <span {...listeners} className={`icon-grab ${isDragging ? 'active': ''}`}>
                    <RiDraggable size={25} />
                </span>
            </div>
        </div>
    )
}