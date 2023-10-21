import { UniqueIdentifier } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS  } from "@dnd-kit/utilities"
import clsx from 'clsx';



type ITemsType = {
    id: UniqueIdentifier
    title: string
}

export const Items = ({id, title}: ITemsType) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id,
        data: {
            type: 'item'
        }
    })

    return (
        <div
        ref={setNodeRef}
        {...attributes}
        style={{
            transition,
            transform: CSS.Translate.toString(transform)
        }}
        className={clsx(
            ' bg-white shadow-md rounded-xl border border-transparent hover:border-white',
            isDragging && 'opacity-50'
        )}
        >
            <span className="itemDraggable" {...listeners}>
                {title}
            </span>
        </div>
    )
}