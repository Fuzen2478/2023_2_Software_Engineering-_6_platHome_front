"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface MyInfoContextType {
  showMyInfoModal: boolean;
  setShowMyInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const myInfoContext = createContext<MyInfoContextType | null>(null);

export function useMyInfo() {
  const context = useContext(myInfoContext);
  if (!context) {
    throw new Error("useMyInfo must be used within a MyInfoProvider");
  }
  return context;
}

export function MyInfoProvider({ children }: { children: ReactNode }) {
  const [showMyInfoModal, setShowMyInfoModal] = useState(true);

  return (
    <myInfoContext.Provider value={{ showMyInfoModal, setShowMyInfoModal }}>
      {children}
    </myInfoContext.Provider>
  );
}
