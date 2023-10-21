import { Main } from "@/app/components/espacio/Main";
import { ISpace, useSpaceStore } from "@/store/space";
import { ReactNode, createContext, useRef } from "react";
import { StoreApi } from "zustand";

export const SpaceContext = createContext<StoreApi<ISpace>>({} as StoreApi<ISpace>)

