import { SpaceContext } from "@/context/SpaceContext"
import { getBoard } from "@/services/spaceService"
import { useContext, useState } from "react"
import { useStore } from "zustand"

export const MemberList = () => {
    const [active, setActive] = useState(0);


    const store = useContext(SpaceContext)

    const miembros = useStore(store, (s) => s.miembros)
    const { boards, setBoardActive, boardActive  } = useStore(store, (s) => s)


    const handleActive = async (id: number, index: number) => {
        const {data} = await getBoard(boardActive.id, id)
        setActive(() => index)
        setBoardActive({ nombre: boardActive.nombre, id: boardActive.id, columnas: data.columnas });
    }

    return (
        <>
            {
                miembros?.map((miembro: any, index) => (
                    <div key={miembro.id} 
                    className={`${index == active ? "userActive" : ""}`}
                    role="button" 
                    onClick={() => handleActive(miembro.id, index)}>{miembro.email}</div>
                ))
            }
        </>
    )
}