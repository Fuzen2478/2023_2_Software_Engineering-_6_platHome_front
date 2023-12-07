import { Chat } from "./chat/Chat";

export default function AutenticationLayout() {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem("key");
    if (item) {
      return (
        <div>
          <Chat />
        </div>
      );
    } else {
      return <></>;
    }
  }
}
