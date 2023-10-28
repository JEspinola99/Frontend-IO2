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
  const { boards, setBoardActive  } = useStore(store, (s) => s)

  const handleActive = async(i: number) => {
    setActive(() => i);
    const boardActive = boards.find((tablero, index) => index == i) as IBoard;
    await getBoard(boardActive.id)
    setBoardActive({ nombre: boardActive.nombre, id: boardActive.id, columnas: boardActive.columnas });
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
