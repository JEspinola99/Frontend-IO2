import { SpaceContext } from "@/context/SpaceContext";
import { getBoard } from "@/services/spaceService";
import { IBoard, useSpaceStore } from "@/store/space";
import { useContext, useState } from "react";
import { useStore } from "zustand";

interface IBoarList {
  tableros: IBoard[];
}
export const BoardList = () => {
  const [active, setActive] = useState(0);

  const store = useContext(SpaceContext)
  const { boards, setBoardActive, userActive } = useStore(store, (s) => s)

  const handleActive = async(i: number) => {
    setActive(() => i);
    const boardActive = boards.find((tablero, index) => index == i) as IBoard;
    const {data} = await getBoard(boardActive.id, userActive.id)
    setBoardActive({ nombre: data.nombre, id: data.id, columnas: data.columnas });
  };

  return (
    <>
      {boards?.map((item: any, index) => (
        <div
          role="button"
          className={`boardItem ${index == active ? "active" : ""}`}
          onClick={() => handleActive(index)}
          key={item.id}
        >
          {item.nombre}
        </div>
      ))}
    </>
  );
};
