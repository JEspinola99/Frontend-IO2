import { SpaceContext } from "@/context/SpaceContext"
import { getBoard } from "@/services/spaceService"
import { IMiembro } from "@/store/space"
import { useContext, useState } from "react"
import { FormCheck } from "react-bootstrap"
import { useStore } from "zustand"

export const MemberList = () => {


    const store = useContext(SpaceContext)

    const miembros = useStore(store, (s) => s.miembros)
    const { setBoardActive, boardActive, userActive, setUserActive } = useStore(store, (s) => s)


    const handleActive = async (miembro: IMiembro, index: number) => {
        if(miembro.id == userActive.id){
            setUserActive({id: 0, email: ''})
        }else{
            setUserActive(miembro)
        }
        const { data } = await getBoard(boardActive.id, miembro.id == userActive.id ? null: miembro.id)
        setBoardActive({ nombre: boardActive.nombre, id: boardActive.id, columnas: data.columnas });
    }

    return (
        <>
            {
                miembros?.map((miembro, index) => (
                    <div key={miembro.id} role="button" >
                        <FormCheck
                            checked={userActive.id == miembro.id}
                            label={miembro.email}
                            onChange={() => {}}
                            onClick={() => handleActive(miembro, index)}
                        />
                    </div>
                ))
            }
        </>
    )
}