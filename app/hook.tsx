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
  const [showMyInfoModal, setShowMyInfoModal] = useState(false);

  return <myInfoContext.Provider value={{ showMyInfoModal, setShowMyInfoModal }}>{children}</myInfoContext.Provider>;
}

interface RequestEstateContextType {
  showRequestEstateModal: boolean;
  setShowRequestEstateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RequestEstateContext = createContext<RequestEstateContextType | null>(null);

export function useRequestEstate() {
  const context = useContext(RequestEstateContext);
  if (!context) {
    throw new Error("useRequestEstate must be used within a RequestEstateProvider");
  }
  return context;
}

export function RequestEstateProvider({ children }: { children: ReactNode }) {
  const [showRequestEstateModal, setShowRequestEstateModal] = useState(false);

  return (
    <RequestEstateContext.Provider value={{ showRequestEstateModal, setShowRequestEstateModal }}>
      {children}
    </RequestEstateContext.Provider>
  );
}

interface EstateReportContextType {
  showEstateReportModal: boolean;
  setShowEstateReportModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EstateReportContext = createContext<EstateReportContextType | null>(null);

export function useEstateReport() {
  const context = useContext(EstateReportContext);
  if (!context) {
    throw new Error("useEstateReport must be used within a EstateReportProvider");
  }
  return context;
}

export function EstateReportProvider({ children }: { children: ReactNode }) {
  const [showEstateReportModal, setShowEstateReportModal] = useState(false);

  return (
    <EstateReportContext.Provider value={{ showEstateReportModal, setShowEstateReportModal }}>
      {children}
    </EstateReportContext.Provider>
  );
}
