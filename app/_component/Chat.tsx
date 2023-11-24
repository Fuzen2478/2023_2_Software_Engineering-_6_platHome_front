import { MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { IChatRoom } from "./Chat_env";
import { TestChatRoom, TestUser } from "./fortest/test_dummy";
import { Socket } from "socket.io";

function ChatDropDown({ open }: { open: boolean }) {
  return (
    <div
      className="border rounded-lg flex flex-col justify-center bg-white px-2"
      style={{ display: open ? "block" : "none" }}
    >
      <div className="flex justify-center items-center h-8 border-b">
        신고하기
      </div>
      <div className="flex justify-center items-center h-8">채팅방 삭제</div>
    </div>
  );
}

function ChatFileForm({ open }: { open: boolean }) {
  return (
    <div
      className="bg-[#E6E6E6] flex justify-center items-center h-16"
      style={{ display: open ? "block" : "none" }}
    >
      <div className="text-black border-dashed border-2 flex items-center justify-center rounded-md px-12 py-2">
        파일을 드래그해서 올리세요
      </div>
    </div>
  );
}

function ChatRoom({
  item,
  handle,
  open,
  _index,
}: {
  item: IChatRoom;
  handle: (index: number) => void;
  open: boolean;
  _index: number;
}) {
  const [fileFormOpen, setFileFormOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  return (
    <div className="flex flex-col h-fit w-[19rem] rounded-md border bg-[#E3F8FF] mt-auto">
      <div>
        <div
          className="chat-header bg-[#FFDD83] flex items-center text-white"
          onClick={() => handle(_index)}
        >
          <div className="opposite-name grow text-xl flex justify-center items-center pl-4">
            {TestUser[item.toId].username}
          </div>
          <MoreHorizontal
            size={28}
            className="mr-4"
            onClick={() => setDropDownOpen((prev) => !prev)}
          />
        </div>
        <div className="right-1 top-7 absolute">
          <ChatDropDown open={dropDownOpen} />
        </div>
      </div>
      <div
        className="container flex flex-col grow h-72 justify-between"
        style={{ display: open ? "flex" : "none" }}
      >
        <div className="chat-body grow flex flex-col ">채팅 내용</div>
        <div className="chat-foot flex flex-col">
          <div className="chat-textInput h-8 bg-white flex items-center justify-center">
            <Plus
              size={14}
              className="ml-2"
              onClick={() => setFileFormOpen((prev) => !prev)}
            />
            <input
              type="text"
              className="grow mx-2 my-4 rounded-md border border-[#CDC5AE] text-[#2e2e2e]"
              placeholder="메세지를 입력하세요"
            />
          </div>
          <ChatFileForm open={fileFormOpen} />
        </div>
      </div>
    </div>
  );
}

export default function Chat() {
  const [chatList, setChatList] = useState<IChatRoom[]>();
  const [chatOpen, setChatOpen] = useState<boolean[]>([true]);

  useEffect(() => {
    setChatList(TestChatRoom.filter((item) => item.fromId === 1));
  }, []);

  useEffect(() => {
    setChatOpen(Array(chatList?.length).fill(false));
  }, [chatList]); //init ChatOpen

  function handleChatOpen(index: number) {
    setChatOpen((prev) => {
      const temp = [...prev];
      temp[index] = !temp[index];
      return temp;
    });
  }

  //   const socket = new Socket("172.21.35.124")

  return (
    <div className="flex gap-x-2">
      {chatList?.map((item, index) => (
        <ChatRoom
          item={item}
          handle={handleChatOpen}
          key={index}
          _index={index}
          open={chatOpen[index]}
        />
      ))}
    </div>
  );
}
