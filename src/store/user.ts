import { create } from 'zustand';

interface IUser {
    email: string
    id: number
    setUser: (email: string, id: number) => void
}

export const useUserStore = create<IUser>((set) => ({
    email: '',
    id: 0,
    setUser: (email: string, id: number) => set(() => ({
        email,
        id
    }))
}))