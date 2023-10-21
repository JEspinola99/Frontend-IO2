import { createStore } from 'zustand';

export interface IBoard {
    id: number
    nombre: string
} 

export interface ISpaceData {
    nombre: string
    miembros: []
    boards: []
    opciones: []
    boardActive: IBoard
}

export interface ISpace {
    nombre:string
    miembros: string[]
    boards: IBoard[]
    opciones: string[]
    setNewBoard: (tablero:IBoard[]) => void;
    boardActive: IBoard;
    id: string
    setUsers: (miembros:[]) => void;
    setSpaceData: (spaceData: ISpaceData) => void;
    setName: (nombre: string) => void;
    setBoardActive: (board: IBoard) => void;
}

export interface ISpaceValues {
    nombre: string
    miembros: string[]
    boards: IBoard[]
    opciones: string[]
    boardActive: IBoard
    id: string
}

// export const useSpaceStore = create<ISpace>((set) => ({
//     nombre: '',
//     miembros: [],
//     boards: [],
//     opciones: [],
//     boardActive: {id: 0, nombre: ''},
//     setNewBoard: (tableros) => set((state) => ({...state, tableros})),
//     setUsers: (miembros) => set((state) => ({...state, miembros})),
//     setSpaceData: (spaceData) => set((state) => ({...state, ...spaceData})),
//     setName: (nombre) => set((state) => ({...state, nombre})),
//     setBoardActive: (boardActive) => set((state) => ({...state, boardActive}))
// }))

export const useSpaceStore = (iniProps?: Partial<ISpace>) => {
    const DefaultProps: ISpaceValues = {
        nombre: '',
        miembros: [],
        boards: [],
        opciones: [],
        boardActive: {id: 0, nombre: ''},
        id: ''
    }

    return createStore<ISpace>()((set) => ({
        ...DefaultProps,
        ...iniProps,
        setNewBoard: (boards) => set((state) => ({...state, boards})),
        setUsers: (miembros) => set((state) => ({...state, miembros})),
        setSpaceData: (spaceData) => set((state) => ({...state, ...spaceData})),
        setName: (nombre) => set((state) => ({...state, nombre})),
        setBoardActive: (boardActive) => set((state) => ({...state, boardActive}))
    }))
}
