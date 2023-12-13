"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { useShowLogin } from "./auth/LoginForm";
import { account_apis } from "../api/api";

export default function SideBar({ isFold }: { isFold: boolean }) {
  const router = useRouter();
  const { showLoginForm, setShowLoginForm } = useShowLogin();

  return (
    <div
      className="sidebar text-primary font-extrabold h-48 rounded-lg z-50 absolute top-20 left-8 left-0 bg-black opacity-80 w-32 items-center flex flex-col gap-y-4 py-6"
      style={{ display: isFold ? "" : "none" }}
    >
      <div onClick={() => router.replace("/")}>지도페이지</div>
      <div onClick={() => router.replace("/board")}>게시판페이지</div>
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
