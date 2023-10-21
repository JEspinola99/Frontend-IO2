import { DndContext, DragEndEvent, DragMoveEvent, DragStartEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, closestCorners, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
// import { Container } from "./Container";
import { Items } from "./Items";
import { uuid } from "uuidv4";
import { Col, Container, Row } from "react-bootstrap";
import { ContainerColumn } from "./Container";

type DNDType = {
    id: UniqueIdentifier;
    title: string
    items: {
        id: UniqueIdentifier
        title: string
    }[]
}

export const Kanban = () => {

    const [containers, setContainers] = useState<DNDType[]>([
        {
            id: `container-${uuid()}`,
            title: 'Container 1',
            items: [
                {
                    id: `item-${uuid()}`,
                    title: 'Item 1'
                }
            ]
        },
        {
            id: `container-${uuid()}`,
            title: 'Container 2',
            items: [
                {
                    id: `item-${uuid()}`,
                    title: 'Item 2'
                }
            ]
        },
        {
            id: `container-${uuid()}`,
            title: 'Container 3',
            items: [
                {
                    id: `item-${uuid()}`,
                    title: 'Item 3'
                }
            ]
        },
        {
            id: `container-${uuid()}`,
            title: 'Container 4',
            items: [
                {
                    id: `item-${uuid()}`,
                    title: 'Item 4'
                }
            ]
        },
        {
            id: `container-${uuid()}`,
            title: 'Container 5',
            items: [
                {
                    id: `item-${uuid()}`,
                    title: 'Item 5'
                }
            ]
        },
        {
            id: `container-${uuid()}`,
            title: 'Container 6',
            items: [
                {
                    id: `item-${uuid()}`,
                    title: 'Item 6'
                }
            ]
        }
    ])
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [currentContainerId, setCurrentContainerId] = useState<UniqueIdentifier>()
    const [containerName, setContainerName] = useState('');
    const [itemName, setItemName] = useState('')
    const [showAddContainerModal, setShowAddContainerModal] = useState(false)
    const [showAddItemModal, setShowAddItemModal] = useState(false)

    const findValuesOfItems = (id: UniqueIdentifier | undefined, type: string) => {
        if (type == 'container') {
            return containers.find((container) => container.id === id);
        }
        if (type == 'item') {
            return containers.find((container) =>
                container.items.find((item) => item.id === id)
            )
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const { id } = active;
        setActiveId(id)
    }
    const handleDragMove = (event: DragMoveEvent) => {
        const { active, over } = event;

        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('item') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            const activeContainer = findValuesOfItems(active.id, 'item')
            const overContainer = findValuesOfItems(over.id, 'item')

            if (!activeContainer || !overContainer) return;

            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id,
            )

            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id
            )

            const activeItemIndex = activeContainer.items.findIndex(
                (item) => item.id == active.id
            )

            const overItemIndex = overContainer.items.findIndex(
                (item) => item.id == over.id
            )

            if (activeContainerIndex === overContainerIndex) {
                let newItems = [...containers]
                newItems[activeContainerIndex].items = arrayMove(
                    newItems[activeContainerIndex].items,
                    activeItemIndex,
                    overItemIndex
                )

                setContainers(newItems)
            } else {
                let newItems = [...containers]
                const [removedItem] = newItems[activeContainerIndex].items.splice(
                    activeItemIndex,
                    1
                )
                newItems[overContainerIndex].items.splice(
                    overItemIndex,
                    0,
                    removedItem
                )
                setContainers(newItems)
            }
        }

        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            const activeContainer = findValuesOfItems(active.id, 'item')
            const overContainer = findValuesOfItems(over.id, 'container')

            if (!activeContainer || !overContainer) return;

            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id
            )

            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id
            )

            const activeItemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id
            )

            let newItems = [...containers]
            const [removedItem] = newItems[activeContainerIndex].items.splice(
                activeItemIndex,
                1
            )

            newItems[overContainerIndex].items.push(removedItem)
            setContainers(newItems)
        }
    }
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if(
            active.id.toString().includes('container') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === active.id
            )

            const overContainerIndex = containers.findIndex(
                (container) => container.id === over.id
            )

            let newItems = [...containers];
            newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex)
            setContainers(newItems)
        }

        if(
            active.id.toString().includes('item') && 
            over?.id.toString().includes('item') &&
            active &&
            over &&
            active.id !== over.id
        ){
            const activeContainer = findValuesOfItems(active.id, 'item')
            const overContainer = findValuesOfItems(over.id, 'item')

            if(!activeContainer || !overContainer) return;

            const activeContainerIndex = containers.findIndex(
                (container) => container.id == activeContainer.id
            )

            const overContainerIndex = containers.findIndex(
                (container) => container.id == overContainer.id
            )

            const activeItemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id
            )

            const overItemIndex = overContainer.items.findIndex(
                (item) => item.id === over.id
            )

            if(activeContainerIndex === overContainerIndex) {
                let newItems = [...containers]
                newItems[activeContainerIndex].items = arrayMove(
                    newItems[activeContainerIndex].items,
                    activeItemIndex,
                    overItemIndex
                )
                setContainers(newItems)
            }else{
                let newItems = [...containers]
                const [removedItem] = newItems[activeContainerIndex].items.splice(
                    activeItemIndex,
                    1
                )
                newItems[overContainerIndex].items.splice(
                    overItemIndex,
                    0,
                    removedItem
                )
                setContainers(newItems)
            }
        }

        if(
            active.id.toString().includes('item') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            const activeContainer = findValuesOfItems(active.id, 'item')
            const overContainer = findValuesOfItems(over.id, 'container')

            if(!activeContainer || !overContainer) return;

            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id
            )

            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id    
            )

            const activeItemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id
            )

            let newItems = [...containers]
            const [removedItem] = newItems[activeContainerIndex].items.splice(
                activeItemIndex,
                1
            )
            newItems[overContainerIndex].items.push(removedItem)
            setContainers(newItems)
        }
        setActiveId(null)
     }

    const deleteColumn = (e) => { 
        console.log(e)
        const newContainers = containers.filter((container, index) => index != e)
        setContainers(newContainers)
    }

    return (
        <Container fluid className="border">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={containers.map((container) => container.id)}>
                    <Row className="border">
                        {
                            containers.map((container) => (
                                <Col sm={2} onClick={() => deleteColumn(container)}>
                                    <ContainerColumn
                                        title={container.title}
                                        key={container.id}
                                        id={container.id}
                                        onAddItem={() => {
                                            setShowAddItemModal(true)
                                            setCurrentContainerId(container.id)
                                        }}
                                    >
                                        <SortableContext
                                            items={container.items.map((i) => i.id)}
                                        >
                                            <div className="flex items-start flex-col gap-y-4">
                                                {container.items.map((item) => (
                                                    <Items key={item.id} id={item.id} title={item.title} />
                                                ))}
                                            </div>
                                        </SortableContext>
                                    </ContainerColumn>
                                </Col>
                            ))
                        }
                    </Row>
                </SortableContext>
            </DndContext>
        </Container>
    )
}