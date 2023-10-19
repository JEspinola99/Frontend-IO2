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
}

export interface ISpace {
    nombre:string
    miembros: string[]
    tableros: IBoard[]
    opciones: string[]
    setNewBoard: (tablero:IBoard[]) => void;
    setUsers: (miembros:[]) => void;
    setSpaceData: (spaceData: ISpaceData) => void;
}

interface ISpaceValues {
    nombre: string
    miembros: string[]
    tableros: IBoard[]
    opciones: string[]
}

export const useSpaceStore = create<ISpace>((set) => ({
    nombre: '',
    miembros: [],
    tableros: [],
    opciones: [],
    setNewBoard: (tableros) => set((state) => ({...state, tableros})),
    setUsers: (miembros) => set((state) => ({...state, miembros})),
    setSpaceData: (spaceData) => set((state) => ({...state, ...spaceData}))
}))
