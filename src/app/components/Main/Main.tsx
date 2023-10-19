import SideBar from "../SideBar";
import Encabezado from "@/app/head/page";

export default function MainPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Encabezado />
      <div>
        <SideBar />
        <main>{children}</main>
      </div>
    </>
  );
}
