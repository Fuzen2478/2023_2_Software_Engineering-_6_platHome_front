import { Chat } from "./chat/Chat";
import { SocketProvider } from "./chat/Socket";

export default function AutenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined") {
    const accessKey = localStorage.getItem("access-key");
    if (accessKey === undefined) {
      return <></>;
    } else {
      return { children };
    }
  }
}
