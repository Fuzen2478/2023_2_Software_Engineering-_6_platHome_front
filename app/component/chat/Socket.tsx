import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import { useDisclosure } from "@nextui-org/react";
import { chat_apis } from "@/app/api/api";

const chatSocketClient = io("http://49.162.4.3:4000", {
  path: "/socket.io",
  transports: ["websocket"],
  autoConnect: false,
  multiplex: true,
});

export const SocketContext = createContext<IChat[] | null>(null);

export function useChatSocket() {
  const state = useContext(SocketContext);

  if (state === null) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return state;
}

interface IChat {
  _id: {};
  name: string;
  buyer_id: number;
  seller_id: number;
  created_at: string;
  estate_id: number;
  last_chat: {};
}

export function SocketProvider({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
    defaultOpen: false,
  });

  const [state, setState] = useState<IChat[]>([]);

  useEffect(() => {
    chatSocketClient.connect();

    getChatData({ setState });

    chatSocketClient.on("chatUpdated", () => {});

    chatSocketClient.on("connect", () => {
      console.log("ChatSocket connect");
    });

    chatSocketClient.on("disconnect", (reason) => {
      console.log("ChatSocket disconnect");
      console.log(reason);
      chatSocketClient.disconnect();
    });

    chatSocketClient.on("connect_error", (error) => {
      console.log("connect error");
      console.log(error);
      onOpen();
    });
  }, []);

  return (
    <SocketContext.Provider value={state}>{children}</SocketContext.Provider>
  );
}

//chat init function

async function getChatData({
  setState,
}: {
  setState: Dispatch<SetStateAction<IChat[]>>;
}) {
  const data = await chat_apis.getRoom();
  console.log("room data: ", data);
  setState(data.data);
}

//emit function

export function enterRoom(roomId: string) {
  chatSocketClient.emit("enterChatRoom", { roomId: roomId });
}

export function sendMessage(
  roomId: string,
  userId: number,
  nickname: string,
  message: string
) {
  chatSocketClient.emit("sendMessage", {
    roomId: roomId,
    userId: userId,
    nickname: nickname,
    message: message,
  });
}

async function uploadFile(input: any) {
  const extension = input.name
    .split(".")
    .filter((v: string) => v === "jpeg" || "jpg" || "heic");
  const result = await chat_apis.uploadImage({ file: input, type: extension });
  return result.data;
}

export function SendImage(
  roomId: string,
  userId: number,
  nickname: string,
  image: any
) {
  const data = uploadFile(image);
  chatSocketClient.emit("sendImage", {
    roomId: roomId,
    userId: userId,
    nickname: nickname,
    message: data,
  });
}