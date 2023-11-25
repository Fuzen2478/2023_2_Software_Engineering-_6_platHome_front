"use client";
import Header from "../_component/Header";
import { useState } from "react";
import SideBar from "../_component/SideBar";
import Chat from "../_component/chat/Chat";
import { io } from "socket.io-client";

const socket = io("http://49.162.4.3:4000");

function receiveMessage() {
  socket.on("message", (data) => {
    console.log(data);
  });
}

export default function Home() {
  const [sideFold, setSideFold] = useState(false);

  setInterval(() => receiveMessage(), 1000);

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
