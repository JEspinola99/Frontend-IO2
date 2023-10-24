import { SpaceContext } from "@/context/SpaceContext";
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

  const handleActive = (i: number) => {
    setActive(() => i);
    const boardActive = boards.filter((tablero, index) => index == i);
    setBoardActive({ nombre: boardActive[0].nombre, id: boardActive[0].id, columnas: boardActive[0].columnas });
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
