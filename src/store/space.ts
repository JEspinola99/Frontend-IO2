import { create } from 'zustand';

export interface IBoard {
    id: number
    nombre: string
} 

export interface ISpaceData {
    nombre: string
    miembros: []
    tableros: []
    opciones: []
    boardActive: IBoard
}

export interface ISpace {
    nombre:string
    miembros: string[]
    tableros: IBoard[]
    opciones: string[]
    setNewBoard: (tablero:IBoard[]) => void;
    boardActive: IBoard;
    setUsers: (miembros:[]) => void;
    setSpaceData: (spaceData: ISpaceData) => void;
    setName: (nombre: string) => void;
    setBoardActive: (board: IBoard) => void;
}

interface ISpaceValues {
    nombre: string
    miembros: string[]
    tableros: IBoard[]
    opciones: string[]
    boardActive: IBoard
}

export const useSpaceStore = create<ISpace>((set) => ({
    nombre: '',
    miembros: [],
    tableros: [],
    opciones: [],
    boardActive: {id: 0, nombre: ''},
    setNewBoard: (tableros) => set((state) => ({...state, tableros})),
    setUsers: (miembros) => set((state) => ({...state, miembros})),
    setSpaceData: (spaceData) => set((state) => ({...state, ...spaceData})),
    setName: (nombre) => set((state) => ({...state, nombre})),
    setBoardActive: (boardActive) => set((state) => ({...state, boardActive}))
}))
