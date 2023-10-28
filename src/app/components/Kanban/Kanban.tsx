"use client"
import { DndContext, DragEndEvent, DragMoveEvent, DragStartEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, closestCorners, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useContext, useEffect, useState } from "react";
import { Items } from "./Items";
import { Col, Container, Row } from "react-bootstrap";
import { ContainerColumn } from "./Container";
import { SpaceContext } from "@/context/SpaceContext";
import { useStore } from "zustand";
import FidgetSpinner from "react-loader-spinner";
import { Loader } from "../Loader";
import { IBoard, IColumn, ITask } from "@/store/space";
import { IUpdateColumns, updateColums } from "@/services/columnService";
import { create, deleteTask, getTask } from "@/services/taskService";
import { UpdateTaskModal } from "./UpdateTaskModal";

type DNDType = {
    id: UniqueIdentifier;
    nombre: string
    tareas: ITask[]
    tableroId: number
}

export const Kanban = () => {

    const store = useContext(SpaceContext)
    const { boardActive, loadingKanban, setBoardActive } = useStore(store, (s) => s)

    const [currentContainerId, setCurrentContainerId] = useState<UniqueIdentifier>()
    const [showAddItemModal, setShowAddItemModal] = useState(false)
    const [showTask, setShowTask] = useState(false)
    const handleCloseTask = () => setShowTask(() => false)
    const [taskData, setTaskData] = useState<ITask>({} as ITask);
    const handleOpenTask = async(id:string) => {
        const {data} = await getTask(id)
        const task:ITask = {
            titulo: data.titulo,
            descripcion: data.descripcion,
            fechaVencimiento: data.fechaVencimiento.split('T')[0],
            usuarioId: data.usuarioId,
            etiquetaId: data.etiquetaId
        }
        setShowTask(() => true)
        setTaskData(task)
    } 

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (active?.data?.current?.parent == over?.id) return;
        const columnId1 = active?.data?.current?.parent
        const columnId2 = over?.id as number
        const activeCol = boardActive.columnas.find((col) => col.id == active?.data?.current?.parent)
        const activeColIndex = boardActive.columnas.findIndex((col) => col.id == active?.data?.current?.parent)
        const overColIndex = boardActive.columnas.findIndex((col) => col.id == over?.id)

        const updatedItems = activeCol?.tareas.filter((item) => item.id != active?.data?.current?.id) as ITask[]
        const removedItem = activeCol?.tareas.filter((item) => item.id == active?.data?.current?.id) as ITask[]
        const {data} = await create({ ...removedItem[0], columnaId: columnId2 })
        


        const newContainers: IColumn[] = boardActive.columnas.map((col, index) => {
            if (index == activeColIndex) {
                const column: IColumn = { ...col, tareas: updatedItems }
                return column;
            } else if (index == overColIndex) {
                const overItems = col.tareas
                return { ...col, tareas: overItems?.concat(data) }
            } else {
                return { ...col };
            }
        })

        await deleteTask({ id: removedItem[0].id, columnaId: columnId1 })
        const updatedBoardActive: IBoard = { ...boardActive, columnas: newContainers }
        setBoardActive(updatedBoardActive)
    }

    return (
        <>
            {
                loadingKanban ? <Loader /> :
                    <>
                        <UpdateTaskModal
                            show={showTask}
                            handleClose={handleCloseTask}
                            taskData={taskData}
                             />
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCorners}
                            onDragEnd={handleDragEnd}
                            id='list'
                        >
                            <Row className="border">
                                {
                                    boardActive.columnas?.map((container) => (
                                        <Col sm={2} className="p-1" key={container.id}>
                                            <ContainerColumn
                                                title={container.nombre}
                                                key={container.id}
                                                id={container.id}
                                                onAddItem={() => {
                                                    setShowAddItemModal(true)
                                                    setCurrentContainerId(container.id)
                                                }}
                                            >
                                                <div className="flex items-start flex-col gap-1 border">
                                                    {container?.tareas?.map((item, index) => (
                                                        <Items
                                                            parent={container.id}
                                                            key={item.id}
                                                            id={item.id as UniqueIdentifier}
                                                            index={item.id as number}
                                                            title={item.titulo}
                                                            handleOpenTask={handleOpenTask}
                                                        />
                                                    ))}
                                                </div>
                                            </ContainerColumn>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </DndContext>
                    </>
            }
        </>
    )
}