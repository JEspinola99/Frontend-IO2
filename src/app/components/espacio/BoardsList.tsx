import { IBoard, useSpaceStore } from "@/store/space";
import { useState } from "react";

interface IBoarList {
  tableros: IBoard[];
}
export const BoardList = ({ tableros }: IBoarList) => {
  const [active, setActive] = useState(0);

  const { setBoardActive } = useSpaceStore();

  const handleActive = (i: number) => {
    setActive(() => i);
    const boardActive = tableros.filter((tablero, index) => index == i);
    setBoardActive({ nombre: boardActive[0].nombre, id: boardActive[0].id });
  };

  return (
    <>
      {tableros?.map((item: any, index) => (
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
