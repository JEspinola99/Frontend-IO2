import SideBar from "../SideBar";
import Encabezado from "@/app/head/page";
import bgImage from "../../landscape4.jpg";
import Image from "next/image";

export default function MainPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Encabezado />
      <div className="">
        <div className="relative w-full h-screen">
          {/* <div className="absolute -z-10 w-full">
            <Image src={bgImage} alt="bgImage" className="w-full" />
          </div> */}
          <div className="h-screen flex flex-row align-top justify-start p-0 bg-transparent">
            <SideBar />
            <div className="h-screen w-full flex align-top justify-start p-0 text-bold text-white">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
