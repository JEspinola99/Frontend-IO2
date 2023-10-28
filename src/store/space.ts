import { UniqueIdentifier } from '@dnd-kit/core';
import { Id } from './../app/types';
import { createStore } from 'zustand';

export interface IBoard {
    id: number
    nombre: string
    columnas: IColumn[]
} 

export interface ITask {
    id?: number | UniqueIdentifier
    titulo: string
    descripcion: string
    fechaVencimiento: string
    usuarioId: number | null
    etiquetaId: number | null
    nombre?: string
    columnaId?: number
}

export interface IMiembro {
    id: number
    email: string
}

export interface IEtiqueta {
    id: number
    nombre: string
    color: string
}


export interface IColumn {
    id: number
    nombre: string
    tableroId: number
    tareas: ITask[]
}

export interface ISpaceData {
    nombre: string
    miembros: IMiembro[]
    boards: []
    opciones: []
    boardActive: IBoard
    userActive: IMiembro
    loadingKanban: boolean
}

export interface ISpace {
    nombre:string
    miembros: IMiembro[]
    boards: IBoard[]
    opciones: string[]
    setNewBoard: (tablero:IBoard[]) => void;
    boardActive: IBoard;
    userActive: IMiembro
    id: string
    loadingKanban: boolean
    etiquetas: IEtiqueta[]
    setUsers: (miembros:[]) => void;
    setSpaceData: (spaceData: ISpaceData) => void;
    setName: (nombre: string) => void;
    setBoardActive: (board: IBoard) => void;
    setNewColumn: (columnas: IColumn[]) => void;
    setLoadingKanban: (isLoading: boolean)=> void;
    setUserActive: (usuario: IMiembro) => void;
}

export interface ISpaceValues {
    nombre: string
    miembros: IMiembro[]
    boards: IBoard[]
    opciones: string[]
    boardActive: IBoard
    id: string
    loadingKanban: boolean
    etiquetas: IEtiqueta[]
    userActive: IMiembro
}

export const useSpaceStore = (iniProps?: Partial<ISpace>) => {
    const DefaultProps: ISpaceValues = {
        nombre: '',
        miembros: [],
        boards: [],
        opciones: [],
        boardActive: {id: 0, nombre: '', columnas: []},
        id: '',
        loadingKanban: false,
        etiquetas: [],
        userActive: {id: 0, email: ''}
    }

    return createStore<ISpace>()((set) => ({
        ...DefaultProps,
        ...iniProps,
        setNewBoard: (boards) => set((state) => ({...state, boards})),
        setUsers: (miembros) => set((state) => ({...state, miembros})),
        setSpaceData: (spaceData) => set((state) => ({...state, ...spaceData})),
        setName: (nombre) => set((state) => ({...state, nombre})),
        setBoardActive: (boardActive) => set((state) => ({...state, boardActive})),
        setNewColumn: (columnas) => set((state) => ({boardActive: {...state.boardActive, columnas}})),
        setLoadingKanban: (loadingKanban) => set((state) => ({...state, loadingKanban})),
        setUserActive:(usuario) => set((state) => ({...state, userActive: usuario}))
    }))
}
