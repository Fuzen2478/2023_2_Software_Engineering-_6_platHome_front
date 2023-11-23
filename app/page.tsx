"use client";
import Header from "./_component/Header";
import { useState } from "react";
import SideBar from "./_component/SideBar";
import Chat from "./_component/Chat";

export default function Home() {
  const [sideFold, setSideFold] = useState(false);
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="app-body flex flex-col">
        <SideBar isFold={sideFold} setFold={setSideFold} />
        <div className="main-content">메인콘텐츠</div>
      </div>
      <div className="chatting-container fixed bottom-0 right-0">
        <Chat />
      </div>
    </main>
  );
}
