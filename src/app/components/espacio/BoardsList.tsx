import { SpaceContext } from "@/context/SpaceContext";
import { IBoard, useSpaceStore } from "@/store/space"
import { useContext, useState } from "react";
import { useStore } from "zustand"

interface IBoarList {
    tableros: IBoard[];
}
export const BoardList = () => {

    const [active, setActive] = useState(0)

    const store = useContext(SpaceContext)

    const { setBoardActive, boards } = useStore(store, (s) => s)

    const handleActive = (i: number) => {
        setActive(() => i)
        const newBoardActive = boards.filter((board, index)=> index == i)[0]
        setBoardActive(newBoardActive)
    }

    return (
        <>
            {
                boards?.map((item: any, index) => (
                    <div role="button" className={`boardItem ${index == active? 'active': ''}`} 
                    onClick={() => handleActive(index)} key={item.id}>{item.nombre}</div>
                ))
            }
        </>
    )
}