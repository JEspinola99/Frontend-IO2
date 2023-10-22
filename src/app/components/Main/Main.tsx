import SideBar from "../SideBar";
import Encabezado from "@/app/head/page";
import bgImage from "../../landscape4.jpg";
import Image from "next/image";

export default function MainPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Encabezado />
      <div className="h-full flex flex-col items-center justify-between">
        <div className="relative w-full">
          {/* <div className="absolute -z-10 w-full">
            <Image src={bgImage} alt="bgImage" className="w-full" />
          </div> */}
          <div className="h-screen flex flex-row justify-start p-0 py-2 left-40 ">
            <SideBar />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
