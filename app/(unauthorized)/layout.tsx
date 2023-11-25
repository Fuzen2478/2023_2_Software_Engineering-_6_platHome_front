import "@/app/globals.css";
import Header from "../component/Header";
import { useState } from "react";
// import SideBar from "../_component/SideBar";
// import { Chat } from "../_component/chat/Chat";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-col">
        {/* <SideBar isFold={sideFold} setFold={setSideFold} /> */}
        {children}
        <div className="chatting-container fixed bottom-0 right-0">
          {/* <Chat /> */}
        </div>
      </div>
    </div>
  );
}
