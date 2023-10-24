"use client"
import { UniqueIdentifier, useDraggable } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS  } from "@dnd-kit/utilities"
import clsx from 'clsx';



type ITemsType = {
    id: UniqueIdentifier
    title: string
    index: number
    parent: UniqueIdentifier
}

export const Items = ({id, title, index, parent}: ITemsType) => {
    // const {
    //     attributes,
    //     listeners,
    //     setNodeRef,
    //     transform,
    //     transition,
    //     isDragging
    // } = useSortable({
    //     id,
    //     data: {
    //         type: 'item'
    //     }
    // })
    const { attributes, listeners,  setNodeRef, transform } = useDraggable({
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
            <span className="itemDraggable" {...listeners}>
                {title}
            </span>
        </div>
    )
}