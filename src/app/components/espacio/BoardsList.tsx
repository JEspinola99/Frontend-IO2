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

  const store = useContext(SpaceContext);
  const { boards, setBoardActive, userActive } = useStore(store, (s) => s);

  const handleActive = async (i: number) => {
    setActive(() => i);
    const boardActive = boards.find((tablero, index) => index == i) as IBoard;
    const { data } = await getBoard(boardActive.id, userActive.id);
    setBoardActive({
      nombre: data.nombre,
      id: data.id,
      columnas: data.columnas,
    });
  };

  return (
    <div className="w-full h-full flex grid-flow-col gap-3 my-3 justify-start">
      {boards?.map((item: any, index) => (
        <div
          role="button"
          className={`w-52 h-20 p-4 bg-cyan-400 hover:bg-sky-400 border rounded-md boardItem ${
            index == active ? "active" : ""
          }`}
          onClick={() => handleActive(index)}
          key={item.id}
        >
          {item.nombre}
        </div>
      ))}
    </div>
  );
};
