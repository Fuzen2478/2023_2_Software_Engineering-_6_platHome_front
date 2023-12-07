"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface ShowListContextType {
  fold: boolean;
  setFold: (value: boolean) => void;
}

const SideBarContext = createContext<ShowListContextType>({
  fold: false,
  setFold: () => {},
});

export function useSideBar() {
  const state = useContext(SideBarContext);

  return state;
}

export function SideBarProvider({ children }: { children: ReactNode }) {
  const [fold, setFold] = useState(false);

  return (
    <SideBarContext.Provider value={{ fold, setFold }}>
      {children}
    </SideBarContext.Provider>
  );
}
