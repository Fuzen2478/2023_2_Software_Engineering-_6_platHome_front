"use client";
import { createContext, useContext, useState } from "react";

export default function SideBar({ isFold }: { isFold: boolean }) {
  return (
    <div
      className="sidebar min-h-[calc(100vh-4rem)] z-50 absolute top-16 left-0 bg-black opacity-80 w-32 items-center flex flex-col gap-y-4 py-6"
      style={{ display: isFold ? "" : "none" }}
    >
      <div>지도페이지</div>
      <div>게시판페이지</div>
    </div>
  );
}

interface SideBarContextType {
  showSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const showSideBarContext = createContext<SideBarContextType | null>(null);

export function useShowSideBar() {
  const context = useContext(showSideBarContext);
  if (!context) {
    throw new Error("useShowSideBar must be used within a ShowSideBarProvider");
  }
  return context;
}

export function ShowSideBarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <showSideBarContext.Provider value={{ showSideBar, setShowSideBar }}>
      {children}
    </showSideBarContext.Provider>
  );
}
