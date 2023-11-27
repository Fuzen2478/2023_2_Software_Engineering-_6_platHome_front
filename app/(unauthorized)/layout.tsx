"use client";
import "@/app/globals.css";
import Header from "../component/Header";
import { useState } from "react";
import { SocketProvider } from "../component/chat/Socket";
import Script from "next/script";
// import SideBar from "../_component/SideBar";
// import { Chat } from "../_component/chat/Chat";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SocketProvider>
      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f1494ad8df2a9262259940f691221ac9&libraries=services,clusterer&autoload=false"
        strategy="beforeInteractive"
      />
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
    </SocketProvider>
  );
}
