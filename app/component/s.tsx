import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useMutation } from "react-query";

const chatSocket = io("http://49.162.4.3:4000", {
  path: "/socket.io",
  multiplex: true,
  transports: ["websocket"],
  autoConnect: false,
});

interface IChatInfo {
  _id: string;
  name: string;
  buyer_id: number;
  seller_id: number;
  createdAt: string;
  estate_id: number;
  lastchat: any;
}

const ChatSocketContext = createContext<IChatInfo[] | null>(null);

export function ChatSocketContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<IChatInfo[]>([
    {
      _id: "",
      name: "",
      buyer_id: 0,
      seller_id: 0,
      createdAt: "",
      estate_id: 0,
      lastchat: {},
    },
  ]);

  useEffect(() => {
    //현재 유저 채팅방 조회
    const data = useMutation();
    setState(data);
    chatSocket.connect();

    chatSocket.on();

    return () => {
      chatSocket.disconnect();
    };
  }, []);

  return <ChatSocketContext.Provider value={state}>{children}</ChatSocketContext.Provider>;
}
