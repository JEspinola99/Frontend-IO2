import { Main } from "@/app/components/espacio/Main";
import { ISpace, createSpaceStore } from "@/store/space";
import { ReactNode, createContext, useRef } from "react";

export const SpaceContext = createContext<ISpace | null>(null)

export const SpaceProvider = () => {
    const store = useRef(createSpaceStore()).current
    return (
        <SpaceContext.Provider value={store()}>
            <Main/>
        </SpaceContext.Provider>
    )
}