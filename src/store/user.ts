import create from 'zustand';

interface IUser {
    email: string
    setUser: (email: string) => void
}

export const useUserStore = create<IUser>((set) => ({
    email: '',
    setUser: (email: string) => set(() => ({
        email
    }))
}))