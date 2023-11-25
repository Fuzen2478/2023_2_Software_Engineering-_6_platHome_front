"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://49.162.4.3:4000");

function receiveMessage() {
  socket.on("message", (data) => {
    console.log(data);
  });
}

function CreateRoom() {
  console.log("Entering chat room");
  socket.emit("enterChatRoom", {
    roomId: "0",
  });
}

// console.log(socket);

export default function Home() {
  useEffect(() => {
    console.log("Component mounted");

    CreateRoom();
    console.log("Socket:", socket);

    const intervalId = setInterval(() => receiveMessage(), 1000);

    return () => {
      console.log("Component unmounted");
      clearInterval(intervalId);
    };
  }, []);

  return <div className="main-content">메인콘텐츠</div>;
}

// enterChatRoom //  {
//   roomId: string;
// };

// sendMessage //  {
//   userId: number;
//   roomId: string;
//   nickname: string;
//   message: string;
// };

// sendImage //  {
//   userId: number;
//   roomId: string;
//   nickname: string;
//   message: string;
// };

// exitChatRoom // {
//   roomId: string;
//   userId: number;
//   nickname: string;
//   userType: UserType;
// };
