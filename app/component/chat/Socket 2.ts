import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(undefined);

export function useSocket() {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
}

export const SocketProvider = ({
  children,
  store,
}: {
  children: ReactNode;
  store: () => void;
}) => {
  const [isConnected, setConnected] = useState(false);

  const socketUrl = "http://49.162.4.3:4000";

  const socket = useContext(SocketContext);

  const handleOnMessage = (message: string) => {
    console.log(message);
  };

  useEffect(() => {
    if (!isConnected) {
      socket.current = io(socketUrl);

      socket.current.on("connect", () => {
        console.info(`Successfully connected to socket at ${socketUrl}`);
        setConnected(true);
      });

      socket.current.on("disconnect", () => {
        console.info(`Successfully disconnected`);
        setConnected(false);
      });

      socket.current.on("error", (err) => {
        console.log("Socket Error:", err.message);
      });

      socket.current.on("message", handleOnMessage);
    }

    return () => {
      if (socket.current && socket.current.connected) {
        socket.current.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
