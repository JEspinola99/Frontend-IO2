"use client";
import { SpaceContext } from "@/context/SpaceContext";
import { ISpace, ISpaceValues, useSpaceStore } from "@/store/space";
import { useRef } from "react";
import { Main } from "../Main";
import MainPage from "../../Main/Main";

export const MainWrapper = (SpaceData: ISpaceValues) => {
  const store = useRef(useSpaceStore(SpaceData)).current;
  return (
    <SpaceContext.Provider value={store}>
      <MainPage>
        <Main />
      </MainPage>
    </SpaceContext.Provider>
  );
};
