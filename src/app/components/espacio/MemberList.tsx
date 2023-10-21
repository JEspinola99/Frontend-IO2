import { SpaceContext } from "@/context/SpaceContext"
import { useContext } from "react"
import { useStore } from "zustand"

export const MemberList = () => {

    const store = useContext(SpaceContext)

    const miembros = useStore(store, (s) => s.miembros)

    return (
        <>
             {
                miembros?.map((miembro: any) => (
                    <div key={miembro.id}>{miembro.email}</div>
                ))
            } 
        </>
    )
}