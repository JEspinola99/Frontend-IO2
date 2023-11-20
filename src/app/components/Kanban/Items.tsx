"use client";
import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { RiDraggable } from "react-icons/ri";

type ITemsType = {
  id: UniqueIdentifier | string;
  title: string;
  index: number;
  parent: UniqueIdentifier;
  handleOpenTask: (id: string) => void;
  fechaVencimiento: number;
};

export const Items = ({
  id,
  title,
  index,
  parent,
  handleOpenTask,
  fechaVencimiento,
}: ITemsType) => {
  const { attributes, listeners, setNodeRef, transform, active } = useDraggable(
    {
      id: id,
      data: {
        title,
        id,
        parent,
        type: "item",
      },
    }
  );

  const date = new Date().getTime();
  const expiredDate = date >= fechaVencimiento;
  const isDragging = active?.id == id;
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx("bg-white text-black hover:border-white rounded-md")}
    >
      <div
        className={`p-3 flex flex-row items-stretch gap-1 rounded-md ${
          expiredDate ? "userActive" : ""
        } `}
      >
        <span
          className="flex-grow-1 user-select-none"
          onClick={() => handleOpenTask(id as string)}
        >
          {title}
        </span>
        <span
          {...listeners}
          className={`icon-grab ${isDragging ? "active" : ""}`}
        >
          <RiDraggable size={25} />
        </span>
      </div>
    </div>
  );
};
