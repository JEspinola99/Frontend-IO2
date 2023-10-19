import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style}></div>;
  }

  return (
    <Card
      className="bg-sky-300 p-3 w-80  hover:bg-sky-400 rounded-md"
      style={{ width: "25rem" }}
    >
      <Card.Body>
        <div ref={setNodeRef} style={style}>
          {/* Column title */}
          <div
            {...attributes}
            {...listeners}
            onClick={() => {
              setEditMode(true);
            }}
          >
            <div>
              {!editMode && column.title}
              {editMode && (
                <input
                  value={column.title}
                  onChange={(e) => updateColumn(column.id, e.target.value)}
                  autoFocus
                  onBlur={() => {
                    setEditMode(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    setEditMode(false);
                  }}
                />
              )}

              <button
                className="cerrar"
                onClick={() => {
                  deleteColumn(column.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Column task container */}
          <div>
            <SortableContext items={tasksIds}>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
          {/* Column footer */}
          <button
            onClick={() => {
              createTask(column.id);
            }}
          >
            Add task
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ColumnContainer;
