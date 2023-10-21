import { ICreateColumn, createColumn } from '@/services/columnService';
import { createBoard } from '@/services/spaceService';
import { useSpaceStore } from "@/store/space"
import { useState } from 'react';

export const useSpaceComponent = (id: string) => {
  
  const [showBoardModal, setShowBoardModal] = useState(false)
  const handleOpenBoardModal = () => setShowBoardModal(() => true)
  const handleCloseBoardModal = () => setShowBoardModal(() => false)
  const [showCreateColumnModal, setShowCreateColumnModal] = useState(() => false)

  const handleOpenCreateColumnModal = () => setShowCreateColumnModal(() => true)
  const handleCloseCreateColumnModal = () => setShowCreateColumnModal(() => false)

  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(() => false)
  }

  const handleOpen = async () => {
    setShow(() => true)
  }

  const createBoardHandler = (data: any) => {
    const fetchData = {
      nombre: data.nombre,
      espacioDeTrabajoId: Number(id)
    }
    return createBoard(fetchData)
  }


  return (
    {
      createBoardHandler,
      handleCloseBoardModal,
      handleOpenBoardModal,
      showBoardModal,
      show,
      handleClose,
      handleOpen,
      handleCloseCreateColumnModal,
      handleOpenCreateColumnModal,
      showCreateColumnModal,
    }
  )
}