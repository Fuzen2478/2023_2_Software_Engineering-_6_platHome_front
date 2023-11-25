"use client";

import "@/app/globals.css";
import Header from "../_component/Header";
import { useState } from "react";
import SideBar from "../_component/SideBar";
import Chat from "../_component/chat/Chat";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideFold, setSideFold] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <body className="flex flex-col">
        <SideBar isFold={sideFold} setFold={setSideFold} />
        <main>{children}</main>
        <div className="chatting-container fixed bottom-0 right-0">
          <Chat />
        </div>
      </body>
    </div>
  );
}
